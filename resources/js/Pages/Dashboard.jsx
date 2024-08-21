import {useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import IconSelect from "@/Components/Icons/IconSelect.jsx";
import Categories from "@/Components/Admin/categories/Categories.jsx";
import Main from "@/Components/Admin/Main.jsx";
import Atr from "@/Components/Admin/attrs/Atr.jsx";
import Products from "@/Components/Admin/products/Products.jsx";
import LiraPrice from "@/Components/Admin/LiraPrice.jsx";
import Banners from "@/Components/Admin/banners/Banners.jsx";
import CategoryProvider from "@/Components/Admin/store/categoryStore.jsx";

export default function Dashboard({auth}) {

    const [page, setPage] = useState('products');
    const [collapsed, setCollapsed] = useState(true)
    let DynamicComponent;
    switch (page) {
        case 'orders':
            DynamicComponent = Categories;
            break;
        case 'categories':
            DynamicComponent = Categories;
            break;
        case 'atr':
            DynamicComponent = Atr
            break;
        case 'products':
            DynamicComponent = Products
            break;
        case 'lirPrice':
            DynamicComponent = LiraPrice
            break;
        case 'banners':
            DynamicComponent = Banners
            break;
        default:
            DynamicComponent = Main;
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard"/>

            <section className={"w-full bg-gray-900 col-span-full h-full pr-24 flex flex-col gap-4 p-8 text-gray-100"}>
                <CategoryProvider>
                    <DynamicComponent/>
                </CategoryProvider>

            </section>
            <div className={"absolute top-0 right-0 h-full"}>
                <Sidebar onMouseEnter={() => setCollapsed(false)} onMouseLeave={() => setCollapsed(true)} rtl={true}
                         collapsed={collapsed} backgroundColor={"transparent"}
                         className={"h-full bg-gray-800 text-white"}
                >
                    <Menu>

                        <MenuItem onClick={() => setPage('orders')}
                                  icon={<IconSelect className={"text-2xl"} name={'users'}/>}
                                  className={`cursor-pointer font-semibold ${page === 'orders' && 'text-blue-500'}`}>
                            کاربران
                        </MenuItem>

                        <MenuItem onClick={() => setPage('categories')}
                                  icon={<IconSelect className={"text-2xl"} name={'categories'}/>}
                                  className={`cursor-pointer font-semibold ${page === 'categories' && 'text-blue-500'}`}>
                            دسته بندی ها
                        </MenuItem>

                        <MenuItem onClick={() => setPage('banners')}
                                  icon={<IconSelect className={"text-2xl"} name={'banners'}/>}
                                  className={`cursor-pointer font-semibold ${page === 'banners' && 'text-blue-500'}`}>
                            بنر ها
                        </MenuItem>

                        <MenuItem onClick={() => setPage('atr')}
                                  icon={<IconSelect className={"text-2xl"} name={'attr'}/>}
                                  className={`cursor-pointer font-semibold ${page === 'atr' && 'text-blue-500'}`}>
                            ویژگی ها
                        </MenuItem>
                        <MenuItem onClick={() => setPage('products')}
                                  icon={<IconSelect className={"text-2xl"} name={'products'}/>}
                                  className={`cursor-pointer font-semibold ${page === 'products' && 'text-blue-500'}`}>
                            محصولات
                        </MenuItem>

                        <MenuItem onClick={() => setPage('lirPrice')}
                                  icon={<IconSelect className={"text-2xl"} name={'setting'}/>}
                                  className={`cursor-pointer font-semibold ${page === 'lirPrice' && 'text-blue-500'}`}>
                            تنظیمات
                        </MenuItem>
                    </Menu>

                </Sidebar>
            </div>
        </AuthenticatedLayout>
    );
}
