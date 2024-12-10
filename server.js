const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

let moodHistory = [];
let tasks = [];

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API Server is running.' });
});

app.post('/mood-history', (req, res) => {
  const { mood } = req.body;
  moodHistory.push({ mood, date: new Date() });
  res.status(201).json({ success: true });
});

app.get('/mood-history', (req, res) => {
  res.status(200).json(moodHistory);
});

app.put('/mood-history/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < moodHistory.length) {
    moodHistory[index] = { mood: req.body.mood, date: new Date() };
    res.status(200).json({ success: true, updated: moodHistory[index] });
  } else {
    res.status(400).json({ error: 'Invalid index.' });
  }
});

app.delete('/mood-history/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < moodHistory.length) {
    moodHistory.splice(index, 1);
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid index.' });
  }
});

app.post('/tasks', (req, res) => {
  const { text, category, dueDate } = req.body;
  const newTask = { text, category, dueDate, complete: false };
  tasks.push(newTask);
  res.status(201).json({ success: true, tasks });
});

app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

app.put('/tasks/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < tasks.length) {
    tasks[index] = { ...tasks[index], ...req.body };
    res.status(200).json({ success: true, updated: tasks[index] });
  } else {
    res.status(400).json({ error: 'Invalid index.' });
  }
});

app.delete('/tasks/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    res.status(200).json({ success: true, tasks });
  } else {
    res.status(400).json({ error: 'Invalid index.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
