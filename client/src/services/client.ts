import { toast } from 'react-toastify';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

async function client<T>(
  endpoint: string,
  config: RequestInit = {}
): Promise<T> {
  // Check if baseURL is defined
  if (!baseURL) {
    throw new Error('API URL is not configured');
  }

  // Check if endpoint starts with '/'
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  try {
    const response = await fetch(`${baseURL}${normalizedEndpoint}`, {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();

      if (response.status >= 400 && response.status < 500) {
        toast.error(errorMessage || 'An error occurred.');
      } else if (response.status >= 500) {
        toast.error(errorMessage || 'Internal server error.');
      }
      
      throw new Error(errorMessage || 'An error occurred');
    }

    // Special case for /api/auth/send-email which doesn't return a response
    if (endpoint === '/api/auth/send-email') {
      return {} as T;
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
      throw error;
    }
    toast.error('An unexpected error occurred');
    throw new Error('An unexpected error occurred');
  }
}

export default client;
