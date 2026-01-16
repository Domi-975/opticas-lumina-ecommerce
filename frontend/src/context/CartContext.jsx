import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { cartReducer, loadInitialState, STORAGE_KEY } from "./cartReducer";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo(() => {
    const count = state.items.reduce((acc, it) => acc + it.qty, 0);
    const subtotal = state.items.reduce((acc, it) => acc + it.price * it.qty, 0);

    return {
      items: state.items,
      count,
      subtotal,
      addItem: (p) => dispatch({ type: "ADD_ITEM", payload: p }),
      removeItem: (id) => dispatch({ type: "REMOVE_ITEM", payload: id }),
      increase: (id) => dispatch({ type: "INCREASE", payload: id }),
      decrease: (id) => dispatch({ type: "DECREASE", payload: id }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
