import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import AuthService from "../services/auth";

export function Login() {
  const [cookies, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.token) {
      navigate("/dash");
    }
  }, []);

  const onSubmit = async (evt) => {
    evt.preventDefault();
    const data = Object.fromEntries(new FormData(evt.target));
    const token = await AuthService.login(data);
    if (token) {
      setCookies("token", token);
      navigate("/dash");
    }
  };

  if (cookies.token) return null;

  return (
    <form onSubmit={onSubmit}>
      <label>
        Usuario <input type="text" name="username" placeholder="usuario..." />
      </label>
      <label>
        Contraseña{" "}
        <input type="password" name="password" placeholder="contraseña..." />
      </label>
      <button>Iniciar Sesion</button>
    </form>
  );
}
