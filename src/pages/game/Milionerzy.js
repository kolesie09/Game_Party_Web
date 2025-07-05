import React, { useEffect, useState } from "react";
import "./Milionerzy.css";

const Milionerzy = () => {
  const [level, setLevel] = useState([
    "1 000 000",
    "500 000",
    "250 000",
    "125 000",
    "75 000",
    "40 000",
    "20 000",
    "10 000",
    "5 000",
    "2 000",
    "1 000",
    "500",
  ]);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [nowLevel, setNowLevel] = useState(11); // 12, bo 13. pytanie = 1 000 000

  const loadQuestion = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/milionerzy/question?level=${nowLevel}`
      );
      const data = await res.json();

      setQuestion(data.name);
      setAnswers(data.answers);
      setCorrectAnswer(data.correctAnswer); // załóżmy że backend to zwraca
    } catch (error) {
      console.error("Błąd podczas pobierania pytania:", error);
      setAnswers([]);
    }
  };

  useEffect(() => {
    loadQuestion();
  }, [nowLevel]);

  const handleSubmit = (answer) => {
    if (answer.id === correctAnswer) {
      alert("Dobra odpowiedź!");
      if (nowLevel > 0) {
        setNowLevel(nowLevel - 1);
        loadQuestion();
      } else {
        alert("Gratulacje! Wygrałeś milion!");
      }
    } else {
      alert("Zła odpowiedź. Koniec gry.");
      setNowLevel(11);
      // tutaj możesz dodać reset lub coś innego
    }
  };

  return (
    <div className="milionerzy-container">
      <h1 className="milionerzy-title">Milionerzy</h1>

      <div className="level-list">
        {level.map((a, i) => (
          <div
            key={i}
            className={`level-item ${i === nowLevel ? "highlighted" : ""}`}
          >
            {a}
          </div>
        ))}
      </div>

      <h3 className="milionerzy-question">
        {question || "Ładowanie pytania..."}
      </h3>

      <div className="answer-form">
        {Array.isArray(answers) && answers.length > 0 ? (
          answers.map((a) => (
            <button
              key={a.id}
              className="answer-button"
              onClick={() => handleSubmit(a)}
            >
              {a.name}
            </button>
          ))
        ) : (
          <p>Ładowanie odpowiedzi...</p>
        )}
      </div>
    </div>
  );
};

export default Milionerzy;
