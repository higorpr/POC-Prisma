import { Router } from "express";
import { studentRouter } from "./studentRouter.js";

const router = Router();

router.use(studentRouter);
router.get('/health',(req,res) => {res.send('OK')})

export default router;
