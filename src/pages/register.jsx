import { IconArrowBackUp, IconUser, IconMail } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { Input } from "../components/Input";

export function Register() {
  const onSubmit = (evt) => {
    evt.preventDefault();
    const data = Object.fromEntries(new FormData(evt.target));
    console.log(data);
  };

  return (
    <section className="p-2">
      <Link to={"/"}>
        <IconArrowBackUp size={28} className="hover:text-pastel-purple" />
      </Link>
      <form
        onSubmit={onSubmit}
        className="p-4 grid gap-2 lg:w-[90ch] lg:mx-auto lg:my-0"
      >
        <section>
          <h1 className="text-2xl font-bold">Crea tu cuenta</h1>
          <p>Ingresa tus datos para poder crearte tu cuenta.</p>
        </section>
        <Input name="username" placeholder="usuario" Icon={IconUser} />
        <Input
          name="email"
          placeholder="correo electronico"
          type="email"
          Icon={IconMail}
        />
        <Input name="password" placeholder="contraseña" type="password" />
        <button className="button bg-pastel-purple rounded">
          Crear mi cuenta
        </button>
      </form>
    </section>
  );
}
