
import { Link } from 'react-router'

const Home = () => {
  return (
    <>
    <div className="flex justify-center">
      <Link to="/login" className="text-white mx-[10px]">Login</Link>
      <Link to="/register" className="text-white ">Register</Link>
    </div>
    </>
  )
}

export default Home