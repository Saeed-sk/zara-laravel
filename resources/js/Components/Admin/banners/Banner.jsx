import React, {useState} from 'react';
import BtnEdit from "@/Components/Button/BtnEdit.jsx";
import BtnDelete from "@/Components/Button/BtnDelete.jsx";
import BtnCancel from "@/Components/Button/BtnCancel.jsx";
import BtnSuccess from "@/Components/Button/BtnSuccess.jsx";
import {router, useForm} from "@inertiajs/react";
import ImageUpload from "@/Components/ImageUpload.jsx";
import Select from "react-select";

const Banner = ({banner, categories, resetData,}) => {
    const [edit, setEdit] = useState(false)
    const {data, setData, post, processing, errors, reset} = useForm({
        id: banner.id,
        category_id: parent,
        src: banner.src,
        slug: banner.slug,
    })

    function submit(e) {
        e.preventDefault();
        post(route('admin.banners.update'), {
            preserveScroll: true,
            onSuccess: () => {
                resetData();
                reset();
                setEdit(false)
            },
        })
    }

    function handleChange(selectedOption) {
        setData("parent_id", selectedOption ? Number(selectedOption.value) : "");
    }

    let options = categories?.map(category => {
        return {
            value: category.id,
            label: category.title + '-' + category.slug
        };
    });
    if (edit) {
        return (
            <form className={'h-24 text-gray-100 flex w-full justify-between border rounded '}>
                <ImageUpload source={banner.src} onImageUpload={(file) => setData("src", file)}/>
                <div className={'h-full w-full mx-5 flex items-center'}>
                    <Select
                        id={"parent_id"}
                        name={"parent_id"}
                        className={"w-full"}
                        classNamePrefix={"selectInputSearch"}
                        options={options}
                        defaultValue={parent}
                        onChange={handleChange}
                        placeholder="دسته بندی را وارد کنید"
                        isClearable={true}
                    />
                </div>
                <div className={'flex flex-col items-center h-full justify-center ml-3 gap-3'}>
                    <BtnCancel onClick={() => setEdit(false)}/>
                    <BtnSuccess onClick={(e) => submit(e)}/>
                </div>
            </form>
        );
    } else {
        return (
            <div className={'h-24 text-gray-100 flex w-full justify-between border rounded overflow-clip '}>
                <img className={'aspect-video h-full'} src={banner.src} alt={banner.slug}/>
                <p>{banner.slug}</p>
                <div className={'flex flex-col items-center h-full justify-center ml-3 gap-3'}>
                    <BtnEdit onClick={() => setEdit(true)}/>
                    <BtnDelete onClick={() => router.post(route('admin.banners.delete'), {id: banner.id}, {
                        onSuccess: () => resetData()
                    })}/>
                </div>
            </div>
        );
    }
};

export default Banner;
