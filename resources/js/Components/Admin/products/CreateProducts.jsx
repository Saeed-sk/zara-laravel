import React, {useEffect, useState} from 'react';
import {router, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import Select from "react-select";
import PrimaryButton from "@/Components/Button/PrimaryButton.jsx";
import axios from "axios";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import IconSelect from "@/Components/Icons/IconSelect.jsx";

const CreateProducts = ({colors, categories, sizes, attributes, setShow, setChange, editData}) => {
        const [productsOption, setProductsOption] = useState([])
        const {data, setData, post, processing, errors, reset} = useForm({
            id: editData.id,
            template: editData.template,
            title: editData.title,
            parent_id: editData.parent_id,
            category_id: editData.categories,
            color_id: editData.colors,
            sizes: editData.sizes,
            attributes: editData.attributes,
            maintenance: editData.maintenance,
            slug: editData.slug,
            discount: editData.discount,
            images: editData.images,
            price: editData.price,
            description: editData.description,
            update: editData.update
        });
        const [query, setQuery] = useState(editData.parent_id);
    console.log(data.category_id)
        function fetchQuery() {
            try {
                axios.get(route('admin.collection.Search'), {
                    params: {
                        query: query
                    }
                }).then((res) => res.data).then(data => {
                    setProductsOption(data?.products?.filter(product => product.template === 'collection' && product.parent_id === null && product.id !== editData.id).map(product => {
                        return {
                            value: product.id,
                            label: product.title + '-' + product.slug
                        };
                    }))
                })
            } catch (e) {
                console.log(e)
            }
        }

        useEffect(() => {
            if (query) {
                fetchQuery();
            }
        }, [query]);
        let categoriesOption = categories?.map(category => {
            return {
                value: category.id,
                label: category.title + '-' + category.slug
            };
        });
        let sizesOption = sizes?.map(size => {
            return {
                value: size.id,
                label: size.size
            };
        });
        let colorsOption = colors?.map(color => {
            return {
                value: color.id,
                label: color.name + '-' + color.color
            };
        });
        let attributesOption = attributes?.map(attribute => {
            return {
                value: attribute.id,
                label: attribute.name + "-" + attribute.slug
            };
        });

        function handleChange(selectedOption, action) {
            if (action.name === 'category_id') {
                setData("category_id", selectedOption ? Number(selectedOption.value) : "")
            } else if (action.name === 'sizes') {
                setData('sizes', selectedOption?.map(select => select.value))
            } else if (action.name === 'attributes') {
                setData('attributes', selectedOption?.map(select => select.value))
            } else if (action.name === 'color_id') {
                setData('color_id', selectedOption?.map(select => select.value))
            } else if (action.name === 'parent_id') {
                setData('parent_id', selectedOption ? selectedOption.value : null)
            }
        }

        function handleImageChange() {
            const files = Array.from(event.target.files);
            setData('images', files);
        }

        let url = route('admin.products.store');
        if (data.update) {
            url = route('admin.products.update', data.id)
        }

        function handleSubmit(e) {
            e.preventDefault()
            post(url, {
                onSuccess: () => {
                    setChange(prev => !prev)
                    setShow(false)
                }
            })
        }

        return (
            <div className={"bg-gray-800 m-5 rounded-lg"}>
                <div className={"w-full flex justify-around font-semibold text-white p-4 border-b"}>
                    <button onClick={() => setData('template', 'single')}
                            className={`${data.template === 'single' && 'border-b text-blue-500 border-blue-500'}`}>تکی
                    </button>
                    <button onClick={() => setData('template', 'collection')}
                            className={`${data.template === 'collection' && 'border-b text-blue-500 border-blue-500'}`}>کالکشن
                    </button>
                </div>
                <form className={"p-10 flex flex-col"} onSubmit={handleSubmit}>
                    <div className={"flex gap-4"}>
                        <div className={"w-full"}>
                            <InputLabel htmlFor={'title'} value={'اسم'}/>
                            <TextInput
                                value={data.title}
                                id={'title'}
                                className={"w-full"}
                                placeholder={"نام محصول"}
                                name={'title'}
                                onChange={(e) => setData('title', e.target.value)}
                            />
                            {errors?.title && <InputError message={errors.title}/>}
                        </div>
                        <div className={"w-full"}>
                            <InputLabel htmlFor={'slug'} value={'شناسه'}/>
                            <TextInput
                                value={data.slug}
                                id={'slug'}
                                className={"w-full"}
                                placeholder={"شناسه باید یکتا باشد"}
                                name={'slug'}
                                onChange={(e) => setData('slug', e.target.value)}
                            />
                            {errors?.slug && <InputError message={errors.slug}/>}
                        </div>
                    </div>
                    <div className={"flex gap-2 w-full"}>
                        <div className={"w-full"}>
                            <InputLabel htmlFor={'category_id'} value={'دسته بندی'}/>
                            <Select
                                id={"category_id"}
                                name={"category_id"}
                                classNamePrefix={"selectInputSearch"}
                                options={categoriesOption}
                                onChange={handleChange}
                                defaultValue={data.category_id ? categoriesOption.find(category => Number(category.value) === Number(data.category_id)) : null}
                                onInputChange={(e) => setQuery(e)}
                                placeholder="دسته بندی را وارد کنید"
                                isClearable={true}
                            />
                            {errors.category_id && <InputError message={errors.category_id}/>}
                        </div>

                        {data.template === 'collection' && (
                            <div className={"w-full"}>
                                <InputLabel htmlFor={'parent_id'} value={'محصول اولیه'}/>
                                <Select
                                    id={"parent_id"}
                                    name={"parent_id"}
                                    defaultValue={data.parent_id ? productsOption.find(product => product.value === data.parent_id) : null}
                                    classNamePrefix={"selectInputSearch"}
                                    options={productsOption}
                                    onChange={handleChange}
                                    onInputChange={e => setQuery(e)}
                                    placeholder="محصول والد را وارد کیند"
                                    isClearable={true}
                                />
                                {errors.parent_id && <InputError message={errors.parent_id}/>}
                            </div>
                        )}
                    </div>
                    <div className={"flex gap-4"}>
                        <div className={"w-full"}>
                            <InputLabel htmlFor={'sizes'} value={'سایز ها'}/>
                            <Select
                                isMulti
                                id={"sizes"}
                                name={"sizes"}
                                defaultValue={data.sizes ? sizesOption.filter(size => data.sizes.includes(size.value)) : null}
                                classNamePrefix={"selectInputSearch"}
                                options={sizesOption}
                                onChange={handleChange}
                                placeholder="سایز بندی های محصول را وارد کنید"
                                isClearable={true}
                            />
                            {errors.sizes && <InputError message={errors.sizes}/>}
                        </div>
                        <div className={"w-full"}>
                            <InputLabel htmlFor={'color_id'} value={'رنگ بندی'}/>
                            <Select
                                isMulti
                                id={"color_id"}
                                name={"color_id"}
                                defaultValue={data.color_id ? colorsOption.filter(color => data.color_id.includes(color.value)) : null}
                                classNamePrefix={"selectInputSearch"}
                                options={colorsOption}
                                onChange={handleChange}
                                placeholder="سایز بندی های محصول را وارد کنید"
                                isClearable={true}
                            />
                            {errors.color_id && <InputError message={errors.color_id}/>}
                        </div>
                    </div>
                    <div>
                        <InputLabel htmlFor={'attributes'} value={'ویژگی ها'}/>
                        <Select
                            isMulti
                            id={"attributes"}
                            name={"attributes"}
                            value={data.attributes ? attributesOption.filter(attribute => data.attributes.includes(attribute.value)) : null}
                            classNamePrefix={"selectInputSearch"}
                            options={attributesOption}
                            onChange={handleChange}
                            placeholder="ویژگی های محصول را وارد کنید"
                            isClearable={true}
                        />
                        {errors.attributes && <InputError message={errors.attributes}/>}
                    </div>

                    <div>
                        <InputLabel htmlFor={'description'} value={'توضیحات'}/>
                        <ReactQuill
                            onChange={(e) => setData('description', e)}
                            theme={'snow'}
                            id={'description'}
                            value={data.description}
                            modules={{
                                toolbar: [
                                    [{'header': '1'}, {'header': '2'}, {'font': []}],
                                    [{'list': 'ordered'}, {'list': 'bullet'}],
                                    ['bold', 'italic', 'underline'],
                                    [{'align': []}],
                                    [{'color': []}, {'background': []}],
                                ],
                            }}
                            formats={[
                                'header', 'font',
                                'bold', 'italic', 'underline',
                                'list', 'bullet',
                                'align', 'color', 'background',
                            ]}
                        />
                        {errors.description && <InputError message={errors.description}/>}
                    </div>

                    <div>
                        <InputLabel htmlFor={'maintenance'} value={'کاتالوگ'}/>
                        <ReactQuill
                            onChange={(e) => setData('maintenance', e)}
                            theme={'snow'}
                            id={'maintenance'}
                            value={data.maintenance}
                            modules={{
                                toolbar: [
                                    [{'header': '1'}, {'header': '2'}, {'font': []}],
                                    [{'list': 'ordered'}, {'list': 'bullet'}],
                                    ['bold', 'italic', 'underline'],
                                    [{'align': []}],
                                    [{'color': []}, {'background': []}],
                                ],
                            }}
                            formats={[
                                'header', 'font',
                                'bold', 'italic', 'underline',
                                'list', 'bullet',
                                'align', 'color', 'background',
                            ]}
                        />
                        {errors.maintenance && <InputError message={errors.maintenance}/>}
                    </div>
                    <InputLabel htmlFor={'images'} value={'عکس ها'}/>
                    <TextInput
                        type={'file'}
                        id={'images'}
                        className={"w-full"}
                        placeholder={"نام دسته بندی به صورت فارسی"}
                        name={'images'}
                        onChange={handleImageChange}
                        multiple
                    />
                    {errors?.images && <InputError message={errors.images}/>}
                    {data.update && (
                        <div className={"flex flex-wrap gap-4"}>
                            {data.images?.map(image => {
                                return (
                                    <div key={image.id} className={"w-32 aspect-video relative my-4"}>
                                        <button
                                            onClick={() => router.post(route('admin.singleImage.delete'), {
                                                id: image.id
                                            }, {preserveScroll: true, onSuccess: () => setChange(prev => !prev)})}
                                            className={"absolute top-1 right-1 text-red-500 hover:text-red-100 text-xl transition-all"}>
                                            <IconSelect className={''} name={'cancel'}/>
                                        </button>
                                        <img className={"w-32 aspect-video rounded-lg "} src={`/storage/${image.src}`}
                                             alt={`${image.id} عکس با ایدی `}/>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    <div className="w-full flex gap-4">
                        <div className={"w-full"}>
                            <InputLabel htmlFor={'price'} value={'قیمت'}/>
                            <TextInput
                                id={'price'}
                                value={data.price}
                                className={"w-full"}
                                placeholder={"قیمت را وارد کنید"}
                                name={'price'}
                                onChange={(e) => setData('price', e.target.value)}
                            />
                            {errors?.price && <InputError message={errors.price}/>}
                        </div>
                        <div className={"w-full"}>
                            <InputLabel htmlFor={'discount'} value={'تخفیف'}/>
                            <TextInput
                                id={'discount'}
                                className={"w-full"}
                                type={'number'}
                                min={0}
                                placeholder={'تخفیف عدد یک تا صد'}
                                max={100}
                                value={data.discount}
                                name={'discount'}
                                onChange={(e) => setData('discount', e.target.value)}
                            />
                            {errors?.discount && <InputError message={errors.discount}/>}
                        </div>
                    </div>
                    <PrimaryButton disabled={processing} className={"justify-center w-full mt-5"}>
                        ثبت
                    </PrimaryButton>
                </form>
            </div>
        );
    }
;

export default CreateProducts;
