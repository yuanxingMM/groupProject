export function isPureNonZeroNumber(value: string): boolean {
    const numberRegex = /^[1-9]\d*$/; 
    return numberRegex.test(value);
}

export function isValidPrice(input: string): boolean {
    const priceRegex = /^\d+(\.\d{0,2})?$/;

    
    if (!priceRegex.test(input)) {
        return false;
    }

    
    const price = Number(input);
    return !isNaN(price) && price >= 0;
}