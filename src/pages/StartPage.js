import React, { useState } from "react";

function StartPage({ onStart }) {
  const [difficulty, setDifficulty] = useState("easy");

  const handleStart = () => {
    onStart(difficulty);
  };

  return (
    <div className="quiz-container">
      <h2>Select Difficulty</h2>

      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="easy">🟢 Easy</option>
        <option value="medium">🟡 Medium</option>
        <option value="hard">🔴 Hard</option>
      </select>

      <br /><br />
      <button onClick={handleStart}>Start Quiz</button>
    </div>
  );
}

export default StartPage;
