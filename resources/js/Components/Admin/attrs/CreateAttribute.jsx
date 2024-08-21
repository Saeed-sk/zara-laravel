import React from 'react';
import TextInput from "@/Components/TextInput.jsx";
import {useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import PrimaryButton from "@/Components/Button/PrimaryButton.jsx";
import InputError from "@/Components/InputError.jsx";

const CreateAttribute = ({setShow,setChange}) => {
    const {data, setData, post,errors} = useForm({
        name: '',
        slug: '',
    })

    function submit(e) {
        e.preventDefault()
        post(route('admin.attribute.store'),{
            onSuccess:()=>{
                setShow(false)
                setChange(prev=>!prev)
            }
        })
    }
    return (
        <form className={"w-full h-full p-10 flex flex-col gap-2"} onSubmit={submit}>
            <InputLabel forInput="name" value="نام"/>
            <TextInput
                className={"w-full"}
                id="name"
                type="text"
                name="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
            />
            {errors.name&& <InputError message={errors.name}/>}
            <InputLabel forInput="slug" value="شناسه"/>
            <TextInput
                className={"w-full"}
                id="slug"
                type="text"
                name="slug"
                value={data.slug}
                onChange={(e) => setData('slug', e.target.value)}
            />
            {errors.slug&& <InputError message={errors.slug}/>}

            <PrimaryButton className={"w-full justify-center mt-5"} type={'submit'}>ثبت</PrimaryButton>
        </form>
    );
};

export default CreateAttribute;
