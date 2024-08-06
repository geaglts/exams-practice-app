import { useState, useRef } from "react";
import {
  IconSquareRoundedMinus,
  IconQuestionMark,
  IconMessage2Question,
} from "@tabler/icons-react";
import { toast } from "react-hot-toast";

import { useGlobalContext } from "../hooks/useGlobalContext";
import questionService from "../services/question";

import { ResultForm } from "../components/QuestionForm.jsx";
import { Toggle } from "../components/Toggle.jsx";
import { Input, TextArea } from "../components/Input.jsx";
import { Button } from "../components/Button.jsx";

import { generateQuestions, readTxt, classnames, shuffle } from "../utils";

import styles from "../styles/question.module.scss";

import { questionSchemas } from "../schemas/questions.schemas.js";

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
    try {
      if (!showSingleQuestion) {
        const questions = generateQuestions(questionsText);
        const res = await questionService.add(examId, questions);
        if (res.wasCreated) {
          closeModal();
          await reload();
        }
      } else {
        const newQuestion = Object.fromEntries(new FormData(evt.target));
        const splittedAnswers = newQuestion.answers.split(/\n|\r/gm);
        newQuestion.answers = splittedAnswers.filter(Boolean);
        await questionSchemas.new.validate(newQuestion);
        const res = await questionService.add(examId, [newQuestion]);
        if (res.wasCreated) {
          await reload();
          evt.target.reset();
        }
      }
    } catch (error) {
      toast.error(error.message);
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
      <form className="flex flex-col gap-3" onSubmit={submitRequest}>
        <Toggle label="Quiero agregar varias a la vez" callback={onToggle}>
          <input
            type="file"
            name="fileIn"
            onChange={onLoadFile}
            accept=".txt"
          />
          <TextArea
            name="questionsTa"
            placeholder="Ingresa tus preguntas aqui"
            value={questionsText}
            onChange={onChangeQuestions}
            rows={7}
          />
        </Toggle>
        {showSingleQuestion && (
          <SingleQuestionForm examId={examId} reload={reload} />
        )}
        <div className={"text-white gap-2 grid grid-cols-[1fr_auto]"}>
          <Button>Agregar</Button>
          <button onClick={closeModal}>
            <IconSquareRoundedMinus color="#fa5757" />
          </button>
        </div>
      </form>
    </section>
  );
}

export function QuestionCards({ data }) {
  return (
    <section className="flex flex-col gap-3">
      {shuffle(data).map((q, index) => (
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
      {!question?.isOpenAnswer && <ResultForm question={question} />}
      {question?.isOpenAnswer && <OpenAnswerForm question={question} />}
    </section>
  );
}

function OpenAnswerForm({ question }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const inputRef = useRef(null);

  const onValidateAnswer = () => {
    if (inputRef.current.value.length > 0) {
      setShowAnswer(true);
    } else {
      toast.error("Debes poner una respuesta");
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-3">
      <Input placeholder="Cual es la respuesta?" ref={inputRef} />
      <Button type={"button"} onClick={onValidateAnswer}>
        Comprobar
      </Button>
      {showAnswer && (
        <div>
          <p className="text-center text-gray-500">
            <i>La respuesta correcta es:</i>
          </p>
          <p className="text-sm text-center text-gray-500">
            {question.explanations}
          </p>
        </div>
      )}
    </div>
  );
}

function SingleQuestionForm() {
  return (
    <>
      <Input
        placeholder="Cuál es la pregunta?"
        type="text"
        name="question"
        Icon={IconQuestionMark}
        customStyles={["!bg-[#fafafa]"]}
      />
      <p className="legend">
        Cada respuestas debe estar en una linea, la/s respuesta/s correctas
        deberan terminar con "doble guion bajo y una 'a'" por ejemplo
        respuesa__a
      </p>
      <TextArea
        placeholder="Coloca las respuestas correctas y las incorrectas"
        name="answers"
        rows={7}
        customStyles={["!bg-[#fafafa]"]}
      />
      <Input
        placeholder="Pon una breve explicación de la respuesta"
        type="text"
        name="explanations"
        Icon={IconMessage2Question}
        customStyles={["!bg-[#fafafa]"]}
      />
    </>
  );
}
