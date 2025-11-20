import { useState, useEffect } from 'react';
import { getAllTasks, deleteTask } from '../services/api';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getAllTasks(statusFilter, currentPage, 10);
      setTasks(data.tasks);
      setTotalPages(data.totalPages);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter, currentPage]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        fetchTasks();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete task');
      }
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTask(null);
    fetchTasks();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Task Manager</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setShowForm(true)}>Add New Task</button>
        <select 
          value={statusFilter} 
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          style={{ marginLeft: '10px' }}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      {showForm && (
        <TaskForm 
          task={editingTask} 
          onClose={handleFormClose}
        />
      )}

      {loading ? (
        <div>Loading...</div>
      ) : tasks.length === 0 ? (
        <div>No tasks found</div>
      ) : (
        <>
          {tasks.map(task => (
            <TaskItem 
              key={task._id} 
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
          
          <div style={{ marginTop: '20px' }}>
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <span style={{ margin: '0 10px' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskList;