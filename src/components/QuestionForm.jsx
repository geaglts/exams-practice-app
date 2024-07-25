import { useState, useEffect } from "react";
import styles from "../styles/questionForm.module.scss";
import { shuffle, classnames } from "../utils";

export function ResultForm({ question }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [answerCount, setAnswerCount] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [validated, setValidated] = useState(question.isCorrect);
  const [isCorrectAnswers, setIsCorrectAnswers] = useState(question.isCorrect);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const aLength = question.answers.filter((a) => a.includes("__a")).length;
    setAnswerCount(aLength);
    return () => {};
  }, []);

  const onClickOption = (a) => () => {
    const selectedOption = selectedOptions.find((o) => o.value === a);
    if (selectedOption) {
      const updatedList = selectedOptions.filter((o) => o.value !== a);
      setSelectedOptions(updatedList);
    } else {
      if (answerCount > selectedOptions.length) {
        const isCorrect = a.includes("__a");
        if (isCorrect) setCorrectAnswers(correctAnswers + 1);
        const newOption = {
          isSelected: true,
          value: a,
          isCorrect,
        };
        setSelectedOptions([...selectedOptions, newOption]);
      }
    }
  };

  const onClickValidate = async () => {
    setValidated(true);
    const isCorrect = correctAnswers === answerCount;
    try {
      if (isCorrect) {
        setIsCorrectAnswers(correctAnswers === answerCount);
        // await axios.put(`/api/questions/is-correct/${question._id}`);
      } else {
        setTimeout(() => {
          setSelectedOptions([]);
          setCorrectAnswers(0);
          setIsCorrectAnswers(false);
          setValidated(false);
        }, 3000);
      }
    } catch (error) {
      console.log("Error:ResultForm/onClickValidate");
    }
  };

  const onToggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  return (
    <>
      <div className={styles.questions}>
        {shuffle(question.answers).map((a) => {
          const option = selectedOptions.find((o) => o.value === a);
          return (
            <button
              key={`Question_${a}`}
              className={classnames(
                "rounded button",
                option?.isSelected ? styles.active : null
              )}
              onClick={onClickOption(a)}
            >
              {a.replace("__a", "")}
            </button>
          );
        })}
      </div>
      <button
        className={classnames(
          "button text-center bg-indigo-500 text-gray-900 rounded w-full mt-3",
          validated
            ? isCorrectAnswers
              ? styles.correct
              : styles.incorrect
            : null
        )}
        onClick={onClickValidate}
      >
        Comprobar
      </button>
      <button
        className={classnames(
          "button text-center bg-blue-700 text-white rounded w-full mt-3"
        )}
        onClick={onToggleExplanation}
      >
        Explicación ({showExplanation ? "Ocultar" : "Mostrar"})
      </button>
      {showExplanation && (
        <p className="text-center mt-3 text-1xl">{question.explanations}</p>
      )}
    </>
  );
}
