const moodSelect = document.getElementById('mood-select');
const moodDisplay = document.getElementById('mood-display');
const moodHistoryContainer = document.createElement('ul');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');


const categoryInput = document.createElement('input');
const dueDateInput = document.createElement('input');


categoryInput.setAttribute('placeholder', 'Enter category (e.g., Work, Personal)');
dueDateInput.setAttribute('type', 'date');


const categoryLabel = document.createElement('label');
categoryLabel.textContent = 'Task Category:';
categoryLabel.appendChild(categoryInput);

const dueDateLabel = document.createElement('label');
dueDateLabel.textContent = 'Due Date:';
dueDateLabel.appendChild(dueDateInput);


document.body.insertBefore(categoryLabel, taskList);
document.body.insertBefore(dueDateLabel, taskList);

function loadMood() {
  const savedMood = localStorage.getItem('selectedMood');
  const moodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];

  if (savedMood) {
    moodDisplay.textContent = savedMood;
    moodSelect.value = savedMood;
  } else {
    moodDisplay.textContent = 'Not selected';
  }


  displayMoodHistory(moodHistory);
}


function saveMood(mood) {
  localStorage.setItem('selectedMood', mood);


  const moodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];
  moodHistory.push(mood);
  localStorage.setItem('moodHistory', JSON.stringify(moodHistory));


  displayMoodHistory(moodHistory);
}

function displayMoodHistory(history) {

  moodHistoryContainer.textContent = '';

  history.forEach((mood, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `Mood ${index + 1}: ${mood}`;
    moodHistoryContainer.appendChild(listItem);
  });

  if (!document.body.contains(moodHistoryContainer)) {
    document.body.appendChild(moodHistoryContainer);
  }
}


moodSelect.addEventListener('change', () => {
  const selectedMood = moodSelect.value;
  moodDisplay.textContent = selectedMood ? selectedMood : 'Not selected';
  saveMood(selectedMood);
});


loadMood();


function addTask() {
  const taskText = newTaskInput.value;
  const categoryText = categoryInput.value;
  const dueDateValue = dueDateInput.value;

  if (!taskText || !categoryText || !dueDateValue) {
    alert('Please enter all task details (Task, Category, Due Date).');
    return;
  }


  const listItem = document.createElement('li');


  const taskTextElement = document.createElement('span');
  taskTextElement.textContent = `Task: ${taskText}`;
  listItem.appendChild(taskTextElement);

  const categoryElement = document.createElement('span');
  categoryElement.textContent = ` | Category: ${categoryText}`;
  listItem.appendChild(categoryElement);


  const dueDateElement = document.createElement('span');
  dueDateElement.textContent = ` | Due: ${new Date(dueDateValue).toLocaleDateString()}`;
  listItem.appendChild(dueDateElement);


  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    taskList.removeChild(listItem);
  });

  listItem.appendChild(deleteButton);
  taskList.appendChild(listItem);

  newTaskInput.value = '';
  categoryInput.value = '';
  dueDateInput.value = '';
}

addTaskButton.addEventListener('click', addTask);

newTaskInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});


function displayCurrentDate() {
  const currentDateElement = document.getElementById('current-date');
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);

  currentDateElement.textContent = `Today's Date: ${formattedDate}`;
}



displayCurrentDate();