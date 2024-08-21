import React, {useEffect, useState} from 'react';
import IconSelect from "@/Components/Icons/IconSelect.jsx";
import Modal from "@/Components/Modal.jsx";
import {router} from "@inertiajs/react";


export const ShowProduct = ({product}) => {
    return (
        <div className={"text-white"}>
            <div className={'flex flex-wrap gap-2 w-full justify-around border-b border-gray-500 p-2'}>
                <div>
                    <span className={'text-gray-500 text-sm'}> اسم محصول:</span>
                    <span className={'pr-1'}>{product.title}</span>
                </div>
                <div>
                    <span className={'text-gray-500 text-sm'}> شناسه:</span>
                    <span className={'pr-1'}>{product.slug}</span>
                </div>
                <div>
                    <span className={'text-gray-500 text-sm'}> دسته بندی:</span>
                    <span className={'pr-1'}>{product.categories[0]?.title}</span>

                </div>
                <div>
                    <span className={'text-gray-500 text-sm'}> قیمت:</span>
                    <span className={'pr-1 text-green-600'}>{product.price}</span>
                    <span className={'text-gray-300 text-sm pr-1'}>تومان</span>
                </div>
                <div>
                    <span className={'text-gray-500 text-sm'}> تخفیف:</span>
                    <span className={'pr-1'}>{product.discount} %</span>
                </div>
            </div>
            <div className={"flex w-full gap-3 p-2 flex-wrap"}>{product.images?.map(image => {
                return <img className={"h-24 aspect-video rounded-lg"} key={image.id} src={`/storage/${image?.src}`}
                            alt={image.src}/>
            })}
            </div>
            <div className={"p-5 flex flex-col gap-4"}>
                <div>
                    <span className={'text-gray-500 text-sm'}> سایز بندی</span>
                    <div className={"flex flex-wrap"}>
                        {product.sizes.length < 1 && <span className={'text-gray-500'}>هیچ کدام</span>}
                        {product.sizes.length > 0 && product.sizes.map(size => {

                            return <div key={size.id} className={'border border-gray-500 rounded-lg p-2 px-4 mt-1'}>
                                <span>{size.size}</span>
                            </div>
                        })}
                    </div>
                    <span className={'text-gray-500 text-sm'}> ویژگی ها</span>
                    <div className={"flex flex-wrap"}>
                        {product.attributes?.length < 1 && <span className={'text-gray-500'}>هیچ کدام</span>}
                        {product.attributes?.length > 0 && product.attributes.map(attribute => {
                            return <div key={attribute.id}
                                        className={'border border-gray-500 rounded-lg p-2 px-4 mt-1 flex gap-2'}>

                                <span><span className={"text-gray-300 text-sm"}>نام:</span>{attribute.name}</span>
                                <span>-</span>
                                <span><span className={"text-gray-300 text-sm"}>شناسه:</span>{attribute.slug}</span>
                            </div>
                        })}
                    </div>
                </div>
                <div>
                    <span className={'text-gray-500 text-sm'}> توضیحات:</span>
                    <div className={'border border-gray-500 rounded-lg p-2 mt-1'}
                         dangerouslySetInnerHTML={{__html: product.description}}></div>
                </div>
                <div>
                    <span className={'text-gray-500 text-sm'}>کاتالوگ:</span>
                    <div className={'border border-gray-500 rounded-lg p-2 mt-1'}
                         dangerouslySetInnerHTML={{__html: product.maintenance}}></div>
                </div>
            </div>
        </div>
    )
}
const SingleProduct = ({setChange, product, setShow, setEditData, childs}) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <div className={"flex flex-col border border-gray-500 rounded-lg w-full"}>
                <Modal show={open} onClose={() => setOpen(false)}>
                    <ShowProduct product={product}/>
                </Modal>
                <div className={'flex flex-wrap gap-2 w-full justify-around border-b border-gray-500 p-2'}>
                    <div>
                        <span className={'text-gray-500 text-sm'}> اسم محصول:</span>
                        <span className={'pr-1'}>{product.title}</span>
                    </div>
                    <div>
                        <span className={'text-gray-500 text-sm'}> شناسه:</span>
                        <span className={'pr-1'}>{product.slug}</span>
                    </div>
                    <div>
                        <span className={'text-gray-500 text-sm'}> دسته بندی:</span>
                        <span className={'pr-1'}>{product?.categories[0]?.title}</span>
                    </div>
                    <div>
                        <span className={'text-gray-500 text-sm'}> قیمت:</span>
                        <span className={'pr-1 text-green-600'}>{product.price}</span>

                    </div>
                    <div>
                        <span className={'text-gray-500 text-sm'}> تخفیف:</span>
                        <span className={'pr-1'}>{product.discount} %</span>
                    </div>
                </div>
                <div className={"w-full flex items-end justify-around gap-3 p-3 text-2xl"}>
                    <button className={'text-blue-500 hover:text-gray-300'} onClick={() => setOpen(true)}>
                        <IconSelect name={'show'} className={""}/>
                    </button>
                    <button className={'text-green-500 hover:text-gray-300'} onClick={() => {
                        setEditData({
                            id: product.id,
                            template: product.template,
                            slug: product.slug,
                            title: product.title,
                            price: product.price,
                            discount: product.discount,
                            images: product.images,
                            description: product.description,
                            maintenance: product.maintenance,
                            sizes: product.sizes.map(size => size.id),
                            categories: product.categories.map(category => category.id)[0],
                            colors: product.colors.map(color => color.id),
                            attributes: product.attributes.map(attribute => attribute.id),
                            update: true
                        });
                        setShow(true)
                    }}>
                        <IconSelect name={'edit'} className={""}/>
                    </button>
                    <button className={'text-red-500 hover:text-gray-300'} onClick={() => {
                        router.post(route('admin.products.delete'), {
                            id: product.id
                        }, {
                            onSuccess: () => {
                                setChange(prev => !prev)
                            }
                        })
                    }}>
                        <IconSelect name={'trash'} className={""}/>
                    </button>
                </div>
            </div>
            {childs?.length > 0 && childs?.map((child, index) => {
                return (
                    <div key={child.id} className={"flex w-full items-center"}>
                        <div className={" rounded-full bg-white m-5 px-2 text-black"}>{index + 1}</div>
                        <SingleProduct product={child} setChange={setChange} setShow={setShow} setEditData={setEditData}
                                       childs={[]}/>
                    </div>
                );
            })}
        </>
    );
};

export default SingleProduct;
