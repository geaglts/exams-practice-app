import { IconMinimize } from "@tabler/icons-react";
import { useGlobalContext } from "../hooks/useGlobalContext";

const ModalComponent = ({ isOpen, onClose }) => {
  const { logout } = useGlobalContext();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="relative w-full h-full p-6 bg-gray-950 text-white flex items-center justify-center">
        <button
          className="absolute top-5 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center hover:bg-red-600"
          onClick={onClose}
        >
          <IconMinimize color="#fff" />
        </button>

        {/* Blurred circles */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-purple-400 opacity-50 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-400 opacity-50 rounded-full filter blur-3xl"></div>

        {/* Modal content */}
        <ul>
          <li
            className="p-4 underline text-white font-semibold"
            onClick={logout}
          >
            Cerrer sesión
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ModalComponent;
