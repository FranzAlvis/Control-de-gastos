import { useMemo } from "react";
import { formatDate } from "../helpers";
import { Expense } from "../types";
import { AmountDisplay } from "./AmountDisplay";
import { categories } from "../data/categories";

type ExpenseDetailProps = {
    expense: Expense
};

export const ExpenseDetail = ({ expense }: ExpenseDetailProps) => {

    const categoryInfo = useMemo(() => {
        return categories.filter((category) => category.id === expense.category)[0];
    }, [expense.category]);

    return (
        <div className=" bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
            <div>
                <img src={`/icono_${categoryInfo.icon}.svg`} alt="imagen" className="w-20" />
            </div>
            <div className=" flex-1 space-y-1">
                <p className="text-sm font-bold uppercase text-slate-500 ">{categoryInfo.name}</p>
                <p>{expense.expenseName}</p>
                <p className="text-gray-600 text-sm">{formatDate(expense.date!.toString())}</p>
            </div>

            <AmountDisplay amount={expense.amount} />
        </div>
    );
};