import { useEffect, useState } from 'react';

function Quiz({ questionData, index, onAnswer, total }) {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Shuffle the correct and incorrect answers
    const allAnswers = [...questionData.incorrect_answers, questionData.correct_answer];
    setShuffledAnswers(allAnswers.sort(() => Math.random() - 0.5));
    setSelectedAnswer('');
    setError('');
  }, [questionData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAnswer) {
      setError('Please select an answer before continuing!');
      return;
    }

    const wasCorrect = selectedAnswer === questionData.correct_answer;
    onAnswer(wasCorrect, questionData.correct_answer, questionData.difficulty);
  };

  return (
    <div className="quiz-question">
      <h2>🧩 Question {index + 1} of {total}</h2>
      <p dangerouslySetInnerHTML={{ __html: questionData.question }} />

      <form onSubmit={handleSubmit}>
        {shuffledAnswers.map((answer, i) => (
          <div key={i}>
            <label>
              <input
                type="radio"
                name="answer"
                value={answer}
                checked={selectedAnswer === answer}
                onChange={() => setSelectedAnswer(answer)}
              />
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </label>
          </div>
        ))}

        {error && <p className="error-msg">{error}</p>}

        <button type="submit">Lock It In!</button>
      </form>
    </div>
  );
}

export default Quiz;
