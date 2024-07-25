import { useEffect } from "react";

import { useGlobalContext } from "../hooks/useGlobalContext";

import { NewExamForm } from "../modules/exam.module";
import { ExamItem } from "../components/ExamItem.jsx";
import ModalComponent from "../components/ConfigView.jsx";

import styles from "../styles/dashboard.module.scss";
import { IconSettings } from "@tabler/icons-react";

export function Dashboard() {
  const { exams, modals, loadExams, changeModalStatus } = useGlobalContext();

  useEffect(() => {
    loadExams();
    return () => {};
  }, []);

  return (
    <main className="p-4">
      <ModalComponent
        isOpen={modals.config}
        onClose={changeModalStatus("config", false)}
      />
      <header>
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold">Exámenes</h1>
            <button onClick={changeModalStatus("config", true)}>
              <IconSettings color="#fff" />
            </button>
          </div>
          <p className="text-gray-200">
            Estos son todos los exámenes que tienes registrado hasta el momento
          </p>
        </div>
      </header>
      <section>
        {!modals.newExam && (
          <button
            onClick={changeModalStatus("newExam", true)}
            className="button bg-[#9d9fe6] rounded w-full mb-2"
          >
            Nuevo Examen
          </button>
        )}
        <NewExamForm show={modals.newExam} />
      </section>
      <section className={styles.examsList}>
        {exams.map((e) => {
          return <ExamItem key={e._id} item={e} />;
        })}
      </section>
    </main>
  );
}
