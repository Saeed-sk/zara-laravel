import React, {useEffect, useState} from 'react';
import Loading from "@/Components/Loading.jsx";
import PrimaryButton from "@/Components/Button/PrimaryButton.jsx";
import IconSelect from "@/Components/Icons/IconSelect.jsx";
import ErrorComp from "@/Components/ErrorComp.jsx";
import CategoryCreate from "@/Components/Admin/categories/CategoryCreate.jsx";
import axios from "axios";
import DefaultCmp from "@/Components/Admin/categories/DefaultCmp.jsx";


const Categories = () => {
    const [template, setTemplate] = useState('default');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false)
    const [change, setChange] = useState(false)
    const [childrenCount, setChildrenCount] = useState()

    function reloadFetch() {
        setChange(!change)
    }

    function fetchData() {
        setLoading(true)
        setCategories([])
        axios.get(route('admin.category')).then(res => res.data).then(data => {
            if (data?.error) {
                setError(data.error)
                setLoading(false)
            } else {
                setCategories(data?.categories);
                setSubCategories(data?.allCategories)
                setLoading(false)
            }
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
            {show &&
                <CategoryCreate setChange={setChange} setShow={setShow} template={template} show={show}
                                categories={subCategories}/>}

            <div className={"w-full h-full grid grid-cols-2 gap-2"}>
                {error && <div className={"col-span-full h-full"}><ErrorComp text={error}/></div>}
                {loading && <div className={"col-span-full h-full"}><Loading/></div>}
                {!loading && !error && (
                    <>
                        <div className={"grid grid-cols-[25px_1fr] place-content-start gap-4 items-center"}>
                            <h2 className={"text-center col-span-full"}>دسته بندی های دیفالت</h2>
                            {categories?.filter(category => category.template === 'default').map((category, index) => {
                                return (
                                    <DefaultCmp key={index} categories={subCategories} category={category}
                                                reloadFetch={reloadFetch}/>
                                );
                            })}
                        </div>

                        <div className={"grid grid-cols-1 place-content-start gap-4 items-center"}>
                            <h2 className={"text-center col-span-full"}>دسته بندی های کاستوم</h2>
                            {categories?.filter(category => category.template === 'custom').map((category, index) => {
                                return (
                                    <DefaultCmp key={index} categories={subCategories} category={category}
                                                reloadFetch={reloadFetch}/>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Categories;
