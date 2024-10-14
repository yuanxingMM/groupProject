import { toast } from "react-toastify";

type FetchOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''; 


const fetchApi = async (endpoint: string, options: FetchOptions = {}) => {
  const { method = 'GET', headers = {}, body = null } = options;

  try {
    const url = `${apiUrl}${endpoint}`;
    const response = await fetch(`${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });

    
    const data = await response.json();

    if (!response.ok) {
      
      const errorMessage = data.message || '请求失败';
      throw new Error(errorMessage); 
    }

    
    return {
      ok: response.ok,
      status: response.status,
      data,
    };

  } catch (error: any) {
    
    const errorMessage = error.message || '请求过程中发生错误';
    console.error('Error fetching API:', errorMessage);
    
    toast.error(errorMessage);  
    throw error;  
  }
};

export default fetchApi;