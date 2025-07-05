import React, { useEffect, useState } from "react";
import "./Familiada.css";

const Familiada = () => {
  const [question, setQuestion] = useState("");
  const [allAnswers, setAllAnswers] = useState([]); // wszystkie z backendu
  const [answers, setAnswers] = useState([]); // tylko 4 najlepsze
  const [revealed, setRevealed] = useState([]);
  const [input, setInput] = useState("");
  const [lastQuestion, setLastQuestion] = useState(null);
  const [newanswers, setNewAnswers] = useState([]);
  const [showAll, setShowAll] = useState(false); // czy pokazać wszystkie?
  const [questionId, setQuestionId] = useState(null);

  const loadQuestion = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/familiada/random");
      const data = await res.json();

      if (data.name === lastQuestion) {
        console.log("Wylosowano to samo pytanie, losuję ponownie...");
        return loadQuestion();
      }

      const sorted = [...data.answers].sort(
        (a, b) => Number(b.point) - Number(a.point)
      );
      const top4 = sorted.slice(0, 4);

      setQuestion(data.name);
      setQuestionId(data.id);
      setAllAnswers(sorted);
      setAnswers(top4);
      setRevealed(Array(top4.length).fill(null));
      setLastQuestion(data.name);
      setNewAnswers([]);
      setShowAll(false);
    } catch (error) {
      console.error("Błąd podczas pobierania pytania:", error);
    }
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // zapobiega przeładowaniu strony

    if (!input.trim()) return; // jeśli pusty input, nic nie rób

    const text = removeDiacritics(input.trim().toLowerCase());

    const index = answers.findIndex(
      (a) => removeDiacritics(a.name.toLowerCase()) === text
    );

    if (index !== -1) {
      // Odpowiedź już istnieje, odsłoń ją lokalnie i zwiększ punktację na backendzie
      const newRevealed = [...revealed];
      newRevealed[index] = answers[index];
      setRevealed(newRevealed);

      try {
        await saveAnswer({ name: answers[index].name, point: 1 });
        //await loadQuestion();
      } catch (error) {
        console.error("Błąd zapisu odpowiedzi:", error);
      }
    } else {
      // Nowa odpowiedź — sprawdź czy już nie dodana lokalnie
      const alreadyExists = newanswers.some(
        (a) => removeDiacritics(a.name.toLowerCase()) === text
      );

      if (!alreadyExists) {
        const newAnswer = { name: input.trim(), point: 1 };
        setNewAnswers((prev) => [...prev, newAnswer]);
        try {
          await saveAnswer(newAnswer);
          //await loadQuestion();
        } catch (error) {
          console.error("Błąd zapisu odpowiedzi:", error);
        }
      }
    }

    setInput(""); // wyczyść input po obsłużeniu
  };

  const revealAllAnswers = () => {
    setAnswers(allAnswers);
    setRevealed(allAnswers);
    setShowAll(true);
  };

  const saveAnswer = async (answer) => {
    const res = await fetch(
      `http://localhost:8080/api/familiada/${questionId}/answers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answer),
      }
    );

    if (!res.ok) {
      throw new Error("Nie udało się zapisać odpowiedzi.");
    }
  };

  const removeDiacritics = (str) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return (
    <div className="familiada-container">
      <h1 className="familiada-title">Familiada</h1>
      <h3 className="familiada-question">
        {question || "Ładowanie pytania..."}
      </h3>

      <div className="answers-list">
        {answers.map((a, i) => (
          <div key={i} className="answer-item">
            {revealed[i] ? `${a.name} - ${a.point} pkt` : "__________"}
          </div>
        ))}
      </div>

      {!showAll && (
        <form className="answer-form" onSubmit={handleSubmit}>
          <input
            className="answer-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Twoja odpowiedź"
            autoComplete="off"
          />
          <button
            className="answer-button"
            type="submit"
            disabled={!input.trim()}
          >
            OK
          </button>
        </form>
      )}

      <div className="control-buttons">
        <button className="secondary-button" onClick={revealAllAnswers}>
          Pokaż wszystkie odpowiedzi
        </button>
        <button className="secondary-button" onClick={loadQuestion}>
          Następne pytanie
        </button>
      </div>

      {newanswers.length > 0 && (
        <div className="new-answers">
          <h4>Twoje nowe odpowiedzi:</h4>
          <ul>
            {newanswers.map((a, i) => (
              <li key={i}>{a.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Familiada;
