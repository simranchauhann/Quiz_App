import React, { useState, useEffect } from "react";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";

function QuizPage({ questions, onFinish }) {
  const [currentQn, setCurrentQn] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState("");
  const [timer, setTimer] = useState(30);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const currentQuestion = questions[currentQn];

  // Timer countdown
  useEffect(() => {
    if (timer === 0) {
      handleNext(true);
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Shuffle options only once per question
  useEffect(() => {
    setTimer(30);
    const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
    const shuffled = shuffleArray(options);
    setShuffledOptions(shuffled);
    setSelected(answers[currentQn]?.selected || "");
  }, [currentQn]);

  const shuffleArray = (array) => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const handleNext = (auto = false) => {
    const answerRecord = {
      question: currentQuestion,
      selected: selected || "Skipped",
      isCorrect: selected === currentQuestion.correct_answer,
    };

    const updatedAnswers = [...answers];
    updatedAnswers[currentQn] = answerRecord;

    setAnswers(updatedAnswers);

    if (currentQn + 1 === questions.length) {
      onFinish(updatedAnswers);
    } else {
      setCurrentQn(currentQn + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQn === 0) return;
    setCurrentQn(currentQn - 1);
  };

  const handleSkip = () => {
    setSelected(""); // no selection
    handleNext(true); // treat like timeout
  };

  return (
    <div className="quiz-container">
      <ProgressBar current={currentQn} total={questions.length} />
      <p><strong>⏳ Time Left: {timer}s</strong></p>

      <QuestionCard
        question={currentQuestion.question}
        options={shuffledOptions}
        currentIndex={currentQn}
        total={questions.length}
        selected={selected}
        onSelect={setSelected}
      />

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", gap: "10px", flexWrap: "wrap" }}>
        <button onClick={handlePrevious} disabled={currentQn === 0}>
          Previous
        </button>

        <button onClick={handleSkip}>
          Skip
        </button>

        <button onClick={() => handleNext()} disabled={!selected}>
          {currentQn + 1 === questions.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default QuizPage;
