const moodSelect = document.getElementById('mood-select');
const moodDisplay = document.getElementById('mood-display');
const moodHistoryContainer = document.createElement('ul'); 
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');


document.body.appendChild(moodHistoryContainer);


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

  moodHistoryContainer.innerHTML = '';

  history.forEach((mood, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `Mood ${index + 1}: ${mood}`;
    moodHistoryContainer.appendChild(listItem);
  });
}


moodSelect.addEventListener('change', () => {
  const selectedMood = moodSelect.value;
  moodDisplay.textContent = selectedMood ? selectedMood : 'Not selected';
  saveMood(selectedMood);
});


loadMood();

function addTask() {
  const taskText = newTaskInput.value;

  if (!taskText) {
    alert('Please enter a task.');
    return;
  }

  const listItem = document.createElement('li');
  listItem.textContent = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    taskList.removeChild(listItem);
  });

  listItem.appendChild(deleteButton);
  taskList.appendChild(listItem);
  newTaskInput.value = '';
}

addTaskButton.addEventListener('click', addTask);

newTaskInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});
