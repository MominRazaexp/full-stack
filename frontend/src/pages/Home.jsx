import React, { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../utils/api';
import { useAnalytics } from '../utils/analytics';

function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { trackEvent, trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView('/');
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error('Error loading todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (text) => {
    try {
      const newTodo = await addTodo(text);
      setTodos([newTodo, ...todos]);
      trackEvent('/', 'click');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      const todo = todos.find(t => t.id === id);
      const updated = { ...todo, completed: todo.completed ? 0 : 1 };
      await updateTodo(id, updated.text, updated.completed);
      setTodos(todos.map(t => t.id === id ? updated : t));
      trackEvent('/', 'click');
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleUpdateTodo = async (id, text) => {
    try {
      const todo = todos.find(t => t.id === id);
      await updateTodo(id, text, todo.completed);
      setTodos(todos.map(t => t.id === id ? { ...t, text } : t));
      trackEvent('/', 'click');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(t => t.id !== id));
      trackEvent('/', 'click');
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Todos</h1>
          <img 
            src="https://res.cloudinary.com/proxmaircloud/image/upload/v1764080106/images/mglfcxysrtftgvxj1klc.png" 
            alt="background image for a todo app"
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        
        <TodoForm onAdd={handleAddTodo} />
        
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading todos...</p>
          </div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodo}
          />
        )}
      </div>
    </div>
  );
}

export default Home;