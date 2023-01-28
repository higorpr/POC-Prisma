import { Request, Response, NextFunction } from "express";
import {
	cpfSchema,
	studentSchema,
	updateSchema,
} from "../models/studentSchema.js";
import { Student } from "../protocols/types.js";
// import { isNewStudent } from "../repositories/studentRepository.js";

export function validateStudent(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const student = req.body as Student;
	const { error } = studentSchema.validate(student);

	if (error) {
		const errors = error.details.map((e) => e.message);
		return res.status(400).send(errors);
	}

	res.locals.student = req.body;
	next();
}

// export async function checkIfNewStudent(
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) {
// 	const { cpf }: { cpf: string } = req.body as Student;
// 	try {
// 		const isNew = await isNewStudent(cpf);
// 		if (!isNew) {
// 			return res.status(409).send("This student is already enrolled.");
// 		}
// 	} catch (err) {
// 		console.log(err);
// 		return res.sendStatus(500);
// 	}

// 	next();
// }

export function validateCpf(req: Request, res: Response, next: NextFunction) {
	const studentCpf = req.body.cpf
		? (req.body as { cpf: string })
		: (req.params as { cpf: string });
	const { error } = cpfSchema.validate(studentCpf);

	if (error) {
		const errors = error.details.map((e) => e.message);
		return res.status(400).send(errors);
	}

	res.locals.cpf = studentCpf.cpf;
	
	next();
}

export function validateUpdate(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const updateInfo = req.body as { name: string; birthday: Date };
	const { error } = updateSchema.validate(updateInfo);

	if (error) {
		const errors = error.details.map((e) => e.message);
		return res.status(400).send(errors);
	}

	res.locals.name = updateInfo.name;
	res.locals.birthday = updateInfo.birthday;

	next();
}

// export async function checkIfEnrolledStudent(
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) {
// 	const cpf: string = res.locals.cpf;

// 	try {
// 		const isNew = await isNewStudent(cpf);
// 		if (isNew) {
// 			return res
// 				.status(404)
// 				.send("This person is not enrolled in the school.");
// 		}
// 	} catch (err) {
// 		console.log(err);
// 		return res.sendStatus(500);
// 	}

// 	next();
// }
