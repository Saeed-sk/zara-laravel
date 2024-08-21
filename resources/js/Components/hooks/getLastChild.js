export function getLastChild({categories}) {
    console.log(categories)
    let childs = [];
    categories.forEach((category) => {
        if (category?.products?.length > 0) {
            childs.push(category)
        }
    })
    return childs;
}
