import React, { useRef, useEffect, useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/apiService';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|yahoo)\.com$/;
const REGISTER_URL = '/usuario/registrarse';
const ROL__USUARIO = '/rol/USER';

const Registro: React.FC = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState<string>('');
  const [validName, setValidName] = useState<boolean>(false);


  const [pwd, setPwd] = useState<string>('');
  const [validPwd, setValidPwd] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [validEmail, setValidEmail] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const [idRol, setIdRol] = useState<string>('');

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, email, pwd]);

  useEffect(() => {
    buscarIdRol();
  }, []);


  const buscarIdRol = async () => {
    try {
      const response = await apiClient.get(ROL__USUARIO);
      setIdRol(response.data); 
      console.log(response.data);
              
    } catch (error) {
      console.error("Error al obtener el ID del rol:", error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validName || !validPwd || !validEmail) {
      setErrMsg("Registro Incorrecto");
      return;
    }
    try {

      const response = await apiClient.post(REGISTER_URL, 
        JSON.stringify({ name: user, email, password: pwd, usuarioRoles: [{ rol: { id:  idRol} }],estado: 'PENDIENTE' }),
      );
      console.log("Registro exitoso:", response.data);
      setSuccess(true);
    } catch (err: any) {
      console.error("Error de registro:", err);
      if (!err?.response) {
        setErrMsg('El servicio no responde');
      } else if (err.response?.status === 409) {
        setErrMsg('Usuario ya tomado');
      } else {
        setErrMsg('Registro fallido');
      }
    }
  };

  return (
    <>
      {success ? (
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
              required
            />
            <p id="uinote" className={ user && !validName ? "instructions" : "offscreen"}>
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
              required
            />
            <p id="uinote" className={ email && !validEmail ? "instructions" : "offscreen"}>
              Tiene que ser extensión: <br />
              *  yahoo.com <br />
              *  gmail.com <br />
              *  hotmail.com <br />
            </p>  

            <input 
              type="password" 
              placeholder="Contraseña"
              autoComplete='off'
              onChange={(e) => setPwd(e.target.value)}
              required
            />
            <p id="uinote" className={ pwd && !validPwd ? "instructions" : "offscreen"}>
              De 8 a 24 caracteres.<br />
              Debe tener letras minúsculas y mayúsculas,<br /> 
               y números 
            </p> 
            <button type="submit">Registrarse</button>
          </form>
          <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
        </div>
      )}
    </>
  );
}

export default Registro;