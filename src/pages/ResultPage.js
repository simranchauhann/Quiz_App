import React from "react";
import decodeHtml from "../utils/decodeHTML";
import "../App.css";

function ResultPage({ answers, onRestart }) {
  const score = answers.filter((ans) => ans.isCorrect).length;
  const total = answers.length;

  // Feedback message based on performance
  const getMessage = () => {
    const ratio = score / total;
    if (ratio === 1) return "🎉 Perfect Score! You're a genius!";
    if (ratio >= 0.7) return "👏 Great job! You nailed it.";
    if (ratio >= 0.4) return "👍 Not bad! Keep practicing.";
    return "😅 Oops! Try again.";
  };

  return (
    <div className="quiz-container">
      <h2>Quiz Completed!</h2>

      <div className="score-card">
        <h3>{getMessage()}</h3>
        <p className="score">
          You scored <strong>{score}/{total}</strong>
        </p>
      </div>

      <div className="answer-summary">
        {answers.map((ans, idx) => (
          <div
            key={idx}
            className={`answer-item ${ans.isCorrect ? "correct" : "incorrect"}`}
          >
            <p>
              <strong>Q{idx + 1}:</strong> {decodeHtml(ans.question.question)}
            </p>
            <p>
              ✅ Correct:{" "}
              <span className="correct-text">
                {decodeHtml(ans.question.correct_answer)}
              </span>
              <br />
              ✏️ Your Answer:{" "}
              <span
                className={
                  ans.isCorrect ? "correct-text" : "incorrect-text"
                }
              >
                {decodeHtml(ans.selected)}
              </span>
            </p>
          </div>
        ))}
      </div>

      <div className="restart-container">
        <button className="restart-btn" onClick={onRestart}>
          🔁 Restart Quiz
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
