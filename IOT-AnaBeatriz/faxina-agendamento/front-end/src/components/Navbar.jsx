import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <button onClick={() => navigate("/home")}>Home</button>
      <button onClick={() => navigate("/clientes")}>Clientes</button>
      <button onClick={() => navigate("/profissionais")}>Profissionais</button>
      <button onClick={() => navigate("/agendamentos")}>Agendamentos</button>

      <button onClick={() => {
        logout();
        navigate("/");
      }}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;