import './Style.css';

const Login = () => {

  //api que chama o login
  return (
    <>
      <h1>Login</h1>
      <form action="" className='formulario-login'>
        <label htmlFor="">E-mail</label>
        <input type="text" id="email" />

        <label htmlFor="">Senha</label>
        <input type="password" name="senha" id="senha" />

        <button>Entrar</button>
      </form>
    </>
  )
}

export default Login

