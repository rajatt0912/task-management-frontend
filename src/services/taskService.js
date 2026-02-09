// Dummy task data
const dummyTasks = [
  {
    id: 1,
    title: 'Design Homepage',
    description: 'Create wireframes and mockups for the homepage',
    assignedTo: 'Alice',
    status: 'DONE',
    dueDate: '2026-02-05',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()  // 2 days ago
  },
  {
    id: 2,
    title: 'Setup Backend API',
    description: 'Initialize Node.js server with Express',
    assignedTo: 'Bob',
    status: 'IN_PROGRESS',
    dueDate: '2026-02-10',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: 3,
    title: 'Write Documentation',
    description: 'Document all API endpoints',
    assignedTo: 'Charlie',
    status: 'TODO',
    dueDate: '2026-02-08',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 4,
    title: 'Fix Login Bug',
    description: 'Users cannot login with special characters',
    assignedTo: 'Alice',
    status: 'TODO',
    dueDate: '2026-02-07',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

let tasks = [...dummyTasks];
let nextId = 5;

export const getAllTasks = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve([...tasks]), 300);
  });
};

export const createTask = async (taskData) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTask = {
        ...taskData,
        id: nextId++,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      tasks.push(newTask);
      resolve(newTask);
    }, 300);
  });
};

export const updateTaskStatus = async (id, status) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const task = tasks.find(t => t.id === id);
      if (task) {
        task.status = status;
        task.updatedAt = new Date().toISOString();
      }
      resolve(task);
    }, 300);
  });
};

export const deleteTask = async (id) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      tasks = tasks.filter(t => t.id !== id);
      resolve(true);
    }, 300);
  });
};

export const getTaskById = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const task = tasks.find(t => t.id === id);
      resolve(task || null);
    }, 300);
  });
};

export const updateTask = async (id, updatedData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = tasks.findIndex(t => t.id === id);
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...updatedData, updatedAt: new Date().toISOString() };
        resolve(tasks[index]);
      } else {
        resolve(null);
      }
    }, 300);
  });
};
