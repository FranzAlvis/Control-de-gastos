import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { ChangeEvent, useState } from "react";
import { DraftExpense, Value } from "../types";
import { ErrorMessage } from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export const ExpenseForm = () => {
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: "",
        category: "",
        date: new Date(),
    });

    const [error, setError] = useState<string>("");

    const { dispatch } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isNumber = ["amount"].includes(name);
        if (isNumber) {
            setExpense((prev) => ({
                ...prev,
                [name]: isNumber ? Number(value) : value,
            }));
            return;
        }

        setExpense((prev) => ({

            ...prev,
            [name]: value,
        }));
    }

    const handleDateChange = (value: Value) => {
        setExpense((prev) => ({
            ...prev,
            date: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(expense).includes("")) {
            setError("Por favor, completa todos los campos");
            return;
        }

        dispatch({ type: "add-expense", payload: { expense } })

        setExpense({
            amount: 0,
            expenseName: "",
            category: "",
            date: new Date(),
        });
    }

    return (
        <form className=" space-y-5" onSubmit={(e) => handleSubmit(e)}>
            <legend className=" uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                Nuevo Gasto
            </legend>

            {
                error && <ErrorMessage>
                    {error}
                </ErrorMessage>
            }

            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">
                    Nombre Gasto:
                </label>
                <input type="text" id="expenseName" placeholder="Añade el nombre del gasto" className="bg-slate-100 p-2" name="expenseName" value={expense.expenseName} onChange={handleChange} />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Cantidad:
                </label>
                <input type="number" id="amount" placeholder="Añade la cantidad del gasto" className="bg-slate-100 p-2" name="amount" value={expense.amount} onChange={handleChange} />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">
                    Categoría:
                </label>
                <select id="category" className="bg-slate-100 p-2" name="category" value={expense.category} onChange={e => handleChange(e)}>
                    <option value="" disabled selected className="bg-slate-100 p-2">
                        Selecciona una categoría
                    </option>
                    {
                        categories.map((category) => (
                            <option key={category.id} value={category.id} className="bg-slate-100 p-2">
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Fecha Gasto:
                </label>
                <DatePicker
                    className={"bg-slate-100 p-2 border-0"}
                    value={expense.date}
                    onChange={(e) => handleDateChange(e)}
                />
            </div>

            <input type="submit" className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg" value={"Registrar gasto"} />
        </form >
    );
};