import examService from "../services/exams";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { IconSquareRoundedMinus } from "@tabler/icons-react";

import { classnames } from "../utils";

import styles from "../styles/examModule.module.scss";
import { Toggle } from "../components/Toggle";
import { Input } from "../components/Input";

export function NewExamForm({ show }) {
  const { changeModalStatus, loadExams } = useGlobalContext();

  const onSubmit = async (evt) => {
    evt.preventDefault();
    const data = Object.fromEntries(new FormData(evt.target));
    data.isPublic = data.isPublic === "on" ? true : false;
    await examService.createOne(data);
    await loadExams();
    changeModalStatus("newExam", false)();
  };

  if (!show) return null;

  return (
    <section
      className={classnames(
        "mb-2 bg-slate-100 p-3 text-[#1a1a1a] rounded",
        styles.newExamForm
      )}
    >
      <div className="mb-2">
        <h2 className="text-xl font-semibold">Nuevo examen</h2>
        <p className="text-gray-500 text-sm">Sobre que tema tendras examen?</p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          name="name"
          placeholder="Cuál sería el tema?..."
          className="custom-input"
        />
        <input
          type="text"
          name="description"
          placeholder="Quieres ponerle alguna descripción? (Unidad 1, etc)..."
          className="custom-input"
        />
        <Toggle label="Quieres que tu examen sea publico?">
          <Input type="text" name="key" placeholder="Tu clave sera?..." />
        </Toggle>
        <div
          className={classnames(
            "flex flex-col text-[#1a1a1a] gap-2",
            styles.buttonsContainer
          )}
        >
          <button className="button bg-[#9d9fe6] rounded w-full">
            Agregar
          </button>
          <button onClick={changeModalStatus("newExam", false)}>
            <IconSquareRoundedMinus color="#fa5757" />
          </button>
        </div>
      </form>
    </section>
  );
}
