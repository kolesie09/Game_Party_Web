import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Milionerzy.css";

const Milionerzy = () => {
  const [level] = useState([
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
  const [questionId, setQuestionId] = useState();
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [nowLevel, setNowLevel] = useState(11); // 12, bo 13. pytanie = 1 000 000

  const updateLevelOnServer = async (questionId, wasCorrect) => {
    try {
      await fetch(
        `http://localhost:8080/api/milionerzy/question/${questionId}/level?correctAnswer=${wasCorrect}`,
        { method: "PUT" }
      );
    } catch (err) {
      console.error("Błąd podczas aktualizacji poziomu pytania:", err);
    }
  };
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const loadQuestion = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/milionerzy/question?level=${nowLevel + 1}`
      );
      const data = await res.json();

      console.log("Pobrane ID pytania:", data.id);
      setQuestionId(data.id);
      setQuestion(data.name);
      const shuffledAnswers = shuffleArray(data.answers);
      setAnswers(shuffledAnswers);
      setCorrectAnswer(data.correctAnswer); // załóżmy że backend to zwraca
    } catch (error) {
      console.error("Błąd podczas pobierania pytania:", error);
      setAnswers([]);
    }
  };

  useEffect(() => {
    if (nowLevel >= 0 && nowLevel < 12) {
      loadQuestion();
    }
  }, [nowLevel]);

  const handleSubmit = (answer) => {
    const wasCorrect = answer.id === correctAnswer;
    if (wasCorrect) {
      toast.success("Dobra odpowiedź!");
      if (nowLevel > 0) {
        setNowLevel(nowLevel - 1);
      } else {
        toast.success("Gratulacje! Wygrałeś milion!");
      }
    } else {
      toast.error("Zła odpowiedź. Koniec gry.");
      if (nowLevel === 11) {
        loadQuestion();
      } else {
        setNowLevel(11);
      }
    }
    updateLevelOnServer(questionId, wasCorrect);
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
