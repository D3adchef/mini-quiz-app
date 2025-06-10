import { useState } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';
import './App.css';

function App() {
  const [step, setStep] = useState('home'); // home → quiz → result
  const [formData, setFormData] = useState(null);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [lastResult, setLastResult] = useState(null); // { correct: true/false, correctAnswer: "" }

  const startQuiz = async (data) => {
    setFormData(data);

    // Determine category (handle 'random')
    const category = data.category === 'random'
      ? [21, 11, 23][Math.floor(Math.random() * 3)]
      : data.category;

    // Determine difficulty
    const difficulty = data.difficulty === 'random'
      ? ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)]
      : data.difficulty;

    const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.response_code === 0) {
        setQuestions(data.results);
        setQuestionIndex(0);
        setScore(0);
        setStep('quiz');
      } else {
        alert('Failed to load questions. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Error fetching questions.');
    }
  };

  const handleNextQuestion = (wasCorrect, correctAnswer, difficulty) => {
    const points = {
      easy: 1,
      medium: 3,
      hard: 5
    };

    // Score based on difficulty (random uses actual)
    const actualDifficulty = formData.difficulty === 'random' ? difficulty : formData.difficulty;
    if (wasCorrect) {
      setScore(prev => prev + points[actualDifficulty]);
    }

    setLastResult({ correct: wasCorrect, correctAnswer });

    if (questionIndex + 1 >= 10) {
      setStep('result');
    } else {
      setQuestionIndex(prev => prev + 1);
    }
  };

  const restartQuiz = () => {
    setFormData(null);
    setQuestions([]);
    setQuestionIndex(0);
    setScore(0);
    setLastResult(null);
    setStep('home');
  };

  return (
    <div className="App">
      {step === 'home' && <Home onStart={startQuiz} />}
      {step === 'quiz' && (
        <Quiz
          questionData={questions[questionIndex]}
          index={questionIndex}
          onAnswer={handleNextQuestion}
          total={questions.length}
        />
      )}
      {step === 'result' && (
        <Result
          score={score}
          formData={formData}
          restart={restartQuiz}
        />
      )}
    </div>
  );
}

export default App;
