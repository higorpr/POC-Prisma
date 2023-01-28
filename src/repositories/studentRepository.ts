import { students } from "@prisma/client";
import prisma from "../database/db.js";
import { Student } from "../protocols/types.js";

export async function getAllStudents() {
	return await prisma.students.findMany();
}

export async function insertStudent(student: Student) {
	await prisma.students.create({ data: student });
}

// export function isNewStudent(cpf: string): {

// 	// const response = await connection.query(
// 	// 	`
//     //     SELECT
//     //         NOT EXISTS(
//     //             SELECT
//     //                 true
//     //             FROM
//     //                 students
//     //             WHERE
//     //                 cpf = $1
//     //         ) AS "existingStudent";
//     // `,
// 	// 	[cpf]
// 	// );
// 	// const output: boolean = response.rows[0].existingStudent;
// 	// return output;
// }

// export function getStudentInfoByCpf(cpf: string) {
// 	// return connection.query(
// 	// 	`
//     //     SELECT
//     //         name, TO_CHAR(birthday, 'DD-MM-YYYY') AS birthday, TO_CHAR(enrollment, 'DD-MM-YYYY HH24:MI:SS') AS enrollment
//     //     FROM
//     //         students
//     //     WHERE
//     //         cpf = $1
//     // `,
// 	// 	[cpf]
// 	// );
// }

// export function updateStudent(cpf: string, newName: string, newBirthday: Date) {
// 	// connection.query(
// 	// 	`
//     //     UPDATE
//     //         students
//     //     SET
//     //         name= $1, birthday =$2
//     //     WHERE
//     //         cpf = $3
//     //     `,
// 	// 	[newName, newBirthday, cpf]
// 	// );
// }

// export function deleteStudent(cpf: string) {
// 	// connection.query(
// 	// 	`
//     //     DELETE FROM
//     //         students
//     //     WHERE
//     //         cpf=$1
//     //     `,
// 	// 	[cpf]
// 	// );
// }
