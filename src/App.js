import React, { useEffect, useState } from "react";
import StartPage from "./pages/StartPage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";

function App() {
  const [questions, setQuestions] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (difficulty) {
      setLoading(true);
      fetch(`https://opentdb.com/api.php?amount=10&type=multiple&difficulty=${difficulty}`)
        .then((res) => res.json())
        .then((data) => {
          setQuestions(data.results);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load questions", err);
          setLoading(false);
        });
    }
  }, [difficulty]);

  const handleStart = (diff) => {
    setDifficulty(diff);
    setCompleted(false);
    setAnswers([]);
  };

  const handleFinish = (finalAnswers) => {
    setAnswers(finalAnswers);
    setCompleted(true);
  };

  const handleRestart = () => {
    setDifficulty("");
    setCompleted(false);
    setAnswers([]);
    setQuestions([]);
  };

  if (!difficulty) return <StartPage onStart={handleStart} />;
  if (loading) return <h2>Loading Questions...</h2>;
  if (!questions.length) return <h2>No questions found.</h2>;

  return completed ? (
    <ResultPage answers={answers} onRestart={handleRestart} />
  ) : (
    <QuizPage questions={questions} onFinish={handleFinish} />
  );
}

export default App;
