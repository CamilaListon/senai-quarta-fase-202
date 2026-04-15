
const Login = () => {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Enviando:", { email, senha });
      const response = await api.post("/login", { email, senha });

      console.log("Resposta:", response.data);

      localStorage.setItem("token", response.data.token);

      navigate("/produtos");
    } catch (err) {
      console.log("Erro ao logar:", err);
      setError(err.response?.data?.message || "Erro desconhecido");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="lembrar" />
            <label className="form-check-label" htmlFor="lembrar">
              Lembrar-me
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Entrar
          </button>

          <div className="text-center mt-3">
            <small>
              Esqueceu a senha? <a href="#">Recuperar</a>
            </small>
          </div>
          <div className="text-center mt-3">
            <small a href="#">
              Faça seu cadastro
            </small>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;