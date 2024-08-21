import IconSelect from "@/Components/Icons/IconSelect.jsx";

export default function BtnSuccess({  disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={'text-2xl text-green-600 hover:text-green-200 transition-all'}
            disabled={disabled}
        >
            <IconSelect name={'mark'} />
        </button>
    );
}
