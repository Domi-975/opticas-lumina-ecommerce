export const STORAGE_KEY = "lumina_cart_v1";

export const initialState = { items: [] };

export function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw);
    if (!parsed?.items) return initialState;
    return parsed;
  } catch {
    return initialState;
  }
}

export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const p = action.payload;
      const existing = state.items.find((it) => it.id === p.id);

      if (existing) {
        return {
          ...state,
          items: state.items.map((it) =>
            it.id === p.id ? { ...it, qty: it.qty + 1 } : it
          ),
        };
      }

      return { ...state, items: [...state.items, { ...p, qty: 1 }] };
    }

    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((it) => it.id !== action.payload) };

    case "INCREASE":
      return {
        ...state,
        items: state.items.map((it) =>
          it.id === action.payload ? { ...it, qty: it.qty + 1 } : it
        ),
      };

    case "DECREASE":
      return {
        ...state,
        items: state.items
          .map((it) => (it.id === action.payload ? { ...it, qty: it.qty - 1 } : it))
          .filter((it) => it.qty > 0),
      };

    case "CLEAR":
      return { ...state, items: [] };

    default:
      return state;
  }
}
