import React, {useEffect, useState} from 'react';
import ErrorComp from "@/Components/ErrorComp.jsx";
import Loading from "@/Components/Loading.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import {useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/Button/PrimaryButton.jsx";
import InputError from "@/Components/InputError.jsx";

const LiraPrice = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [price, setPrice] = useState('');
    const [lirPrice, setLirPrice] = useState('');
    const [change, setChange] = useState(false)
    const {data, setData, progress, errors, post} = useForm({
        price: ''
    })

    function fetchLiraPrice() {
        setLoading(true);
        setError('');
        try {
            axios.get(route('admin.get.price')).then(response => {
                setPrice(response?.data?.price);
            })
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchLiraPrice();
    }, [change]);

    function submit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            post(route('admin.price.update'),{
                onSuccess:()=>{
                    setChange(!change)
                }
            });
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={"w-full h-full flex justify-center"}>
            {error && <ErrorComp text={error}/>}
            {loading && <Loading/>}
            {!loading && (
                <div className={"w-full flex items-start gap-5"}>
                    <div className="flex w-full">

                        <div className={"w-full"}>
                            <InputLabel value={"قیمت لیر"}/>
                            <TextInput onChange={e => setData('price', e.target.value)} value={data.price}
                                       className={'w-full'}/>
                            {errors.price && <InputError message={errors.price}/>}
                            <PrimaryButton onClick={submit} className={"w-full justify-center mt-2"}>
                                ثبت
                            </PrimaryButton>
                        </div>

                    </div>
                    <div className={'w-full flex gap-2 items-center mt-7 border border-gray-700 p-2 rounded-md'}>
                        <span className={"text-gray-400"}>قیمت قبلی ثبت شده:</span>
                        <span dir={'ltr'} className={"text-gray-100 font-bold"}>{price}</span>
                        <span className={"text-gray-400"}>تومان</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LiraPrice;
