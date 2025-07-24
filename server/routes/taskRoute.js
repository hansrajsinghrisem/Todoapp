import express from 'express';
import { CreateTask, GetTask, deleteTask, editTask, } from "../controllers/taskController.js";

const router = express.Router();

router.post('/add', CreateTask);
router.get('/list', GetTask);
router.patch('/edit', editTask);
router.delete('/delete', deleteTask);

export default router;