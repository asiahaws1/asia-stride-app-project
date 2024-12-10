const moodSelect = document.getElementById('mood-select');
const moodDisplay = document.getElementById('mood-display');
const moodHistory = document.getElementById('mood-history');
const journalPrompt = document.getElementById('journal-prompt');
const prompts = {
  Happy: 'What made you feel happy today?',
  Calm: 'What helped you feel calm today?',
  Motivated: 'What’s driving your motivation today?',
  Stressed: 'What’s causing stress today, and how can you address it?',
  Tired: 'What made you feel tired, and how can you recharge?'
};

const taskList = document.getElementById('task-list');
const addTaskButton = document.getElementById('add-task');
const newTaskInput = document.getElementById('new-task');
const taskCategoryInput = document.getElementById('task-category');
const taskDueDateInput = document.getElementById('task-due-date');

const goalList = document.getElementById('goal-list');
const completedGoalList = document.getElementById('completed-goals');
const addGoalButton = document.getElementById('add-goal');
const newGoalInput = document.getElementById('new-goal');

const tasks = [];
const goals = [];
const completedGoals = [];

moodSelect.addEventListener('change', () => {
  const mood = moodSelect.value;
  if (!mood) return;
  moodDisplay.textContent = mood;
  const historyItem = document.createElement('li');
  historyItem.textContent = mood;
  moodHistory.appendChild(historyItem);
  journalPrompt.textContent = prompts[mood] || 'You must select a mood to see a journal prompt.';
});

addTaskButton.addEventListener('click', () => {
  const taskName = newTaskInput.value.trim();
  const category = taskCategoryInput.value.trim();
  const dueDate = taskDueDateInput.value;

  if (!taskName || !category || !dueDate) {
    alert('Please fill out all task fields.');
    return;
  }

  tasks.push({ taskName, category, dueDate });
  newTaskInput.value = '';
  taskCategoryInput.value = '';
  taskDueDateInput.value = '';
  renderTasks();
});

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = `${task.taskName} - ${task.category} (Due: ${task.dueDate})`;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      tasks.splice(index, 1);
      renderTasks();
    });
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

addGoalButton.addEventListener('click', () => {
  const goalText = newGoalInput.value.trim();
  if (!goalText) {
    alert('Please enter a goal.');
    return;
  }

  goals.push(goalText);
  newGoalInput.value = '';
  renderGoals();
});

function renderGoals() {
  goalList.innerHTML = '';
  goals.forEach((goal, index) => {
    const li = document.createElement('li');
    li.textContent = goal;
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', () => {
      completedGoals.push(goal);
      goals.splice(index, 1);
      renderGoals();
      renderCompletedGoals();
    });
    li.appendChild(completeButton);
    goalList.appendChild(li);
  });
}

function renderCompletedGoals() {
  completedGoalList.innerHTML = '';
  completedGoals.forEach(goal => {
    const li = document.createElement('li');
    li.textContent = goal;
    completedGoalList.appendChild(li);
  });
}

renderGoals();
renderCompletedGoals();
renderTasks();
