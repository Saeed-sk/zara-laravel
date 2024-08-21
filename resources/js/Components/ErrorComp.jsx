import React from 'react';
import IconSelect from "@/Components/Icons/IconSelect.jsx";

const ErrorComp = ({text}) => {
    return (
        <div className={"w-full h-full flex flex-col items-center justify-center gap-5"}>
            <IconSelect className={"text-center text-7xl animate-pulse text-red-700"} name={'error'} />
            <h2 className={"text-red-500 text-lg"}>{text}</h2>
        </div>
    );
};

export default ErrorComp;
