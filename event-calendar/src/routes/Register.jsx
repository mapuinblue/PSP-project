import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.scss"; // Importa el archivo CSS para los estilos personalizados
import { Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/datecontext";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [error, setError] = useState("");

  const { signup } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      signup(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userRef = collection(db, "users");
          addDoc(userRef, {
            email: user.email,
            name: name,
            createdAt: new Date(),
          });
          setModalMessage("Se ha registrado exitosamente..");
          setName("");
          setLastname("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          if (error.code == "auth/email-already-in-use") {
            setError("El correo ya ha sido utilizado");
          } else if (error.code == "auth/invalid-email") {
            setError("El correo es invalido.");
          } else if (error.code == "auth/operation-not-allowed") {
            setError("Operacion no permitida.");
          } else if (error.code == "auth/weak-password") {
            setError("El password es muy debil.");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Crear una cuenta</h2>
        <form onSubmit={handleSignup}>
          <div className="input-container">
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Apellido"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="email"
              placeholder="Correo electrónico"
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
          {modalMessage && (
            <div>
              <p className="success">{modalMessage}</p>
            </div>
          )}
          {error && (
            <div>
              <p className="error">{error}</p>
            </div>
          )}

          <button type="submit">Registrarse</button>
          <button className="btn">
            <Link to="/">Regresar</Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
