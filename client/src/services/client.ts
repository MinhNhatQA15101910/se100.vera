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
      const defaultError = response.status >= 500 
        ? 'Internal server error.'
        : 'An error occurred.';

      // Only show toast error once with appropriate message
      toast.error(errorMessage || defaultError);
      throw new Error(errorMessage || defaultError);
    }

    // Special case for /api/auth/send-email which doesn't return a response
    if (endpoint === '/api/auth/send-email') {
      return {} as T;
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    // Only show toast error if it wasn't already shown from response error
    if (!(error instanceof Error && error.message.includes('error'))) {
      toast.error('An unexpected error occurred');
    }
    throw error;
  }
}

export default client;
