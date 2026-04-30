import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";
import "../styles/home.scss";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Sistema de Faxinas</h1>

      <button onClick={() => navigate("/agendamentos")}>
        Gerenciar Agendamentos
      </button>

      <button onClick={() => {
        logout();
        navigate("/");
      }}>
        Logout
      </button>
    </div>
  );
};

export default Home;