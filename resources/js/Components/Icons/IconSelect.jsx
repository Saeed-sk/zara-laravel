import React from 'react';
import {FaPlus} from "react-icons/fa";
import {FaRegTrashCan} from "react-icons/fa6";
import {FaUsers} from "react-icons/fa";
import {CiSquareMinus} from "react-icons/ci";
import {CiSquarePlus} from "react-icons/ci";
import {FaSearch} from "react-icons/fa";
import {TbCategoryPlus} from "react-icons/tb";
import {SiZara} from "react-icons/si";
import {MdErrorOutline} from "react-icons/md";
import { TbEditCircle } from "react-icons/tb";
import {MdOutlineCancel} from "react-icons/md";
import {SiZedindustries} from "react-icons/si";
import {MdAddShoppingCart} from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoTrashBinOutline } from "react-icons/io5";
import { FaRegImages } from "react-icons/fa6";

const IconSelect = ({className, name}) => {
    let DynamicComponent;
    switch (name) {
        case 'zara':
            DynamicComponent = SiZara;
            break;
        case 'edit':
            DynamicComponent = TbEditCircle;
            break;
        case 'show':
            DynamicComponent = FaRegEye;
            break;
        case 'user':
            DynamicComponent = 'Users';
            break;
        case 'users':
            DynamicComponent = FaUsers;
            break;
        case 'mark':
            DynamicComponent = IoCheckmarkCircleOutline;
            break;
        case 'categories':
            DynamicComponent = TbCategoryPlus;
            break;
        case 'add':
            DynamicComponent = FaPlus;
            break;
        case 'trash':
            DynamicComponent = IoTrashBinOutline;
            break;
        case 'attr':
            DynamicComponent = SiZedindustries;
            break;
        case 'error':
            DynamicComponent = MdErrorOutline;
            break;
        case 'products':
            DynamicComponent = MdAddShoppingCart;
            break;
        case 'setting':
            DynamicComponent = CiSettings;
            break;
        case 'banners':
            DynamicComponent = FaRegImages;
            break;
        case 'minus':
            DynamicComponent = CiSquareMinus;
            break;
        case 'plus':
            DynamicComponent = CiSquarePlus;
            break;
        case 'search':
            DynamicComponent = FaSearch;
            break;
        case 'cancel':
            DynamicComponent = MdOutlineCancel;
            break;
        default:
            DynamicComponent = FaRegTrashCan
    }
    return (
        <DynamicComponent className={`${className} transition-all`}/>
    );
};

export default IconSelect;
