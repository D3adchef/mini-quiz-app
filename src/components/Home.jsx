import { useEffect, useState } from 'react';

function Home({ onStart }) {
  const [showInstructions, setShowInstructions] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    nickname: '',
    category: '',
    difficulty: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        setShowInstructions(false);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, age, category, difficulty } = formData;

    if (!firstName || !lastName || !age || !category || !difficulty) {
      setError('All fields except nickname are required!');
      return;
    }

    setError('');
    onStart(formData); // Pass formData to parent
  };

  return (
    <div className="home-container">
      {showInstructions && (
        <div className="instructions-box">
          <h2>🎉 Welcome to The Brain Game! 🧠</h2>
          <p>Get ready to test your trivia knowledge across 4 categories.</p>
          <ul>
            <li>Each game has 10 questions</li>
            <li>Choose your difficulty: Easy, Medium, Hard, or Random</li>
            <li>🟢 Easy = 1 pt | 🟠 Medium = 3 pts | 🔴 Hard = 5 pts</li>
            <li>🎲 Random = score based on actual difficulty</li>
            <li>Your final score determines your place on the leaderboard!</li>
          </ul>
          <p><strong>Press the spacebar to start!</strong></p>
        </div>
      )}

      {!showInstructions && (
        <form onSubmit={handleSubmit} className="quiz-form">
          <h2>🧠 Let's Get Started</h2>
          <input
            type="text"
            name="firstName"
            placeholder="FIRST NAME"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="LAST NAME"
            value={formData.lastName}
            onChange={handleChange}
          />
          <select name="age" value={formData.age} onChange={handleChange}>
            <option value="">Select Age</option>
            <option value="under18">Under 18</option>
            <option value="18-30">18-30</option>
            <option value="31-50">31-50</option>
            <option value="51+">51+</option>
          </select>
          <input
            type="text"
            name="nickname"
            placeholder="Optional Nickname for Leaderboard"
            value={formData.nickname}
            onChange={handleChange}
          />
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="21">Sports</option>
            <option value="11">Movies</option>
            <option value="23">History</option>
            <option value="random">Mystery</option>
          </select>
          <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="random">Random</option>
          </select>
          {error && <p className="error-msg">{error}</p>}
          <button type="submit">Ready when you are, PAL?</button>
        </form>
      )}
    </div>
  );
}

export default Home;
