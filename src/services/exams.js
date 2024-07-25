import axios from "axios";
import toast from "react-hot-toast";

const endpoint = "/exam";

const examService = {
  async getMyExams() {
    const res = await axios.get(endpoint);
    return res.data;
  },
  async createOne(data) {
    try {
      const res = await axios.post(endpoint, data);
      toast.success(res.data.name + " a sido registrado!");
      return res.data;
    } catch (error) {
      console.log(error.response.data);
    }
  },
  async getOne(examId, properties = []) {
    try {
      const queries = "?" + properties.filter(Boolean).join("&");
      const res = await axios.get(`${endpoint}/${examId}${queries}`);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  },
};

export default examService;
