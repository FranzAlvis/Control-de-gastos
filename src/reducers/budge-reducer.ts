export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal" }
  | { type: "hide-modal" };

export type BudgetState = {
  budget: number;
  showModal: boolean;
};

export const initialState = {
  budget: 0,
  showModal: false,
};

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  if (action.type === "add-budget") {
    return {
      ...state,
      budget: action.payload.budget,
    };
  }
  if (action.type === "show-modal") {
    return {
      ...state,
      showModal: true,
    };
  }
  if (action.type === "hide-modal") {
    return {
      ...state,
      showModal: false,
    };
  }
  return state;
};
