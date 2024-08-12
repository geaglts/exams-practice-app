import axios from "axios";
import toast from "react-hot-toast";

const endpoint = "/question";

const questionService = {
  async add(examId, data) {
    try {
      const request = axios.post(`${endpoint}/${examId}`, data);
      await toast.promise(request, {
        loading: "Procesando",
        success: (res) => {
          return res.status === 201
            ? "Preguntas agregadas: " + res.data.length
            : "No se pudieron agregar tus preguntas";
        },
        error: "Ocurrió un error!",
      });
      return { wasCreated: true };
    } catch (error) {
      console.log(error);
    }
  },
  async update(questionId, data) {
    try {
      const request = axios.put(`${endpoint}/${questionId}`, data);
      await toast.promise(request, {
        loading: "Procesando",
        success: () => "Actualizado correctamente",
        error: "Ocurrió un error!",
      });
      return { wasCreated: true };
    } catch (error) {
      console.log(error);
    }
  },
};

export default questionService;
