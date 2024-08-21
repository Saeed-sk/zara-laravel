import React, {useState} from 'react';
import Modal from "@/Components/Modal.jsx";
import CreateSize from "@/Components/Admin/attrs/CreateSize.jsx";
import CreateAttribute from "@/Components/Admin/attrs/CreateAttribute.jsx";
import CreateColor from "@/Components/Admin/attrs/CreateColor.jsx";

const CreateAttr = ({show, setShow,setChange}) => {
    const [page, setPage] = useState('size')
    return (
        <Modal show={show} onClose={() => setShow(false)}>
            <div className={"text-gray-200 w-full flex justify-around p-3 border-b border-gray-700"}>
                <button className={`${page === 'size' && 'text-blue-400 border-b border-blue-400'}`}
                        onClick={() => setPage('size')}>سایز بندی
                </button>
                <button className={`${page === 'attribute' && 'text-blue-400 border-b border-blue-400'}`}
                        onClick={() => setPage('attribute')}>ویژگی
                </button>
                <button className={`${page === 'color' && 'text-blue-400 border-b border-blue-400'}`}
                        onClick={() => setPage('color')}>رنگ
                </button>
            </div>
            {page === 'size' && <CreateSize setChange={setChange} setShow={setShow}/>}
            {page === 'attribute' && <CreateAttribute setChange={setChange} setShow={setShow}/>}
            {page === 'color' && <CreateColor setChange={setChange} setShow={setShow}/>}
        </Modal>
    );
};

export default CreateAttr;
