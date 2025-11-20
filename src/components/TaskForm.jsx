import { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/api';

const TaskForm = ({ task, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title cannot be empty');
      return;
    }

    try {
      if (task) {
        await updateTask(task._id, { title, description, status });
      } else {
        await createTask({ title, description, status });
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save task');
    }
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '20px',
      marginBottom: '20px',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9'
    }}>
      <h2>{task ? 'Edit Task' : 'Add New Task'}</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Title: *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '100%', padding: '5px', minHeight: '80px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <button type="submit">{task ? 'Update' : 'Create'}</button>
          <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;