import { IconTextCaption, IconLock, IconLockOpen } from "@tabler/icons-react";

const isPublic = {
  true: { name: "Publico", icon: <IconLockOpen /> },
  false: { name: "Privado", icon: <IconLock /> },
};

export function ExamItem({ item }) {
  return (
    <section className="bg-slate-100 rounded p-3 text-neutral-950 flex flex-col gap-1">
      <div className="flex justify-between ">
        <p>
          <b>{item.name}</b>
        </p>
        <a target="_blank" href={`/exam/${item._id}`}>
          <IconTextCaption color="#000" />
        </a>
      </div>
      <p>{item.description}</p>
      <div className="flex gap-1">
        {isPublic[item.isPublic].icon}
        <p>{isPublic[item.isPublic].name}</p>
      </div>
    </section>
  );
}
