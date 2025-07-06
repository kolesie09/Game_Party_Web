import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddQuestion.css";

const AddQuestion = () => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [selectedCorrectIndex, setSelectedCorrectIndex] = useState(null);
  const [selectedLevelIndex, setSelectedLevelIndex] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  const level = [
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
  ];

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedAnswers = answers.map((a) => a.trim()).filter((a) => a !== "");

    if (trimmedAnswers.length < 4) {
      toast.warning("Musisz podać 4 odpowiedzi.");
      return;
    }

    if (
      selectedCorrectIndex === null ||
      !answers[selectedCorrectIndex].trim()
    ) {
      toast.warning("Zaznacz poprawną odpowiedź.");
      return;
    }

    const payload = {
      name: question.trim(),
      level: selectedLevelIndex + 1,
      answers: answers.map((a) => ({ name: a.trim() })),
      correctAnswer: answers[selectedCorrectIndex].trim(),
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/milionerzy/question",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Błąd zapisu pytania");

      const data = await response.json();
      console.log("Dodano pytanie:", data);

      setQuestion("");
      setAnswers(["", "", "", ""]);
      setSelectedCorrectIndex("");
      setSelectedLevelIndex(0);
      setSuccessMessage("Pytanie zostało pomyślnie dodane!");
    } catch (error) {
      console.error("Błąd:", error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="center-form">
      <h1>Dodaj nowe pytanie</h1>
      <form onSubmit={handleSubmit} className="simple-form">
        <input
          type="text"
          placeholder="Treść pytania"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="input-question"
          required
        />

        <label className="mt-10">
          Poziom pytania:
          <select
            value={selectedLevelIndex}
            onChange={(e) => setSelectedLevelIndex(parseInt(e.target.value))}
            className="select-level"
          >
            {level.map((label, index) => (
              <option key={index} value={index}>
                {label}
              </option>
            ))}
          </select>
        </label>

        {answers.map((answer, index) => (
          <div key={index} className="answer-row">
            <input
              type="text"
              placeholder={`Odpowiedź ${index + 1}`}
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="input-answer"
              required
            />
            <label>
              <input
                type="radio"
                name="correct"
                checked={selectedCorrectIndex === index}
                onChange={() => setSelectedCorrectIndex(index)}
              />
              Poprawna
            </label>
          </div>
        ))}

        <button type="submit" className="btn-submit">
          Dodaj pytanie
        </button>
      </form>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
};

export default AddQuestion;
