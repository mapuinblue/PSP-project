import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { useAuth } from "../context/datecontext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login, users } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      login(email, password)
        .then(() => {
          navigate("/home");
        })
        .catch((error) => {
          if (error.code == "auth/invalid-email") {
            setError("El correo es invalido.");
          }
          if (error.code == "auth/user-disabled") {
            setError("El usuario esta desactivado.");
          }
          if (error.code == "auth/user-not-found") {
            setError("No se encuentra este usuario.");
          }
          if (error.code == "auth/wrong-password") {
            setError("el correo/password es invalido.");
          }
        });
      // Inicio de sesión exitoso, puedes redirigir al usuario a otra página o mostrar un mensaje
    } catch (error) {
      console.log(error);
      // Manejo de errores, puedes mostrar un mensaje de error al usuario
    }
  };

  useEffect(() => {
    if (users?.email) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [users?.email, navigate]);

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email del usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password-input"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              id="toggle-password-btn"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Entrar</button>
          <button className="btn">
            <Link to="/register">Registrar</Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
