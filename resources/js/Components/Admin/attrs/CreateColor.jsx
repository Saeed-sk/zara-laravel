import React from 'react';
import TextInput from "@/Components/TextInput.jsx";
import {useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import PrimaryButton from "@/Components/Button/PrimaryButton.jsx";
import InputError from "@/Components/InputError.jsx";

const CreateColor = ({setShow,setChange}) => {
    const {data, setData, post, errors} = useForm({
        name: '',
        color: '',
    })

    function submit(e) {
        e.preventDefault()
        post(route('admin.color.store'), {
            onSuccess: () => {
                setShow(false)
                setChange(prev => !prev)
            }
        })
    }
    return (
        <form className={"w-full h-full p-10 flex flex-col gap-2"} onSubmit={submit}>
            <InputLabel forInput="name" value="نام رنگ"/>
            <TextInput
                className={"w-full"}
                id="name"
                type="text"
                name="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
            />
            {errors.name && <InputError message={errors.name}/>}
            <InputLabel forInput="color" value="انتخاب رنگ بندی"/>
            <input id={"color"} name={"color"} className={"w-full bg-transparent rounded-lg overflow-clip h-10"} type="color"
                   onChange={e => setData('color', e.target.value)}/>
            {errors.color && <InputError message={errors.color}/>}

            <PrimaryButton className={"w-full justify-center mt-5"} type={'submit'}>ثبت</PrimaryButton>
        </form>
    );
};

export default CreateColor;
