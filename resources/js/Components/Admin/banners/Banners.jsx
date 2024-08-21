import React, {useContext, useEffect, useState} from 'react';
import Loading from "@/Components/Loading.jsx";
import {CategoryContext} from "@/Components/Admin/store/categoryStore.jsx";
import ErrorComp from "@/Components/ErrorComp.jsx";
import Banner from "@/Components/Admin/banners/Banner.jsx";
import {getLastChild} from "@/Components/hooks/getLastChild.js";

const Banners = () => {
    const {categories, categoryError, categoryLoading} = useContext(CategoryContext)
    if (categoryLoading) {
        return <Loading/>
    }
    if (categoryError !== null) {
        return <ErrorComp text={'کتگوری ثبت نشده است'}/>
    }

    const parents = categories.categories
    console.log(categories.allCategories)

    const [error, setError] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [parent, setParent] = useState(parents[0]?.id)
    const [banners, setBanners] = useState([])
    const [change, setChange] = useState(false)

    function getBanners() {
        setLoading(true)
        try {
            axios.get(route('admin.banners', {parent: parent})).then(res => {
                setBanners(res?.data)
            })
        } catch (error) {
            setError(error.message || error)
        } finally {
            setLoading(false)
        }
    }

    function resetData() {
        setChange(prevState => !prevState)
    }

    useEffect(() => {
        getBanners()
    }, [parent, change]);

    if (error) {
        return <ErrorComp text={error}/>
    }
    return (
        <>

        </>
    )
};

export default Banners;
