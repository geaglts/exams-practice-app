import { useState } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import questionService from "../services/question";
import { ResultForm } from "../components/QuestionForm.jsx";
import styles from "../styles/question.module.scss";

import { generateQuestions, readTxt, classnames } from "../utils";

export function NewQuestionForm({ examId, show, reload }) {
  const { changeModalStatus } = useGlobalContext();
  const [questionsText, setQuestions] = useState("");

  const closeModal = () => {
    changeModalStatus("newQuestion", false)();
    setQuestions("");
  };

  const submitRequest = async (evt) => {
    evt.preventDefault();
    const questions = generateQuestions(questionsText);
    const res = await questionService.add(examId, questions);
    if (res.wasCreated) {
      closeModal();
      await reload();
    }
  };

  const onLoadFile = async (evt) => {
    const files = evt.target.files;
    if (files && files.length > 0) {
      const textContent = await readTxt(files[0]);
      setQuestions(textContent);
      evt.target.value = "";
    }
  };

  const onChangeQuestions = (evt) => {
    setQuestions(evt.target.value);
  };

  if (!show) return null;

  return (
    <section className="flex items-center flex-col gap-3">
      <h1 className="text-3xl">
        <b>Question Form</b>
      </h1>
      <form className="flex flex-col w-6/12 gap-3" onSubmit={submitRequest}>
        <input type="file" name="fileIn" onChange={onLoadFile} accept=".txt" />
        <textarea
          name="questionsTa"
          placeholder="Ingresa tus preguntas aqui"
          className="p-3 rounded h-96 resize-none text-black"
          value={questionsText}
          onChange={onChangeQuestions}
        ></textarea>
        <div className="flex items-center justify-center gap-2">
          <button className=" button bg-blue-600 rounded w-40">Agregar</button>
          <button
            className=" button bg-blue-600 rounded w-40"
            onClick={closeModal}
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}

export function QuestionCards({ data }) {
  return (
    <section className="flex flex-col gap-3">
      {data.map((q, index) => (
        <QuestionCard question={q} index={index} key={q._id} />
      ))}
    </section>
  );
}

function QuestionCard({ question }) {
  return (
    <section className={classnames(styles.questionContainer, "rounded")}>
      <p className="text-1xl sm:text-2xl">{question.question}</p>
      <ResultForm question={question} />
    </section>
  );
}
