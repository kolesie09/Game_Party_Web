import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddQuestion.css";

const AddQuestion = () => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: question,
      answers: answers
        .filter((a) => a.trim() !== "")
        .map((a) => ({ name: a.trim() })),
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/familiada/question",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Błąd zapisu pytania");

      const data = await response.json();
      console.log("Dodano pytanie:", data);

      // Wyczyść formularz
      setQuestion("");
      setAnswers(["", "", "", ""]);

      // Ustaw komunikat o sukcesie
      setSuccessMessage("Pytanie zostało pomyślnie dodane!");

      // Jeśli chcesz nawigować gdzieś po sukcesie, możesz dodać setTimeout lub użyć navigate
      // tutaj na razie nie nawigujemy
    } catch (error) {
      console.error("Błąd:", error.message);
      setSuccessMessage(""); // lub ustaw komunikat o błędzie jeśli chcesz
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

        {answers.map((answer, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Odpowiedź ${index + 1}`}
            value={answer}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            className="input-answer"
            required
          />
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
