import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const SettingsFamiliada = () => {
  return (
    <>
      <div className="familiada-container">
        <h1>Ustawienia Familiada</h1>
        <Button
          as={Link}
          to="/settings/familiada/AddQuestion"
          className="answer-button"
        >
          Dodaj pytanie
        </Button>

        <Button
          as={Link}
          to="/settings/familiada/AddAnswer"
          className="answer-button"
        >
          Dodaj odpowiedzi
        </Button>
      </div>
    </>
  );
};

export default SettingsFamiliada;
