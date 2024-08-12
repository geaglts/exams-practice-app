import { useState } from "react";

export function Toggle({
  label = "Label",
  children,
  defaultValue,
  simple = false,
  callback = () => {},
}) {
  const [showContent, setShowContent] = useState(defaultValue | false);

  const onToggle = () => {
    const newStatus = !showContent;
    setShowContent(newStatus);
    callback(newStatus);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center cursor-pointer">
        <span className="mr-2 text-gray-500">
          <i>{label}</i>
        </span>
        <input
          type="checkbox"
          className="hidden"
          name="isPublic"
          checked={showContent}
          onChange={onToggle}
        />
        <div className="relative">
          <div
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
              showContent ? "bg-pastel-purple" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full shadow-md transform ${
                showContent ? "translate-x-6 bg-white" : "bg-white"
              }`}
            ></div>
          </div>
        </div>
      </label>
      {!simple && showContent && children}
    </div>
  );
}
