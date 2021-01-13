export function dateISOFormat(val){
    let date = new Date(val)
    return date.getUTCFullYear() + "-" +
    ("0" + (date.getUTCMonth()+1)).slice(-2) + "-" +
    ("0" + date.getUTCDate()).slice(-2) + " " +
    ("0" + date.getUTCHours()).slice(-2) + ":" +
    ("0" + date.getUTCMinutes()).slice(-2) + ":" +
    ("0" + date.getUTCSeconds()).slice(-2)
}
export function dateFormat(val){
    let date = new Date(val)
    return date.getUTCFullYear() + "-" +
    ("0" + (date.getUTCMonth()+1)).slice(-2) + "-" +
    ("0" + date.getUTCDate()).slice(-2)
}