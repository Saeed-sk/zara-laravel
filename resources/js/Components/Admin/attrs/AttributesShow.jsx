import React, {useEffect, useState} from 'react';
import {router, useForm} from "@inertiajs/react";
import IconSelect from "@/Components/Icons/IconSelect.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";

const AttributesShow = ({attribute, setChange}) => {
    const [open, setOpen] = useState(false)
    const {data, setData, post, errors} = useForm({
        id: attribute.id, name: attribute.name, slug: attribute.slug
    })
    return (

        <tr className="border-b bg-gray-800 border-gray-700">
            <th scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-white">
                {!open && attribute.name}
                {open && (
                    <>
                        <TextInput className={"w-full"} value={data.name}
                                   onChange={e => setData('name', e.target.value)}/>
                        {errors.name && <InputError message={errors.name}/>}
                    </>
                )}
            </th>
            <th scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-white">
                {!open && attribute.slug}
                {open && (
                    <>
                        <TextInput className={"w-full"} value={data.slug}
                                   onChange={e => setData('slug', e.target.value)}/>
                        {errors.slug && <InputError message={errors.slug}/>}
                    </>
                )}
            </th>
            <td className="px-6 py-4">
                <button className={"text-green-600 hover:text-gray-300"} onClick={() => {
                    if (!open) {
                        setOpen(true)
                    } else {
                        post(route('admin.attribute.update'), {
                            onSuccess: () => {
                                setChange(prev => !prev)
                                setOpen(false)
                            }
                        })
                    }
                }}>
                    {open ? (
                        <IconSelect className={"text-3xl"} name={"mark"}/>
                    ) : (
                        <IconSelect className={"text-3xl"} name={"edit"}/>
                    )}
                </button>
            </td>
            {!open && (
                <td className="px-6 py-4">
                    <button className={"text-red-600 hover:text-gray-300"} onClick={() => {
                        router.post(route('admin.attribute.delete'), {id: attribute.id}, {onSuccess: () => setChange(prev => !prev)})
                    }}>
                        <IconSelect className={"text-2xl"} name={"trash"}/>
                    </button>
                </td>
            )}
            {open && (
                <td className="px-6 py-4">
                    <button className={"text-red-600 hover:text-gray-300"} onClick={() => {
                        setOpen(false)
                    }}>
                        <IconSelect className={"text-3xl"} name={"cancel"}/>
                    </button>
                </td>
            )}
        </tr>

    );
};

export default AttributesShow;
