import { ReactNode } from "react";

type ErrorMessageProps = {
    children: ReactNode;
};

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
    return (
        <p className=" bg-red-600 p-2 text-white font-bold text-center text-sm">
            {children}
        </p>
    );
};