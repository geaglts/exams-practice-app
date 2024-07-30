import { useState } from "react";
import {
  IconSquareRoundedMinus,
  IconQuestionMark,
  IconMessage2Question,
} from "@tabler/icons-react";

import { useGlobalContext } from "../hooks/useGlobalContext";
import questionService from "../services/question";

import { ResultForm } from "../components/QuestionForm.jsx";
import { Toggle } from "../components/Toggle.jsx";
import { Input, TextArea } from "../components/Input.jsx";
import { Button } from "../components/Button.jsx";

import { generateQuestions, readTxt, classnames } from "../utils";

import styles from "../styles/question.module.scss";

export function NewQuestionForm({ examId, show, reload }) {
  const { changeModalStatus } = useGlobalContext();
  const [showSingleQuestion, setShowSingleQuestion] = useState(true);
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

  const onToggle = (isActive) => {
    setShowSingleQuestion(!isActive);
  };

  if (!show) return null;

  return (
    <section className="flex flex-col gap-2 bg-slate-100 p-3 rounded text-black mt-2">
      <div>
        <h1 className="text-xl font-semibold">Nuevas Preguntas</h1>
        <p className="text-sm text-gray-400">
          Coloca aqui tus nuevas preguntas, recuerda que cada pregunta debe
          estar separada por <span className="underline">@-@</span>
        </p>
      </div>
      <Toggle label="Quiero agregar varias a la vez" callback={onToggle}>
        <form className="flex flex-col gap-2" onSubmit={submitRequest}>
          <div className={"text-white gap-2 grid grid-cols-[1fr_auto]"}>
            <button className="button bg-pastel-purple rounded w-full">
              Agregar
            </button>
            <button onClick={closeModal}>
              <IconSquareRoundedMinus color="#fa5757" />
            </button>
          </div>
          <input
            type="file"
            name="fileIn"
            onChange={onLoadFile}
            accept=".txt"
          />
          <textarea
            name="questionsTa"
            placeholder="Ingresa tus preguntas aqui"
            className="p-3 rounded h-72 resize-none"
            value={questionsText}
            onChange={onChangeQuestions}
          ></textarea>
        </form>
      </Toggle>
      {showSingleQuestion && <SingleQuestionForm />}
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
    <section
      className={classnames(
        styles.questionContainer,
        "rounded bg-slate-100 text-slate-800 font-semibold"
      )}
    >
      <p className="text-1xl sm:text-2xl">{question.question}</p>
      <ResultForm question={question} />
    </section>
  );
}

function SingleQuestionForm() {
  return (
    <form className="flex flex-col gap-3">
      <Input
        placeholder="Cuál es la pregunta?"
        type="text"
        name="question"
        Icon={IconQuestionMark}
        customStyles={["!bg-[#fafafa]"]}
      />
      <TextArea
        placeholder="Cuáles son las posibles respuestas?"
        name="answers"
        rows={7}
        customStyles={["!bg-[#fafafa]"]}
      />
      <Input
        placeholder="Pon una breve explicación de la respuesta"
        type="text"
        name="explanation"
        Icon={IconMessage2Question}
        customStyles={["!bg-[#fafafa]"]}
      />
      <Button>Agregar</Button>
    </form>
  );
}
