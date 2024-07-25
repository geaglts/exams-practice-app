import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export function useAuth() {
  const [cookies] = useCookies(["token"]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const verifyToken = () => {
    const token = cookies.token;
    if (token) {
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
      setUser(token);
    }
    setLoading(false);
  };

  useEffect(() => {
    verifyToken();
    return () => {};
  }, []);

  return { loading, user };
}
