function convertArrayData(obj) {
    const array = Object.entries(obj)
   const newArray= array.map((item) => ({
            id: item[0],
            ...item[1]
        
    }))
    return newArray
}