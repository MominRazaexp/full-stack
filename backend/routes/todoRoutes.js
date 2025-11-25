import express from 'express';
import * as todoController from '../controllers/todoController.js';

const router = express.Router();

router.get('/', todoController.getTodos);
router.post('/', todoController.addTodo);
router.put('/:id', todoController.updateTodoItem);
router.delete('/:id', todoController.deleteTodoItem);

export default router;