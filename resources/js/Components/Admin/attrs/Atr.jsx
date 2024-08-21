import React, {useEffect, useState} from 'react';
import axios from "axios";
import PrimaryButton from "@/Components/Button/PrimaryButton.jsx";
import IconSelect from "@/Components/Icons/IconSelect.jsx";
import ErrorComp from "@/Components/ErrorComp.jsx";
import Loading from "@/Components/Loading.jsx";
import CreateAttr from "@/Components/Admin/attrs/CreateAttr.jsx";
import {useForm} from "@inertiajs/react";
import SizeShow from "@/Components/Admin/attrs/SizeShow.jsx";
import ColorShow from "@/Components/Admin/attrs/ColorShow.jsx";
import AttributesShow from "@/Components/Admin/attrs/AttributesShow.jsx";

const Atr = () => {
    const [template, setTemplate] = useState('default');
    const [loading, setLoading] = useState(true);
    const [sizes, setSizes] = useState([])
    const [colors, setColors] = useState([])
    const [attributes, setAttributes] = useState([])
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false)
    const [change, setChange] = useState(false)

    function fetchData() {
        setLoading(true)
        setAttributes([]);
        setSizes([])
        setColors([])
        axios.get(route('admin.attributes')).then(res => res.data).then(data => {
            setAttributes(data?.attributes);
            setSizes(data?.sizes)
            setColors(data?.colors)
            setLoading(false)
            console.log(data)
        }).catch(error => setError(error?.message))
    }

    useEffect(() => {
        fetchData();
    }, [change]);
    return (
        <>
            <PrimaryButton onClick={() => setShow(true)} className={"left-10 bottom-10 fixed"}>
                <IconSelect className={"text-2xl"} name={"add"}/>
            </PrimaryButton>
            {show && <CreateAttr setChange={setChange} setShow={setShow} show={show}/>}
            {loading && <Loading/>}
            {!loading && !error && (
                <div className={"grid grid-cols-3 w-full gap-4"}>
                    {!loading && attributes?.length ? (
                        <div className="relative overflow-x-auto">
                            <table
                                className="w-full text-sm text-left rtl:text-right text-gray-400 rounded-lg overflow-clip">
                                <thead
                                    className="text-xs uppercase bg-gray-700 text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        نام
                                    </th><th scope="col" className="px-6 py-3">
                                        شناسه
                                    </th>
                                    <th scope="col" className="px-6 py-3">

                                    </th>
                                    <th scope="col" className="px-6 py-3">

                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {attributes.map((attribute, index) => {
                                    return (<AttributesShow key={index} attribute={attribute} setChange={setChange}/>)
                                })}
                                </tbody>
                            </table>
                        </div>
                    ) : <ErrorComp text={"هیچ ویژگی ثبت نشده است"}/>}
                    {!loading && colors?.length ? (
                        <div className="relative overflow-x-auto">
                            <table
                                className="w-full text-sm text-left rtl:text-right text-gray-400 rounded-lg overflow-clip">
                                <thead
                                    className="text-xs uppercase bg-gray-700 text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        نام
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        رنگ
                                    </th>
                                    <th scope="col" className="px-6 py-3">

                                    </th>
                                    <th scope="col" className="px-6 py-3">

                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {colors.map((color, index) => {
                                    return (<ColorShow key={index} color={color} setChange={setChange}/>)
                                })}
                                </tbody>
                            </table>
                        </div>
                    ) : <ErrorComp text={"هیچ رنگی ثبت نشده است"}/>}
                    {!loading &&sizes?.length ? (
                        <div className="relative overflow-x-auto">
                            <table
                                className="w-full text-sm text-left rtl:text-right text-gray-400 rounded-lg overflow-clip">
                                <thead
                                    className="text-xs uppercase bg-gray-700 text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        سایز بندی
                                    </th>
                                    <th scope="col" className="px-6 py-3">

                                    </th>
                                    <th scope="col" className="px-6 py-3">

                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {sizes.map((size, index) => {
                                    return (<SizeShow key={index} size={size} setChange={setChange}/>)
                                })}
                                </tbody>
                            </table>
                        </div>
                    ) : <ErrorComp text={"هیچ سایز بندی ثبت نشده است"}/>}
                </div>
            )}
        </>
    );
};

export default Atr;
