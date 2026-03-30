// доп фунции
 
 export const reindexIds = (notes) => {
    return notes.map((note, index) => ({ ...note, id: index + 1}));
};

export const formatDate = (format_date = new Date) => {
    return format_date.toLocaleString();
};
