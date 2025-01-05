function convertToLocalDateString(date:any) {
    const parts = new Date(date).toLocaleDateString().split('/').reverse();
    const newDate = parts[0]+'-'+parts[1]+'-'+parts[2];

    return newDate;
}

export{
    convertToLocalDateString
}