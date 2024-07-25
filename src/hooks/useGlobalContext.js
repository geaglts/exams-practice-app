import { useContext } from "react";
import { GlobalContext } from "../contexts/globalContext";

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useShop must be used within ShopContext");
  return context;
}
