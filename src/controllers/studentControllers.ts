import { Request, Response } from "express";
import { Student } from "../protocols/types.js";
import {
	getAllStudents,
	// deleteStudent,
	// getStudentInfoByCpf,
	insertStudent,
	// updateStudent,
} from "../repositories/studentRepository.js";

export async function getStudents(req: Request, res: Response) {
	const students = await getAllStudents();
	res.status(200).send(students);
}

export async function postStudent(req: Request, res: Response) {
	const student = res.locals.student as Student;

	student.birthday = new Date(student.birthday);

	try {
		await insertStudent(student);
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}
	res.sendStatus(200);
}

export async function getStudentByCpf(req: Request, res: Response) {
	// const cpf: string = res.locals.cpf as string;
	// try {
	// 	const studentData = (await getStudentInfoByCpf(cpf));
	// 	res.status(200).send(studentData);
	// } catch (err) {
	// 	console.log(err);
	// 	res.sendStatus(500);
	// }
}

// export async function updateStudentInfo(req: Request, res: Response) {
// 	const cpf: string = res.locals.cpf as string;
// 	const name: string = res.locals.name as string;
// 	const birthday: Date = res.locals.birthday as Date;

// 	try {
// 		updateStudent(cpf, name, birthday);
// 	} catch (err) {
// 		console.log(err);
// 		return res.sendStatus(500);
// 	}

// 	res.sendStatus(200);
// }

// export async function deleteStudentInfo(req: Request, res: Response) {
// 	const cpf: string = res.locals.cpf as string;

// 	try {
// 		deleteStudent(cpf);
// 	} catch (err) {
// 		console.log(err);
// 		return res.sendStatus(500);
// 	}
//     res.sendStatus(200)
// }
