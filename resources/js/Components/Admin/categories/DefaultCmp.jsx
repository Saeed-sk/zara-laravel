import React, {useState} from "react";
import {router, useForm} from "@inertiajs/react";
import IconSelect from "@/Components/Icons/IconSelect.jsx";
import ImageUpload from "@/Components/ImageUpload.jsx";
import TextInput from "@/Components/TextInput.jsx";
import Select from "react-select";
import InputError from "@/Components/InputError.jsx";

const DefaultCmp = ({category, reloadFetch, categories, index}) => {
    const [edit, setEdit] = useState(false)
    const {data, setData, post, reset, errors} = useForm({
        id: category.id,
        template: category.template,
        title: category.title,
        slug: category.slug,
        parent_id: category.parent_id ? category.parent_id : null,
        image: category.image,
        children: category.children ?? []
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.category.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setEdit(false);
                reloadFetch()
            },
            onError: () => {
                setEdit(true)
            }
        })
    }

    let options = categories?.filter(category =>
        category.template === data.template &&
        Number(category.id) !== Number(data.id)&&
        data.children.every(child=> child.id !== category.id)
    ).map(category => {
        return {
            value: category.id,
            label: category.title + '-' + category.slug
        };
    });

    function handleChange(selectedOption) {
        setData("parent_id", selectedOption ? Number(selectedOption.value) : "");
    }

    return (
        <div className={`col-span-full border border-gray-800 p-5 rounded-lg`}>
            {!edit && (
                <div
                    className={`h-24 col-span-full flex justify-between p-4 rounded-lg`}>
                    {category.image && <img className={"w-24 aspect-video"} src={category.image}
                                            alt="عکس ندارد"/>}
                    {!category.image && <div className={"w-24 aspect-video bg-gray-800 rounded-lg"}/>}
                    <div className={"flex flex-col gap-2 w-full pr-4"}>
                        <div>
                            <span className={"text-gray-400"}> تایتل:</span>
                            <span className={"pr-1"}>{category.title}</span>
                        </div>
                        <div>
                            <span className={"text-gray-400"}> شناسه:</span>
                            <span className={"pr-1"}>{category.slug}</span>
                        </div>
                    </div>
                    <div className={"flex flex-col gap-3 items-center justify-center"}>
                        <div onClick={() => {
                            router.post(route('admin.category.delete'), category, {
                                onFinish: reloadFetch
                            })
                        }} className={'text-red-700 hover:text-red-300 cursor-pointer'}>
                            <span><IconSelect className={"text-2xl"} name={"trash"}/></span>
                        </div>
                        <div onClick={() => {
                            setEdit(true)
                        }} className={'text-green-600 hover:text-green-300 cursor-pointer'}>
                            <span><IconSelect className={"text-2xl"} name={"edit"}/></span>
                        </div>
                    </div>
                </div>
            )}
            {edit && (
                <form onSubmit={submit}
                      className={"flex flex-col col-span-full justify-between border border-gray-800 p-4 rounded-lg gap-4"}>
                    <div className={"w-full flex justify-between rounded-lg gap-3"}>
                        <div className={"w-40"}>
                            <ImageUpload className={"h-full w-full"} source={data.image}
                                         onImageUpload={(file) => setData("image", file)}/>
                        </div>
                        <div className={"flex flex-col gap-2 w-full"}>
                            <div className={"w-full flex flex-col"}>
                                <TextInput
                                    id={'title'}
                                    value={data.title}
                                    className={"w-full"}
                                    placeholder={"نام دسته بندی به صورت فارسی"}
                                    name={'title'}
                                    onChange={(e) => setData('title', e.target.value)}
                                />
                                {errors?.title && <InputError message={errors.title}/>}
                            </div>
                            <div>
                                <TextInput
                                    id={'slug'}
                                    value={data.slug}
                                    className={"w-full"}
                                    placeholder={"نام دسته بندی به صورت فارسی"}
                                    name={'title'}
                                    onChange={(e) => setData('slug', e.target.value)}
                                />
                                {errors?.slug && <InputError message={errors.slug}/>}
                            </div>
                        </div>
                    </div>
                    <div className={"flex w-full"}>
                        <Select
                            id={"parent_id"}
                            name={"parent_id"}
                            className={"w-full"}
                            classNamePrefix={"selectInputSearch"}
                            options={options}
                            defaultValue={data.parent_id ? options.find(option => option.value === data.parent_id) : null}
                            onChange={handleChange}
                            placeholder="دسته بندی را وارد کنید"
                            isClearable={true}
                        />
                        <div className={"flex flex-col pr-2 gap-2"}>
                            <div onClick={() => {
                                setEdit(false)
                            }} className={'text-red-600 hover:text-red-300 cursor-pointer flex items-center'}>
                                <span><IconSelect className={"text-2xl"} name={"cancel"}/></span>
                            </div>
                            <button type={'submit'} className={'text-green-600 hover:text-green-300 cursor-pointer'}>
                                <span><IconSelect className={"text-2xl"} name={"mark"}/></span>
                            </button>
                        </div>
                    </div>
                </form>
            )}
            {category?.children?.length > 0 && category.children.map((child, index) => {

                return (
                    <DefaultCmp key={child.id} reloadFetch={reloadFetch} category={child} categories={categories} index={index + 1}/>
                );
            })}
        </div>
    )
}
export default DefaultCmp;
