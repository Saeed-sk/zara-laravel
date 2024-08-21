import React from 'react';

const Paginate = ({lastPage, setPage, page}) => {
    let pages = [];
    for (let i = 1; i <= Number(lastPage); i++) {
        pages.push(i);
    }
    return (
        <div className={"flex flex-wrap"}>
            {pages.map((item) => (
                <span
                    className={`cursor-pointer p-1 m-1 rounded border border-gray-500 hover:bg-gray-500 hover:text-white ${item===Number(page) && 'text-white bg-gray-500'}` }
                    key={item}
                    onClick={() => {
                        setPage(item);
                    }}
                >
                        {item}
                    </span>
            ))}
        </div>
    );
};

export default Paginate;
