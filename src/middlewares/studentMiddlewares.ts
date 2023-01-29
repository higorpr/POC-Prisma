import { Request, Response, NextFunction } from "express";
import { createOrUpdateSchema } from "../models/studentSchema.js";
import { Student } from "../protocols/types.js";
import {
    checkId,
    getClassId,
    isNewStudent,
} from "../repositories/studentRepository.js";

export async function checkIfNewStudent(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { cpf }: { cpf: string } = req.body as Student;
    try {
        const isNew = await isNewStudent(cpf);
        if (!isNew) {
            return res.status(409).send("This student is already enrolled.");
        }
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

    next();
}

export function validateCreateOrUpdate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const updateInfo = req.body;
    const { error } = createOrUpdateSchema.validate(updateInfo);

    if (error) {
        const errors = error.details.map((e) => e.message);
        return res.status(400).send(errors);
    }

    res.locals.student = req.body;

    next();
}

export async function checkClassName(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { className } = res.locals.student;
    if (!className) {
        return res.sendStatus(400);
    }

    try {
        const classId = await getClassId(className);

        if (!classId) {
            return res.status(404).send("Not a valid class.");
        }

        res.locals.student.current_class_id = classId;
        delete res.locals.student.className;
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

    next();
}

export async function checkStudentId(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { studentId } = req.params;
	
    if (!studentId) {
        res.locals.studentId = 0;
    } else {
        try {
            const idCheck = await checkId(Number(studentId));
            if (!idCheck) {
                return res.status(404).send("There is no student with this id");
            }
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.locals.studentId = Number(studentId);
    }

    next();
}

export async function checkIfEnrolledStudent(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const cpf: string = res.locals.cpf;

    try {
        const isNew = await isNewStudent(cpf);
        if (isNew) {
            return res
                .status(404)
                .send("This person is not enrolled in the school.");
        }
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

    next();
}
