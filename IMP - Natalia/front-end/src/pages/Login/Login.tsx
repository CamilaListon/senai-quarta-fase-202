import { useState } from "react";
import Input from "../../components/Input";
import { Link } from "react-router";
import Button from "../../components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(email, password);
  }

  return (
    <div>
      <form
        className="flex h-screen items-center justify-center bg-[#161410]"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <Link to="/">
            <img src="./src/assets/logo.jpg" alt="" className="mb-4 max-w-3xs rounded-xl" />
          </Link>
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>{email}</p>

          <Link to="/login" className="w-full">
            <Button title="Login" />
          </Link>
          <Link to="/register" className="w-full">
            <Button title="Não tenho uma conta" variant="outline" />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;