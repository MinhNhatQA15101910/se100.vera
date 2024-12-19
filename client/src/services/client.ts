import { toast } from 'react-toastify';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

interface IErrorResponse {
  code: string;
  description: string
}

interface ApiResponse {
  data: IErrorResponse;
  status: number;
  ok: boolean;
}

async function client<T>(
  endpoint: string,
  config: RequestInit = {}
): Promise<T> {
  if (!baseURL) {
    throw new Error('API URL is not configured');
  }

  const normalizedEndpoint = endpoint.startsWith('/')
    ? endpoint
    : `/${endpoint}`;

  try {
    const response = await fetch(`${baseURL}${normalizedEndpoint}`, {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json() as IErrorResponse;
      const apiResponse: ApiResponse = {
        data: errorData,
        status: response.status,
        ok: false
      };

      toast.error(errorData.description || 'An error occurred');
      throw apiResponse;
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      const apiResponse: ApiResponse = {
        data: data,
        status: response.status,
        ok: true
      };
      return apiResponse.data as T;
    }

    return null as T;
  } catch (error) {
    if (error instanceof Error) {
      const apiResponse: ApiResponse = {
        data: {
          code: 'UNEXPECTED_ERROR',
          description: error.message || 'An unexpected error occurred'
        },
        status: 500,
        ok: false
      };
      toast.error(apiResponse.data.description);
      throw apiResponse;
    }
    throw error;
  }
}

export default client;
