import React, {useState} from 'react';
import {router, useForm} from "@inertiajs/react";
import IconSelect from "@/Components/Icons/IconSelect.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";

const SizeShow = ({size, setChange}) => {
    const [open, setOpen] = useState(false)
    const {data, setData, post, errors} = useForm({
        id: size.id,
        size: size.size,
    })
    return (

        <tr className="border-b bg-gray-800 border-gray-700">
            <th scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-white">
                {!open && size.size}
                {open && (
                    <form className={"w-full h-full"}>
                        <TextInput value={data.size} onChange={e=>setData('size',e.target.value)}/>
                        {errors.size &&  <InputError message={errors.size} />}
                    </form>
                )}
            </th>
            <td className="px-6 py-4">
                <button className={"text-green-600 hover:text-gray-300"} onClick={() => {
                    if (!open) {
                        setOpen(true)
                    }else {
                        post(route('admin.size.update'),{
                            onSuccess:()=>{
                                setChange(prev=>!prev)
                                setOpen(false)
                            }
                        })
                    }
                }}>
                    {!open && <IconSelect className={"text-3xl"} name={"edit"}/>}
                    {open && <IconSelect className={"text-3xl"} name={"mark"}/>}
                </button>
            </td>

            {!open && (
                <td className="px-6 py-4">
                    <button className={"text-red-600 hover:text-gray-300"} onClick={() => {
                        router.post(route('admin.size.delete'),{id:size.id} ,{onSuccess:()=>setChange(prev=>!prev)})
                    }}>
                        <IconSelect className={"text-2xl"} name={"trash"}/>
                    </button>
                </td>
            )}
            {open && (
                <td className="px-6 py-4">
                    <button className={"text-red-600 hover:text-gray-300"} onClick={() => setOpen(false)}>
                        <IconSelect className={"text-2xl"} name={"cancel"}/>
                    </button>
                </td>
            )}
        </tr>

    );
};

export default SizeShow;
