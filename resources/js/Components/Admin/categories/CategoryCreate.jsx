import React, {useState} from 'react';
import {useForm} from "@inertiajs/react";
import TextInput from "@/Components/TextInput.jsx";
import Modal from "@/Components/Modal.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import Select from "react-select";
import ImageUpload from "@/Components/ImageUpload.jsx";
import PrimaryButton from "@/Components/Button/PrimaryButton.jsx";
import InputError from "@/Components/InputError.jsx";

const CategoryCreate = ({show, setShow, categories, setChange}) => {
    const [template, setTemplate] = useState('default')
    const {data, setData, post, reset, errors} = useForm({
        template: template,
        title: '',
        slug: '',
        parent_id: '',
        image: null,
    })
    let options = categories?.filter(category => category.template === template).map(category => {
        return {
            value: category.id,
            label: category.title + '-' + category.slug
        };
    });

    function handleChange(selectedOption) {
        setData("parent_id", selectedOption ? Number(selectedOption.value) : "");
    }

    function submit(e) {
        e.preventDefault();
        post(route('admin.category.create'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setShow(false);
                setChange(prevState => !prevState)
            },
            onError: () => {
                setShow(true)
            }
        })
    }

    return (
        <Modal show={show} onClose={() => setShow(false)}>
            <div className={"w-full h-full border rounded-lg"}>
                <div className={"text-gray-300 w-full flex justify-around p-5 border-b"}>
                    <button className={template === 'custom' && 'text-blue-500'}
                            onClick={() => {
                                setTemplate('custom')
                                setData('template','custom')
                            }}>کاستوم
                    </button>
                    <button className={template === 'default' && 'text-blue-500'}
                            onClick={() => {
                                setTemplate('default')
                                setData('template','custom')
                            }}>دیفالت
                    </button>
                </div>
                <form onSubmit={submit} className={"flex flex-col p-10 gap-5"}>
                    <div className={"flex w-full gap-5"}>
                        <div>
                            <InputLabel htmlFor={'image'} value={'عکس اسلایدر'}/>
                            <ImageUpload onImageUpload={(file) => setData("image", file)}/>
                            {errors?.image && <InputError message={errors.image}/>}
                        </div>
                        <div className={"w-full"}>
                            <InputLabel htmlFor={'title'} value={'عنوان'}/>
                            <TextInput
                                id={'title'}
                                className={"w-full"}
                                placeholder={"نام دسته بندی به صورت فارسی"}
                                name={'title'}
                                onChange={(e) => setData('title', e.target.value)}
                            />
                            {errors?.title && <InputError message={errors.title}/>}
                            <InputLabel htmlFor={'title'} value={'شناسه'}/>
                            <TextInput
                                className={"w-full"}
                                id={'slug'}
                                name={'slug'}
                                placeholder={'باید بین کتگوری ها یکتا باشد'}
                                onChange={(e) => setData('slug', e.target.value)}
                            />
                            {errors?.slug && <InputError message={errors.slug}/>}

                        </div>
                    </div>
                    <div>
                        <InputLabel htmlFor={'parent_id'} value={'دسته بندی والد'}/>
                        <Select
                            id={"parent_id"}
                            name={"parent_id"}
                            classNamePrefix={"selectInputSearch"}
                            options={options}
                            defaultValue={data.parent_id ? options.find(option => option.value === data.parent_id) : null}
                            onChange={handleChange}
                            placeholder="دسته بندی را وارد کنید"
                            isClearable={true}
                        />
                        {errors?.parent_id && <InputError message={errors.parent_id}/>}

                    </div>

                    <PrimaryButton type={'submit'} className={'w-full justify-center font-bold'}>
                        ثبت
                    </PrimaryButton>
                </form>
            </div>
        </Modal>
    );
};

export default CategoryCreate;
