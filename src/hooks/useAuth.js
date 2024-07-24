import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export function useAuth() {
  const [cookies] = useCookies(["token"]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(cookies.token);
  }, []);

  return { user };
}
