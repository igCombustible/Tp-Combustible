import React, {useRef, useEffect, useState, useContext} from 'react';
import AuthContext from '../context/AuthProvider.tsx';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';


const LOGIN_URL = '/auth/generateToken';

const Login = () => {

const authContext = useContext(AuthContext);
const navigate = useNavigate()

if(!authContext){
  throw new Error('AuthContext must be used within an AuthProvider')
}

const {auth,setAuth} = authContext;
const userRef = useRef<HTMLInputElement>(null);
const errRef = useRef<HTMLParagraphElement>(null);

const [user, setUser] = useState('');
const [pwd, setPwd] = useState('');
const [errMsg, setErrMsg] = useState('');
const [sucess, setSuccess] = useState(false);

useEffect(() => {
  userRef.current?.focus();
}, [])

useEffect(() => {
  setErrMsg('');
}, [user,pwd])

useEffect(() => {
  console.log("Auth Context Updated: ", auth);          {/* lo paso fede */}
}, [auth]);
useEffect(() => {
  if (sucess) {
    navigate('/home');
  }
}, [sucess, navigate]);


const handleSubmit = async (e) => {
  e.preventDefault();
  //console.log(user,pwd);
  try{
    const response = await axios.post(LOGIN_URL,
      JSON.stringify({username: user, password: pwd}),
      {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true

      }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({user, pwd, roles, accessToken});
    setUser('');
    setPwd('');
    setSuccess(true);
  } catch (err){
    if(!err?.response){
      setErrMsg('No Server Response');
    } else if(err.response?.status === 400){
        setErrMsg('Missing Username or Password');
    } else if (err.response?.status === 401){
      setErrMsg('Unauthorized');
    } else {
      setErrMsg('Login Failed');
    }
    errRef.current?.focus();
  }
}

  return (
    <> {sucess ? (
      <section>
        <h1>Tu estas loggeado!</h1>
        <br />
        <p> <Link to="/Home">Entrar</Link> </p>
      </section>

    ) : (
      <div className="login-container">
      <form onSubmit={handleSubmit}>
        <p ref={errRef} className={errMsg ? "errmsg" :
        "offscreen"} aria-live='assertive'>{errMsg}</p>
        <h2>Iniciar Sesión</h2>
        <input id="usuario"
               type="email"
              placeholder="Usuario"
              ref={userRef}
              autoComplete='off'
              onChange={(e)=> setUser(e.target.value)}
              value ={user}
              required />
        <input id="contraseña" 
              type="password" 
              placeholder="Contraseña" 
              onChange={(e)=> setPwd(e.target.value)}
              value ={pwd}
              required />
        <button id="botonIngreso"  type="submit">Ingresar</button>
      </form>
      <p>¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link></p>
    </div>

    )
  }
  </>
  )
}


export default Login;