import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { IconUserSquareRounded, IconAsterisk } from "@tabler/icons-react";
import { Input } from "../components/Input.jsx";
import authService from "../services/auth";

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
    const token = await authService.login(data);
    if (token) {
      setCookies("token", token);
      navigate("/dash");
    }
  };

  if (cookies.token) return null;

  return (
    <form onSubmit={onSubmit} className="p-4 grid gap-3">
      <div>
        <p className="text-2xl font-semibold">Bienvenido!</p>
        <p className="text-sm text-gray-200">Es un gusto verte de regreso</p>
      </div>
      <Input
        Icon={IconUserSquareRounded}
        type="text"
        name="username"
        placeholder="Cual es tu usuario?"
      />
      <Input
        Icon={IconAsterisk}
        type="password"
        name="password"
        placeholder="Aqui pon tu contraseña"
      />
      <button className="button bg-pastel-purple rounded">
        Iniciar Sesion
      </button>
      {/* <p className="text-center">
        No tienes una cuenta?{" "}
        <a className="underline text-pastel-purple" href="/register">
          Creala Aqui
        </a>
      </p> */}
    </form>
  );
}
