import { getDB } from '../config/db.js';

export const getAllTodos = () => {
  return new Promise((resolve, reject) => {
    const db = getDB();
    db.all('SELECT * FROM todos ORDER BY created_at DESC', [], (err, rows) => {
      db.close();
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const createTodo = (text) => {
  return new Promise((resolve, reject) => {
    const db = getDB();
    db.run('INSERT INTO todos (text) VALUES (?)', [text], function(err) {
      db.close();
      if (err) reject(err);
      else resolve({ id: this.lastID, text, completed: 0 });
    });
  });
};

export const updateTodo = (id, text, completed) => {
  return new Promise((resolve, reject) => {
    const db = getDB();
    db.run(
      'UPDATE todos SET text = ?, completed = ? WHERE id = ?',
      [text, completed, id],
      function(err) {
        db.close();
        if (err) reject(err);
        else resolve({ changes: this.changes });
      }
    );
  });
};

export const deleteTodo = (id) => {
  return new Promise((resolve, reject) => {
    const db = getDB();
    db.run('DELETE FROM todos WHERE id = ?', [id], function(err) {
      db.close();
      if (err) reject(err);
      else resolve({ changes: this.changes });
    });
  });
};