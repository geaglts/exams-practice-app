import { useReducer } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import examService from "../services/exams";

export const initialState = {
  exams: [],
  modals: {
    newExam: false,
    newQuestion: false,
    config: false,
  },
  isAuth: false,
};

export const stateReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOAD_NOTES": {
      return { ...state, exams: payload };
    }
    case "TOGGLE_MODAL": {
      const newModalState = { ...state.modals, [payload.name]: payload.value };
      return { ...state, modals: newModalState };
    }
    case "RESET_ALL_MODALS": {
      return { ...state, modals: initialState.modals };
    }
    case "SET_AUTH": {
      return { ...state, isAuth: payload };
    }
    default:
      throw new Error(`No case for type ${type} found in shopReducer.`);
  }
};

export function useInitialState() {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const loadExams = async () => {
    const exams = await examService.getMyExams();
    dispatch({ type: "LOAD_NOTES", payload: exams });
  };

  const changeModalStatus = (modal, status) => () => {
    dispatch({ type: "TOGGLE_MODAL", payload: { name: modal, value: status } });
  };

  const configAuth = (status) => {
    dispatch({ type: "SET_AUTH", payload: status });
  };

  const logout = () => {
    dispatch({ type: "RESET_ALL_MODALS" });
    removeCookie("token");
    navigate("/");
  };

  return { ...state, loadExams, logout, changeModalStatus, configAuth };
}
