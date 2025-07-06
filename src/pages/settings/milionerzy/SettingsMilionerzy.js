import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./SettingsMilionerzy.css";

const SettingsMilionerzy = () => {
  return (
    <>
      <div className="familiada-container">
        <h1>Ustawienia Milonerzy</h1>
        <Button
          as={Link}
          to="/settings/milionerzy/AddQuestion"
          className="answer-button"
        >
          Dodaj pytanie
        </Button>

        <Button
          as={Link}
          to="/settings/milionerzy/AddAnswer"
          className="answer-button"
        >
          Dodaj odpowiedzi
        </Button>
      </div>
    </>
  );
};

export default SettingsMilionerzy;
