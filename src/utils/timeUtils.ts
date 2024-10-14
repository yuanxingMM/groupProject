export const getTimeStr = (time: string, showHours: boolean = false, showMinutes: boolean = false, showSeconds: boolean = false) => {
    const date = new Date(time);

    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    let str = `${year}-${month}-${day}`;
    if (showHours) {
        str += ` | ${hours}`;
    }
    if (showMinutes) {
        str += `:${minutes}`;
    }
    if (showSeconds) {
        str += `:${seconds}`;
    }
    return str;
}