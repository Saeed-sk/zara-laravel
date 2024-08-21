import React, {useEffect, useState} from 'react';
import {router, useForm} from "@inertiajs/react";
import IconSelect from "@/Components/Icons/IconSelect.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";

const ColorShow = ({color, setChange}) => {
    const [open, setOpen] = useState(false)
    const {data, setData, post, errors} = useForm({
        id: color.id, name: color.name, color: color.color
    })
    return (

        <tr className="border-b bg-gray-800 border-gray-700">
            <th scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-white">
                {!open && color.name}
                {open && (
                    <>
                        <TextInput className={"w-full"} value={data.name} onChange={e => setData('name', e.target.value)}/>
                        {errors.name && <InputError message={errors.name}/>}
                    </>
                )}
            </th>
            <th scope="row"
                className="text-gray-900 whitespace-nowrap text-white">
                {!open && <div className={"w-20 h-9"} style={{backgroundColor: `${color.color}`}}></div>}
                {open && (
                    <>
                        <TextInput className={"w-20 h-9"} type={'color'} value={data.color}
                                   onChange={e => setData('color', e.target.value)}/>
                        {errors.color && <InputError message={errors.color}/>}
                    </>
                )}
            </th>
            <td className="px-6 py-4">
                <button className={"text-green-600 hover:text-gray-300"} onClick={() => {
                    if (!open) {
                        setOpen(true)
                    } else {
                        post(route('admin.color.update'), {
                            onSuccess: () => {
                                setChange(prev => !prev)
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
                        router.post(route('admin.color.delete'), {id: color.id}, {onSuccess: () => setChange(prev => !prev)})
                    }}>
                        <IconSelect className={"text-2xl"} name={"trash"}/>
                    </button>
                </td>
            )}
            {open && (
                <td className="px-6 py-4">
                    <button className={"text-red-600 hover:text-gray-300"} onClick={() => setOpen(false)}>
                        <IconSelect className={"text-3xl"} name={"cancel"}/>
                    </button>
                </td>
            )}
        </tr>

    );
};

export default ColorShow;
