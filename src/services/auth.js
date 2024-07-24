import axios from "./axios";
import toast from "react-hot-toast";

const AuthService = {
  async login(data) {
    try {
      const response = await axios.post("/auth/login", data);
      return response.data.token;
    } catch (error) {
      toast.error(error.response.data.message);
      return false;
    }
  },
};

export default AuthService;
