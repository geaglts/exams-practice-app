export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export function generateQuestions(strQuestions) {
  try {
    const rawQuestions = strQuestions.split("@-@");
    const questions = rawQuestions.map((rq) => {
      return generateQuestionObject(rq);
    });
    return questions;
  } catch (error) {
    console.error("Error leyendo el archivo:", error);
  }
}

export function generateQuestionObject(questionString) {
  const [question, answers, explanation] = questionString.split("\n\n");
  const splitAnswers = answers.split("\n").map((i) => i.trim());
  return {
    question: question.trim(),
    answers: splitAnswers,
    explanations: explanation.trim(),
  };
}

export function readTxt(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function classnames(...str) {
  if (str.length > 1) return str.filter(Boolean).join(" ");
  return str.join(" ");
}

export const getQueryParams = (keys, obj) => {
  const queryParams = keys
    .map((key) =>
      obj[key] ? `${key}=${obj[key].replaceAll(" ", "%20")}` : false
    )
    .filter(Boolean)
    .join("&");
  if (queryParams.length > 0) {
    return "?" + queryParams;
  }
  return "";
};
