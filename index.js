
const moodSelect = document.getElementById('mood-select');
const moodDisplay = document.getElementById('mood-display');

moodSelect.addEventListener('change', () => {
  const selectedMood = moodSelect.value; 
  moodDisplay.textContent = selectedMood ? selectedMood : 'Not selected';
});
