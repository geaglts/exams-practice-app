import { useEffect, useState } from "react";
import axios from "axios";
import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useCookies } from "react-cookie";
import { NewQuestionForm, QuestionCards } from "../modules/question.module.jsx";
import examService from "../services/exams";
import { useGlobalContext } from "../hooks/useGlobalContext";

export function Exam() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const [cookies] = useCookies(["token"]);
  const [exam, setExam] = useState(null);
  const { changeModalStatus, modals } = useGlobalContext();

  const loadExam = async () => {
    const key = `key=${searchParam.get("key")?.replaceAll(" ", "%20")}`;
    if (cookies.token) {
      axios.defaults.headers["authorization"] = "Bearer " + cookies.token;
    }
    const examData = await examService.getOne(examId, [key]);
    if (examData.statusCode === 403) {
      return navigate("/");
    }
    setExam(examData);
  };

  useEffect(() => {
    loadExam();
    return () => {};
  }, []);

  if (!exam) return null;

  return (
    <main>
      <section>
        <h3>{exam.name}</h3>
        <p>{exam.description}</p>
        <button
          onClick={changeModalStatus("newQuestion", true)}
          className="button bg-slate-500 rounded"
        >
          Agregar Preguntas
        </button>
        <div className="flex justify-center">
          <Link className="underline" to={"/dash"}>
            Mis examenes
          </Link>
        </div>
      </section>
      <NewQuestionForm
        examId={examId}
        show={modals.newQuestion}
        reload={loadExam}
      />
      {/* Questions */}
      <h3>Preguntas</h3>
      {exam.questions.length === 0 && <p>Aun no hay ninguna pregunta</p>}
      {exam.questions.length > 0 && <QuestionCards data={exam.questions} />}
    </main>
  );
}
