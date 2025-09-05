import React from "react";

function QuestionCard({ question, options, currentIndex, total, selected, onSelect }) {
  return (
    <div>
      <h2>Question {currentIndex + 1} of {total}</h2>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option)}
            className={selected === option ? "selected" : ""}
            dangerouslySetInnerHTML={{ __html: option }}
          />
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
