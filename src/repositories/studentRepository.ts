import { students } from "@prisma/client";
import prisma from "../database/db.js";
import { Student, StudentHistoryEntry } from "../protocols/types.js";

export async function getAllStudents() {
    return await prisma.students.findMany({
        orderBy: {
            id: "asc",
        },
        select:{
            id:true,
            name:true,
            birthday:true,
            enrollment:true,
            classes:{
                select:{
                    name:true
                }
            },
        }
    });
}

export async function isNewStudent(cpf: string): Promise<boolean> {
    const response = await prisma.students.findUnique({ where: { cpf: cpf } });
    console.log("isNewStudent:", response);
    if (response) {
        return false;
    }
    return true;
}

export async function getClassId(className: string): Promise<number> {
    const classReturn = await prisma.classes.findFirst({
        where: { name: className },
    });

    if (!classReturn) return null;

    return classReturn.id;
}

export async function checkId(studentId: number): Promise<boolean> {
    const student = await prisma.students.findUnique({
        where: { id: studentId },
    });
    if (!student) return false;
    return true;
}

export async function upsertStudent(
    studentId: number,
    student: Student
) {
    return await prisma.students.upsert({
        where: { id: studentId },
        create: {
            name: student.name,
            birthday: student.birthday,
            cpf: student.cpf,
            current_class_id: student.current_class_id,
        },
        update: {
            name: student.name,
            birthday: student.birthday,
            cpf: student.cpf,
            current_class_id: student.current_class_id,
        },
    });
}

export async function createStudentHistory(
    historyObj: StudentHistoryEntry
): Promise<void> {
    await prisma.student_class_history.create({ data: historyObj });
}

export async function deleteStudent(studentId: number): Promise<void> {
    await prisma.students.delete({ where: { id: studentId } });
}
