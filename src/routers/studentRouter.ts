import { Router } from "express";
import {
    deleteStudentInfo,
    getStudents,
    postOrUpdateStudent,
} from "../controllers/studentControllers.js";
import {
    checkClassName,
    checkStudentId,
    validateCreateOrUpdate,
} from "../middlewares/studentMiddlewares.js";

export const studentRouter = Router();

studentRouter.get("/students", getStudents);

studentRouter.post(
    "/student",
    validateCreateOrUpdate, // check update/create sent body , sends student forward
    checkClassName, // check if className exists and returns classId
    checkStudentId, // check if studentId was sent, if not, returns studentId = 0
    postOrUpdateStudent //
);
studentRouter.put(
    "/student/:studentId",
    validateCreateOrUpdate, // check update/create sent body
    checkClassName,
    checkStudentId,
    postOrUpdateStudent
);
studentRouter.delete("/student/:studentId", checkStudentId, deleteStudentInfo);
