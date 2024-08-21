import IconSelect from "@/Components/Icons/IconSelect.jsx";

export default function BtnCancel({  disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={'text-2xl text-red-700 hover:text-red-200 transition-all'}
            disabled={disabled}
        >
            <IconSelect name={'cancel'} />
        </button>
    );
}
