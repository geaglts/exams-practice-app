import { object, string, array } from "yup";

export const questionSchemas = {};

questionSchemas.new = object({
  question: string().required("El nombre de la pregunta es importante"),
  answers: array()
    .of(string())
    .min(2, "Por lo menos debe haber una respuesta correcta y una incorrecta"),
  explanations: string().required(
    "Debes ingresar una explicación, aunque sea breve"
  ),
});
