import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';


//Para validar el usuario, acepta numeros letras y debe tener entre 3 y 23 caracteres
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}/;
//Para validar la contraseña, acepta numeros, letras y debe tener entre 8 y 24 caracteres
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
//Para validar el email, permite letra y numeros. Debe tener la extencion yahoo, gmail o hotmail
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|yahoo)\.com$/;
//Direccion con el backend
const REGISTER_URL = '/auth/addNewUser'

const Registro = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser ] = useState('');
  const [validName, setValidName ] = useState(false);
  const [userFocus, setUserFocus ] = useState(false);

  const [pwd, setPwd ] = useState('');
  const [validPwd, setValidPwd ] = useState(false);
  const [pwdFocus, setPwdFocus ] = useState(false);

  const [email, setEmail ] = useState('');
  const [validEmail, setValidEmail ] = useState(false);
  const [emailFocus, setEmailFocus ] = useState(false);

  const [errMsg, setErrMsg ] = useState('');
  const [sucess, setSucess ] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
  }, [pwd])

  useEffect(() => {
    setErrMsg('');
  }, [user,email,pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if(!v1 || !v2 || !v3){
      setErrMsg("Registracion Incorrecta");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({name: user,
                        email: email,
                        password: pwd,
                        roles: ['ROLE_USER']}),
        {
          headers: {'Content-Type':'application/json',
                    withCredential: true
          }
        }
      );
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response))
      setSucess(true);
    } catch (err){
      if(!err?.response){
        setErrMsg('El servicio no responde');
      }else if (err.response?.status == 409){
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registracion fallida');
      }
      errRef.current.focus();
    }
  }

  return (
    <>
    {sucess ? (
      <section>
        <h1>Registrado!</h1>
        <p><Link to="/login">Inicia sesión aquí</Link></p>
      </section>
    ) : (
    <div className="register-container">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Usuario"
            ref={userRef}
            autoComplete='off'
            onChange={(e) => setUser(e.target.value)}
            onFocus={()=> setUserFocus(true)}
            aria-invalid={validName ? "false" : "true"}
            onBlur={() => setUserFocus(false)}
            required />

        <p id="uinote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
            De 4 a 24 caracteres.<br />
            Debe comenzar con una letra <br />
            Se permiten letras, números, guiones <br /> 
            bajos y guiones.
        </p>
        <input 
          type="email" 
          placeholder="Correo Electrónico"
          autoComplete='off'
          onChange={(e) => setEmail(e.target.value)}
          onFocus={()=> setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          aria-invalid={validEmail ? "false" : "true"}
          required />

        <p id="uinote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
            Tiene que ser extension: <br />
              *  yahoo.com <br />
              *  gmail.com <br />
              *  hotmail.com <br />
        </p>  

        <input 
          type="password" 
          placeholder="Contraseña"
          autoComplete='off'
          onChange={(e) => setPwd(e.target.value)}
          onFocus={()=> setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          aria-invalid={validPwd ? "false" : "true"}
          required />

        <p id="uinote" className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}>
            De 8 a 24 caracteres.<br />
            Se permiten  letras minusculas y mayusculas,<br /> 
            numeros y especial caracteres.
        </p> 
        <button type="submit">Registrarse</button>
      </form>
      <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
    </div>
    )
  }
  </>
  )
}



export default Registro;