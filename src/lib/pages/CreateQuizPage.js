
import React, { useState } from 'react';

function CreateQuizPage() {
  const [questions, setQuestions] = useState([
    { category: 'Single Correct', questionText: '', options: [{ optionText: '', isCorrect: true }] },
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { category: 'Single Correct', questionText: '', options: [{ optionText: '', isCorrect: true }] }]);
  };

  const handleCategoryChange = (e, index) => {
    const newQuestions = [...questions];
    newQuestions[index].category = e.target.value;
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (e, index) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = e.target.value;
    setQuestions(newQuestions);
  };

  const addOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push({ optionText: '', isCorrect: false });
    setQuestions(newQuestions);
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex].optionText = e.target.value;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.forEach((option, idx) => {
      option.isCorrect = idx === optionIndex;
    });
    setQuestions(newQuestions);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-4">Dynamic Quiz Creator</h1>
      {questions.map((question, index) => (
        <div key={index} className="mb-4 p-4 border rounded-lg bg-white">
          <div className="mb-2">
            <select
              value={question.category}
              onChange={(e) => handleCategoryChange(e, index)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="Single Correct">Single Correct</option>
              <option value="Multiple Options">Multiple Options</option>
              <option value="Answer in One Word">Answer in One Word</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Enter question"
            value={question.questionText}
            onChange={(e) => handleQuestionChange(e, index)}
            className="w-full p-2 border rounded-lg mb-2"
          />
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <input
                type="text"
                placeholder={`Option ${optionIndex + 1}`}
                value={option.optionText}
                onChange={(e) => handleOptionChange(e, index, optionIndex)}
                className="w-full p-2 border rounded-lg mb-2"
              />
              {question.category === 'Multiple Options' && (
                <input
                  type="checkbox"
                  checked={option.isCorrect}
                  onChange={() => handleCorrectOptionChange(index, optionIndex)}
                  className="mr-2"
                />
              )}
              {question.category === 'Single Correct' && (
                <input
                  type="radio"
                  name={`correctOption-${index}`}
                  checked={option.isCorrect}
                  onChange={() => handleCorrectOptionChange(index, optionIndex)}
                  className="mr-2"
                />
              )}
            </div>
          ))}
          <button
            onClick={() => addOption(index)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Option
          </button>
        </div>
      ))}
      <button
        onClick={addQuestion}
        className="bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        Add Question
      </button>
      <button
        onClick={() => console.log(questions)}
        className="bg-indigo-500 text-white px-4 py-2 rounded-lg mt-4"
      >
        Submit Quiz
      </button>
    </div>
  );
}

export default CreateQuizPage;


