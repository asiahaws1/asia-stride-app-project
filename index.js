
const moodSelect = document.getElementById('mood-select');
const moodDisplay = document.getElementById('mood-display');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');


// update mood
moodSelect.addEventListener('change', () => {
  const selectedMood = moodSelect.value; 
  moodDisplay.textContent = selectedMood ? selectedMood : 'Not selected';
});

//make a new task
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
