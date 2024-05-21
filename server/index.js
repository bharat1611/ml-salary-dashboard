const express = require('express');
const cors = require('cors');
const OpenAI = require("openai");
const salaryData = require('./salaryData');

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: 'API_KEY',
});

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;

  const formatDataForPrompt = (data) => {
    console.log(typeof data);
    return data.map(item => {
      const jobTitles = Object.keys(item.jobs).join(', ');
      return `In ${item.year}, there were ${item.total_jobs} jobs with an average salary of $${item.average_salary.toFixed(2)}. Job titles include: ${jobTitles}.`;
    }).join(' ');
  };

  const salaryDataFormatted = formatDataForPrompt(salaryData);

  try {
    const response = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt: `You are an AI assistant with expertise in analyzing ML Engineer salaries data. Answer the following question based on the provided dataset: ${salaryDataFormatted} Now, respond to: ${prompt}`,
      max_tokens: 150,
    });

    res.json({ text: response.choices[0].text });
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).json({ error: 'Error with OpenAI API' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
