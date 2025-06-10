function Result({ score, formData, restart }) {
  const fakeLeaderboard = [
    { name: "Crain the Brain", points: 48 },
    { name: "Quiztopher Nolan", points: 44 },
    { name: "Smarty McGee", points: 42 },
    { name: "Trivia Newton-John", points: 39 },
    { name: "Big Brain Bobby", points: 36 },
    { name: "Professor Guess", points: 35 },
    { name: "You", points: score }, // user's score here
    { name: "Mystery Meat", points: 32 },
    { name: "The Grand Inquisitor", points: 30 },
    { name: "Nogginator", points: 28 },
  ].sort((a, b) => b.points - a.points);

  const displayName = formData.nickname || `${formData.firstName} ${formData.lastName}`;

  return (
    <div className="results-container">
      <h2>🎉 Great job, {displayName}!</h2>
      <p>You scored <strong>{score}</strong> points in The Brain Game.</p>

      <h3>🏆 Global Leaderboard</h3>
      <ul className="leaderboard">
        {fakeLeaderboard.map((player, i) => (
          <li key={i}>
            <span>{i + 1}. {player.name}</span>
            <span>{player.points} pts</span>
          </li>
        ))}
      </ul>

      <button onClick={restart}>Play Again</button>
    </div>
  );
}

export default Result;
