import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#1e293b", color: "#fff" }}>
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/usuarios">Usuários</Link> |{" "}
      <Link to="/veiculos">Veículos</Link> |{" "}
      <Link to="/entregadores">Entregadores</Link> |{" "}
      <Link to="/uso">Uso Veículo</Link> |{" "}
      <Link to="/manutencao">Manutenção</Link> |{" "}
      <Link to="/relatorio">Relatório</Link>
    </nav>
  );
}
