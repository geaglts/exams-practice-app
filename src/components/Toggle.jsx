import { useState } from "react";
import { Input } from "./Input";

export function Toggle({ label = "Label", children }) {
  const [isPublic, setIsPublic] = useState(false);

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
          checked={isPublic}
          onChange={() => setIsPublic(!isPublic)}
        />
        <div className="relative">
          <div
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
              isPublic ? "bg-pastel-purple" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full shadow-md transform ${
                isPublic ? "translate-x-6 bg-white" : "bg-white"
              }`}
            ></div>
          </div>
        </div>
      </label>
      {isPublic && children}
    </div>
  );
}
