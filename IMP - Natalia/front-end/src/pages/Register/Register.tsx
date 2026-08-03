import { useState } from "react";
import Input from "../../components/Input";
import { Link } from "react-router";
import Button from "../../components/Button";
import Login from "../Login/Login";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cep, setCep] = useState("");

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(name, email, password, confirmPassword, cep);
  }

  return (
    <div>
      <form
        className="flex h-screen items-center justify-center bg-[#161410]"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <Link to="/" >
          <img src="./src/assets/logo.jpg" alt="" className="mb-4 max-w-3xs rounded-xl" />
          </Link>

          <Input placeholder="Nome" onChange={(e) => setName(e.target.value)} />
          <Input
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Senha"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Confirmar senha"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Input
            placeholder="CEP"
            type="text"
            onChange={(e) => setCep(e.target.value)}
          />

          <Button title="Login"/>
          <Button title="Já tenho uma conta" variant="outline" />
        </div>
      </form>
    </div>
  );
};

export default Register;