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

const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
let tasks = [];

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
  const newTaskInput = document.getElementById('new-task');
  const newTaskCategoryInput = document.getElementById('task-category');
  const newTaskDueDateInput = document.getElementById('task-due-date');

  const taskText = newTaskInput.value.trim();
  const taskCategory = newTaskCategoryInput.value.trim();
  const taskDueDate = newTaskDueDateInput.value;

  if (!taskText) return;

  const task = {
    text: taskText,
    category: taskCategory,
    dueDate: taskDueDate,
    complete: false
  };

  tasks.push(task);
  renderTasks();
  newTaskInput.value = '';
  newTaskCategoryInput.value = '';
  newTaskDueDateInput.value = '';
});

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = `${task.text} - ${task.category} - Due: ${task.dueDate}`;
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

const goalList = document.getElementById('goal-list');
const completedGoalsList = document.getElementById('completed-goals');
const addGoalButton = document.getElementById('add-goal');
let goals = [];

function renderGoals() {
  goalList.innerHTML = '';
  completedGoalsList.innerHTML = '';

  goals.forEach((goal, index) => {
    const li = document.createElement('li');
    li.textContent = goal.text;

    const markCompleteButton = document.createElement('button');
    markCompleteButton.textContent = 'Mark as Completed';
    markCompleteButton.addEventListener('click', () => {
      goal.complete = !goal.complete;
      renderGoals();
    });

    li.appendChild(markCompleteButton);

    if (goal.complete) {
      completedGoalsList.appendChild(li);
    } else {
      goalList.appendChild(li);
    }
  });
};

addGoalButton.addEventListener('click', () => {
  const newGoalInput = document.getElementById('new-goal');
  const goalText = newGoalInput.value.trim();

  if (!goalText) return;

  const newGoal = {
    text: goalText,
    complete: false
  };

  goals.push(newGoal);
  newGoalInput.value = '';
  renderGoals();
});

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode')
    ? 'Switch to Light Mode'
    : 'Switch to Dark Mode';
});

document.body.classList.add('light-mode');
