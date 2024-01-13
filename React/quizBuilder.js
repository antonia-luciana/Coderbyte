import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const style = {
  container: {
    padding: "20px",
    border: "1px solid #E0E0E0",
    borderRadius: "15px",
    width: "max-content",
    marginBottom: "40px",
  },
  question: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  options: {
    marginBottom: "5px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 15px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#FFF",
    fontSize: "14px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  feedback: {
    marginTop: "10px",
    fontSize: "14px",
  },
};

function QuizApp() {
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [message, setMessage] = useState("");
  // do not modify the questions or answers below
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Madrid"],
      correct: "Paris",
    },
    {
      question: "What is the capital of Germany?",
      options: ["Berlin", "Munich", "Frankfurt", "Hamburg"],
      correct: "Berlin",
    },
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(score);
    const correctAnswer = questions[index].correct;
    if (questions[index].options.indexOf(correctAnswer) == selectedIndex) {
      setScore((score) => score + 1);
      setMessage("Correct!");
    } else {
      setMessage("Incorrect!");
    }
    setIndex((index) => index + 1);
    setSelectedIndex(null);
  };

  useEffect(() => {
    // Your effect code using score
    if (index >= questions.length) {
      setMessage(`Quiz Complete! You scored ${score} out of ${questions.length}!`);
    }
  }, [index]);

  return (
    <div style={style.container}>
      {index < questions.length && (
        <form onSubmit={onSubmit}>
          <div>
            <div id="question" style={style.question}>
              {questions[index].question}
            </div>
            <div style={style.options}>
              {questions[index].options.map((op, idx) => (
                <div>
                  <input
                    key={`option${idx + 1}`}
                    type="radio"
                    id={`option${idx + 1}`}
                    checked={selectedIndex == idx ? true : false}
                    onChange={() => {
                      setSelectedIndex(idx);
                    }}
                  />
                  <label htmlFor={`option${idx + 1}`}>{op}</label>
                </div>
              ))}
            </div>
          </div>
          <button style={style.button} id="submitBtn" type="submit">
            Submit
          </button>
        </form>
      )}
      <div id="feedback" style={style.feedback}>
        {message}
      </div>
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<QuizApp />);