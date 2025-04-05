import { useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";

export const BudgetForm = () => {
    const [budget, setBudget] = useState(0);
    const { dispatch } = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setBudget(e.target.valueAsNumber);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: 'add-budget', payload: { budget } });
    }

    const isValid = useMemo(() => isNaN(budget) || budget <= 0, [budget]);

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className=" flex flex-col space-y-5">
                <label htmlFor="" className="text-4xl text-blue-600 font-bold text-center">
                    Definir Presupuesto
                </label>
                <input id="budget" type="number" className="w-full bg-white border-gray-200 p-2" placeholder="Define tu presupuesto" name="budget" value={budget} onChange={handleChange} />
            </div>
            <input type="submit" className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-10" disabled={isValid} />
        </form>
    );
};