import { v4 as uuidv4 } from "uuid";
import { DraftExpense, Expense } from "../types";

export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal" }
  | { type: "hide-modal" }
  | { type: "add-expense"; payload: { expense: DraftExpense } }
  | { type: "delete-expense"; payload: { id: Expense["id"] } }
  | { type: "update-expense"; payload: { id: Expense["id"] } }
  | { type: "update"; payload: { expense: Expense } }
  | { type: "reset" };

export type BudgetState = {
  budget: number;
  showModal: boolean;
  expenses: Expense[];
  editingId: Expense["id"];
};

export const initialState = {
  expenses: [],
  budget: 0,
  showModal: false,
  editingId: "",
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
      editingId: "",
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

  if (action.type === "delete-expense") {
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      ),
    };
  }

  if (action.type === "update-expense") {
    // const expense = state.expenses.find(
    //   (expense) => expense.id === action.payload.id
    // );
    // if (!expense) return state;

    return {
      ...state,
      editingId: action.payload.id,
      showModal: true,
    };
  }

  if (action.type === "update") {
    // const { id, ...rest } = action.payload.expense;
    return {
      ...state,
      expenses: state.expenses.map((expense) =>
        expense.id === action.payload.expense.id
          ? action.payload.expense
          : expense
      ),
      showModal: false,
      editingId: "",
    };
  }

  if (action.type === "reset") {
    return {
      ...state,
      budget: initialState.budget,
      expenses: initialState.expenses,
    };
  }

  return state;
};
