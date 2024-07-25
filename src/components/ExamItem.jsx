import {
  IconTextCaption,
  IconLock,
  IconLockOpen,
  IconLink,
} from "@tabler/icons-react";
import toast from "react-hot-toast";

const isPublic = {
  true: { name: "Publico", icon: <IconLockOpen /> },
  false: { name: "Privado", icon: <IconLock /> },
};

import { getQueryParams } from "../utils";

export function ExamItem({ item }) {
  const copyExamLink = () => {
    const params = getQueryParams(["key"], item);
    navigator.clipboard.writeText(
      `${window.location.origin}/exam/${item._id}${params}`
    );
    toast.success("El enlace se ha copiado");
  };

  return (
    <section className="bg-slate-100 rounded p-3 text-neutral-950 flex flex-col gap-1">
      <div className="flex justify-between ">
        <p>
          <b>{item.name}</b>
        </p>
        <div className="flex gap-2">
          <button className="hover:text-pastel-purple" onClick={copyExamLink}>
            <IconLink />
          </button>
          <a target="_blank" href={`/exam/${item._id}`}>
            <IconTextCaption className="hover:text-pastel-purple" />
          </a>
        </div>
      </div>
      <p>{item.description}</p>
      <div className="flex gap-1">
        {isPublic[item.isPublic].icon}
        <p>{isPublic[item.isPublic].name}</p>
      </div>
    </section>
  );
}
