import { Router } from "express";
 import {
 	// deleteStudentInfo,
 	getStudentByCpf,
 	getStudents,
 	postStudent,
 	// updateStudentInfo,
 } from "../controllers/studentControllers.js";
 import {
 	// checkIfEnrolledStudent,
 	// checkIfNewStudent,
 	validateCpf,
 	validateStudent,
 	validateUpdate,
 } from "../middlewares/studentMiddlewares.js";

export const studentRouter = Router();

studentRouter.get('/students',getStudents)

 studentRouter.get(
 	"/student",
 	validateCpf,
 	// checkIfEnrolledStudent,
 	getStudentByCpf
 );
 studentRouter.post("/student", validateStudent, postStudent);
//  studentRouter.put(
//  	"/student/:cpf",
//  	validateCpf,
//  	validateUpdate,
//  	checkIfEnrolledStudent,
//  	// updateStudentInfo
//  );
//  studentRouter.delete(
//  	"/student/:cpf",
//  	validateCpf,
//  	checkIfEnrolledStudent,
//  	// deleteStudentInfo
//  );
