document.addEventListener('DOMContentLoaded', () => {
  const moodSelect = document.getElementById('mood-select');
  const moodDisplay = document.getElementById('mood-display');
  const moodHistoryContainer = document.getElementById('mood-history');
  const journalPrompt = document.getElementById('journal-prompt');
  const journalEntry = document.getElementById('journal-entry');
  const newTaskInput = document.getElementById('new-task');
  const addTaskButton = document.getElementById('add-task');
  const taskList = document.getElementById('task-list');
  const categoryInput = document.getElementById('task-category');
  const dueDateInput = document.getElementById('task-due-date');

  const journalPrompts = {
    Happy: "What made you feel happy today?",
    Calm: "Describe something that brought you peace today.",
    Motivated: "What is your main goal right now, and why is it important?",
    Stressed: "What do you usually do for self care?",
    Tired: "What can you do to recharge and feel more energized?"
  };

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
  }

  moodSelect.addEventListener('change', () => {
    const selectedMood = moodSelect.value;
    if (selectedMood) {
      moodDisplay.textContent = selectedMood;
      saveMood(selectedMood);
      journalPrompt.textContent = journalPrompts[selectedMood] || 'No prompt available.';
    } else {
      moodDisplay.textContent = 'Not selected';
      journalPrompt.textContent = 'You must select a mood to see a journal prompt.';
    }
    journalEntry.value = '';
  });

  function addTask() {
    const taskText = newTaskInput.value.trim();
    const categoryText = categoryInput.value.trim();
    const dueDateValue = dueDateInput.value;

    if (!taskText || !categoryText || !dueDateValue) {
      alert('Please enter all fields (task, category, and due date).');
      return;
    }

    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>Task: ${taskText}</span> |
      <span>Category: ${categoryText}</span> |
      <span>Due: ${new Date(dueDateValue).toLocaleDateString()}</span>
      <button class="complete-btn">Complete Task</button>
    `;

    const completeButton = listItem.querySelector('.complete-btn');
    completeButton.addEventListener('click', () => {
      clearTask(listItem);
    });

    taskList.appendChild(listItem);

    newTaskInput.value = '';
    categoryInput.value = '';
    dueDateInput.value = '';
  }

  function clearTask(taskItem) {
    taskList.removeChild(taskItem);
  }

  addTaskButton.addEventListener('click', addTask);
  newTaskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') addTask();
  });

  loadMood();
});
