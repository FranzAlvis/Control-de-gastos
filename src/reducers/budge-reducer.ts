import { v4 as uuidv4 } from "uuid";
import { DraftExpense, Expense } from "../types";

export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal" }
  | { type: "hide-modal" }
  | { type: "add-expense"; payload: { expense: DraftExpense } };

export type BudgetState = {
  budget: number;
  showModal: boolean;
  expenses: Expense[];
};

export const initialState = {
  expenses: [],
  budget: 0,
  showModal: false,
};

const createExpense = (drafExpense: DraftExpense): Expense => {
  return {
    ...drafExpense,
    id: uuidv4(),
  };
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

  if (action.type === "add-expense") {
    const expense = createExpense(action.payload.expense);
    return {
      ...state,
      expenses: [...state.expenses, expense],
      showModal: false,
    };
  }

  return state;
};
