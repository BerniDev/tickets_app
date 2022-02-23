export const formatCurrency = (price:number):string => {
    return price.toLocaleString('es-ES', {style:'currency',currency:'EUR'})
}

export const formatDate = (date: number):string => {
    return new Date(date).toLocaleDateString('es-ES', {day:'2-digit', month:'2-digit', year:'numeric'});
}