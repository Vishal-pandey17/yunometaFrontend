const TaskItem = ({ task, onEdit, onDelete }) => {
    return (
      <div style={{ 
        border: '1px solid #ddd', 
        padding: '15px', 
        marginBottom: '10px',
        borderRadius: '5px'
      }}>
        <h3>{task.title}</h3>
        <p>{task.description || 'No description'}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><small>Created: {new Date(task.createdAt).toLocaleDateString()}</small></p>
        <div style={{ marginTop: '10px' }}>
          <button onClick={() => onEdit(task)}>Edit</button>
          <button 
            onClick={() => onDelete(task._id)}
            style={{ marginLeft: '10px', backgroundColor: '#ff4444', color: 'white' }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };
  
  export default TaskItem;