import * as todoModel from '../models/todo.js';

export const getTodos = async (req, res) => {
  try {
    const todos = await todoModel.getAllTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addTodo = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Todo text is required' });
    }
    const todo = await todoModel.createTodo(text);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTodoItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;
    const result = await todoModel.updateTodo(id, text, completed);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ id, text, completed });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTodoItem = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await todoModel.deleteTodo(id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};