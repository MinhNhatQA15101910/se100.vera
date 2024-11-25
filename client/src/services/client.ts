import { toast } from 'react-toastify';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

async function client<T>(
  endpoint: string,
  config: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${baseURL}${endpoint}`, config);

  if (!response.ok) {
    const errorMessage = await response.text();

    if (response.status >= 400 && response.status < 500) {
      toast.error(`${errorMessage || 'An error occurred.'}`);
    } else if (response.status >= 500) {
      toast.error(`${errorMessage || 'Internal server error.'}`);
    }
    
    throw new Error(errorMessage || 'An error occurred');
  }

  try {
    const data = await response.json();
    return data as T;
  } catch (error) {
    toast.error('Invalid response format');
    throw new Error('Invalid response format');
  }
}

export default client;
