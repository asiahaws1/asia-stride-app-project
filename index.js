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

const moodEmojis = {
  Happy: '😊',
  Calm: '😌',
  Motivated: '💪',
  Stressed: '😫',
  Tired: '😴'
};

let moodSelections = [];

moodSelect.addEventListener('change', () => {
  const mood = moodSelect.value;
  if (!mood) return;

  moodDisplay.innerHTML = `${mood} ${moodEmojis[mood] || ''}`;
  const historyItem = document.createElement('li');
  historyItem.innerHTML = `${mood} ${moodEmojis[mood] || ''}`;
  moodHistory.appendChild(historyItem);

  moodSelections.push(mood);
  journalPrompt.textContent = prompts[mood] || 'You must select a mood to see a journal prompt.';
});

function displayCurrentDate() {
  const currentDateElement = document.getElementById('date-display');
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  currentDateElement.textContent = `Today's Date: ${formattedDate}`;
}

const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
let tasks = [];

addTaskButton.addEventListener('click', () => {
  const newTaskInput = document.getElementById('new-task');
  const newTaskCategoryInput = document.getElementById('task-category');
  const newTaskDueDateInput = document.getElementById('task-due-date');

  const taskText = newTaskInput.value;
  const taskCategory = newTaskCategoryInput.value;
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
    li.innerHTML = `${task.text} - ${task.category} - Due: ${task.dueDate}`;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      const editInput = document.createElement('input');
      editInput.value = task.text;
      const saveEditButton = document.createElement('button');
      saveEditButton.textContent = 'Save Edit';
      saveEditButton.addEventListener('click', () => {
        task.text = editInput.value;
        renderTasks();
      });
      li.innerHTML = '';
      li.appendChild(editInput);
      li.appendChild(saveEditButton);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      tasks.splice(index, 1);
      renderTasks();
    });

    li.appendChild(editButton);
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
    li.innerHTML = goal.text;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      const editInput = document.createElement('input');
      editInput.value = goal.text;
      const saveEditButton = document.createElement('button');
      saveEditButton.textContent = 'Save';
      saveEditButton.addEventListener('click', () => {
        goal.text = editInput.value;
        renderGoals();
      });
      li.innerHTML = '';
      li.appendChild(editInput);
      li.appendChild(saveEditButton);
    });

    const markCompleteButton = document.createElement('button');
    markCompleteButton.textContent = 'Mark as Completed';
    markCompleteButton.addEventListener('click', () => {
      if (!goal.complete) {
        goal.complete = true;
        goal.completedDate = new Date().toLocaleDateString('en-US');
      } else {
        goal.complete = false;
        goal.completedDate = '';
      }
      renderGoals();
    });

    if (goal.complete) {
      const completedInfo = document.createElement('span');
      completedInfo.textContent = ` Completed on: ${goal.completedDate}`;
      li.appendChild(completedInfo);
      completedGoalsList.appendChild(li);
    } else {
      li.appendChild(editButton);
      li.appendChild(markCompleteButton);
      goalList.appendChild(li);
    }
  });
}

addGoalButton.addEventListener('click', () => {
  const newGoalInput = document.getElementById('new-goal');
  const goalText = newGoalInput.value;

  if (!goalText) return;

  const newGoal = {
    text: goalText,
    complete: false,
    completedDate: ''
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
displayCurrentDate();
