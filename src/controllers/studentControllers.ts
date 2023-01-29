import { Request, Response } from "express";
import {
    deleteStudent,
    getAllStudents,
    upsertStudent,
    createStudentHistory,
} from "../repositories/studentRepository.js";

export async function getStudents(req: Request, res: Response) {
    const students = await getAllStudents();
    res.status(200).send(students);
}

export async function postOrUpdateStudent(req: Request, res: Response) {
    const student = res.locals.student;
    const studentId = res.locals.studentId;
    student.birthday = new Date(student.birthday);
    const year = new Date().getFullYear();
    

    try {
        const studentInfo = await upsertStudent(studentId, student);

		const historyObj = {
			student_id: studentInfo.id,
			class_id: studentInfo.current_class_id,
			school_year: year,
		};
        await createStudentHistory(historyObj);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

    res.sendStatus(201);
}

export async function deleteStudentInfo(req: Request, res: Response) {
    const studentId = res.locals.studentId;

    if (studentId === 0) {
        return res.status(404).send("This student is not enrolled.");
    }

    try {
        await deleteStudent(studentId);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
    res.sendStatus(200);
}
