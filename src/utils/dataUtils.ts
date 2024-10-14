export const getToken = () => {
    if (typeof window !== 'undefined') {
        
        
        return localStorage.getItem('token');
    }
}

export const getUserId = () => {
    if (typeof window !== 'undefined') {
        
        
        return localStorage.getItem('userId');
    }
}