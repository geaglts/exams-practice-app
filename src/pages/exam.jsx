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
    <main className="p-4">
      <div className="flex justify-center">
        <Link className="underline" to={"/dash"}>
          Mis examenes
        </Link>
      </div>
      <section>
        <div className="mb-2">
          <span className="test-sm text-gray-300">Examen</span>
          <h3 className="text-2xl font-semibold">{exam.name}</h3>
          <p className="test-sm text-gray-300">{exam.description}</p>
        </div>
        {!modals.newQuestion && (
          <button
            onClick={changeModalStatus("newQuestion", true)}
            className="button bg-pastel-purple rounded w-full"
          >
            Agregar Preguntas
          </button>
        )}
      </section>
      <NewQuestionForm
        examId={examId}
        show={modals.newQuestion}
        reload={loadExam}
      />
      {/* Questions */}
      {exam.questions.length === 0 && (
        <p className="text-sm text-gray-500 text-center">
          <i>Aun no hay ninguna pregunta</i>
        </p>
      )}
      {exam.questions.length > 0 && (
        <>
          <h3 className="my-2 text-gray-300 text-center font-semibold text-sm">
            <i>Esta son las preguntas de tu examen</i>
          </h3>
          <QuestionCards data={exam.questions} />
        </>
      )}
    </main>
  );
}
