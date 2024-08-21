import React, {createContext, useEffect, useState} from 'react';

export const CategoryContext = createContext([]);
const CategoryProvider = ({children}) => {
    const [categories, setCategories] = useState([]);
    const [categoryError, setCategoryError] = useState(null);
    const [categoryLoading, setCategoryLoading] = useState(false)
    const getCategories = async () => {
        setCategoryError(null)
        setCategoryLoading(true)
        try {
            const response = await axios.get(route('admin.category'));
            setCategories(response.data);
        } catch (error) {
            setCategoryError(error.message || error)
        }finally {
            setCategoryLoading(false)
        }

    }
    useEffect(() => {
        getCategories()
    }, []);
    return (
        <CategoryContext.Provider value={{categories, categoryError, categoryLoading}}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryProvider;
