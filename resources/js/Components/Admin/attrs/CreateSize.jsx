import React from 'react';
import TextInput from "@/Components/TextInput.jsx";
import {useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import PrimaryButton from "@/Components/Button/PrimaryButton.jsx";
import InputError from "@/Components/InputError.jsx";

const CreateSize = ({setShow,setChange}) => {
    const {data, setData, post,errors} = useForm({
        size: '',
    })

    function submit(e) {
        e.preventDefault()
        post(route('admin.size.store'),{
            onSuccess:()=>{
                setShow(false)
                setChange(prev=>!prev)
            }
        })
    }
    return (
        <form className={"w-full h-full p-10 flex flex-col gap-2"} onSubmit={submit}>
            <InputLabel forInput="size" value="سایز"/>
            <TextInput
                className={"w-full"}
                id="size"
                type="text"
                name="size"
                value={data.size}
                onChange={(e) => setData('size', e.target.value)}
            />
            {errors.size&& <InputError message={errors.size}/>}

            <PrimaryButton className={"w-full justify-center mt-5"} type={'submit'}>ثبت</PrimaryButton>
        </form>
    );
};

export default CreateSize;
