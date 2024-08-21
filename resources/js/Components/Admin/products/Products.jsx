import React, {useEffect, useState} from 'react';
import Loading from "@/Components/Loading.jsx";
import PrimaryButton from "@/Components/Button/PrimaryButton.jsx";
import IconSelect from "@/Components/Icons/IconSelect.jsx";
import ErrorComp from "@/Components/ErrorComp.jsx";
import axios from "axios";
import CreateProducts from "@/Components/Admin/products/CreateProducts.jsx";
import SingleProduct from "@/Components/Admin/products/SingleProduct.jsx";
import DangerButton from "@/Components/Button/DangerButton.jsx";
import TextInput from "@/Components/TextInput.jsx";
import Paginate from "@/Components/Icons/Paginate.jsx";


const Products = () => {
    const defaultData = {
        id: null,
        template: 'single',
        title: '',
        parent_id: null,
        category_id: [],
        colors: [],
        sizes: [],
        attributes: [],
        maintenance: '',
        slug: '',
        discount: '',
        images: [],
        price: '',
        description: '',
        update: false
    };

    const [query, setQuery] = useState('');
    const [searchProducts, setSearchProducts] = useState([])
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([])
    const [attributes, setAttributes] = useState([])
    const [colors, setColors] = useState([])
    const [sizes, setSizes] = useState([])
    const [products, setProducts] = useState([])
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false)
    const [change, setChange] = useState(false)
    const [selectPage, setSelectPage] = useState('single')
    const [editData, setEditData] = useState(defaultData)
    const [page, setPage] = useState(1)

    function fetchData() {
        axios.get(route('admin.get-all-attribute-with-category')).then(res => res.data).then(data => {
            setAttributes(data?.attributes);
            setColors(data?.colors);
            setSizes(data?.sizes);
            setCategories(data?.categories);
        }).catch(error => setError(error?.message))
    }

    function getProducts() {
        if (selectPage === 'single') {
            setLoading(true)
            axios.get(route('admin.singleProducts', {
                page: page
            })).then(res => res.data).then(data => {
                if (data?.error) {
                    setError(data.error)
                    setLoading(false)
                } else {
                    setProducts(data);
                    setError(undefined)
                    setLoading(false)
                }
            }).catch(error => setError(error?.message))
        } else if (selectPage === 'collection') {
            setLoading(true)
            axios.get(route('admin.collectionProducts', {
                page: page
            })).then(res => res.data).then(data => {
                if (data?.error) {
                    setError(data.error)
                    setLoading(false)
                } else {
                    setProducts(data);
                    setError(undefined)
                    setLoading(false)
                }
            }).catch(error => setError(error?.message))
        }
    }

    useEffect(() => {
        setPage(1)
        getProducts()
    }, [selectPage]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        getProducts()
    }, [change,page]);

    useEffect(() => {
        setLoading(true)
        if (query) {
            axios.get(route('admin.products.search'), {
                params: {
                    query: query
                }
            }).then((res) => res.data).then(data => {
                setSearchProducts(data?.products)
            }).catch(error => console.log(error))
        }
        setLoading(false)
    }, [query]);
    return (
        <>
            <div className={"left-10 bottom-10 fixed z-50"}>
                {!show && (
                    <PrimaryButton onClick={() => setShow(prev => !prev)}>
                        <IconSelect className={"text-2xl"} name={"add"}/>
                    </PrimaryButton>
                )}
                {show && (
                    <DangerButton onClick={() => {
                        setShow(prev => !prev);
                        setEditData(defaultData);
                    }}>
                        <IconSelect className={"text-2xl"} name={"cancel"}/>
                    </DangerButton>
                )}
            </div>
            {show &&
                <CreateProducts editData={editData} change={change} setChange={setChange} setShow={setShow}
                                categories={categories} sizes={sizes}
                                attributes={attributes} colors={colors}/>
            }
            {!show && (
                <div className={"w-full h-full flex flex-col gap-4"}>
                    <div className={"w-full flex justify-around bg-gray-800 rounded-lg h-[60px]"}>
                        <button onClick={() => setSelectPage('single')}
                                className={`${selectPage === 'single' && 'text-blue-400 border-b border-blue-400'}`}>محصولات
                            تکی
                        </button>
                        <button onClick={() => setSelectPage('collection')}
                                className={`${selectPage === 'collection' && 'text-blue-400 border-b border-blue-400'}`}>محصولات
                            سری
                        </button>
                        <button onClick={() => setSelectPage('search')}
                                className={`${selectPage === 'search' && 'text-blue-400 border-b border-blue-400'}`}>جستجو
                        </button>
                    </div>
                    {error && <div className={"h-full w-full"}><ErrorComp text={error}/></div>}
                    {loading && <div className={"h-full w-full"}><Loading/></div>}

                    {error === undefined && !loading && products?.data?.length >= 1 && selectPage === 'single' && (
                        <>
                            {
                                products.data.map(product => {
                                    if (product.template === 'single') {
                                        return (
                                            <SingleProduct key={product.id} setShow={setShow} product={product}
                                                           setEditData={setEditData} setChange={setChange} childs={[]}/>
                                        )
                                    }
                                })
                            }
                            <Paginate page={page} lastPage={products.last_page} setPage={setPage}/>
                        </>
                    )}
                    {error === undefined && !loading && products?.data?.length >= 1 && selectPage === 'collection' && (
                        <>
                            {
                                products.data.map(product => {
                                    if (product.template === 'collection' && product.parent_id === null) {
                                        return (
                                            <SingleProduct key={product.id} setShow={setShow} product={product}
                                                           setEditData={setEditData} setChange={setChange}
                                                           childs={product.children}/>
                                        )
                                    }
                                })
                            } <Paginate page={page} lastPage={products.last_page} setPage={setPage}/>
                        </>
                    )}
                    {error === undefined && !loading && selectPage === 'search' && (
                        <div className={"w-full h-full flex flex-col gap-4"}>
                            <TextInput id={'search'} name={'search'} onChange={e => setQuery(e.target.value)}
                                       placeholder={'جستجو'}/>
                            {searchProducts.length >= 1 && searchProducts.map(product => {
                                return (
                                    <SingleProduct key={product.id} setShow={setShow} product={product}
                                                   setEditData={setEditData} setChange={setChange}
                                                   childs={product.children}/>
                                )
                            })}
                            {
                                !loading && searchProducts.length === 0 && query.length >= 1 && (
                                    <ErrorComp text={"هیچ محصولی با این مشخصات وجود ندارد"}/>
                                )}
                        </div>
                    )}

                </div>
            )}
        </>
    );
};

export default Products;
