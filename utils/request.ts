// request.ts
const BASE_URL = 'http://118.25.18.149:8080'; // 修改为你的 API 基础地址

interface RequestOptions {
    method: string;
    headers?: HeadersInit;
    body?: any;
    contentType?: 'json' | 'form-data';
}

function request(endpoint: string, { method, body, contentType = 'json' }: RequestOptions) {
    const headers: HeadersInit = {};
    if (contentType === 'json') {
        headers['Content-Type'] = 'application/json';
        body = body ? JSON.stringify(body) : null;
    }

    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
        method,
        headers,
        body,
    };

    return fetch(`${BASE_URL}${endpoint}`, config)
        .then(response => response.json()
            .then(data => {
                if (!response.ok) {
                    throw new Error(data.message || 'Something went wrong');
                }
                return data;
            }))
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

export const get = (endpoint: string) => request(endpoint, { method: 'GET' });
export const post = (endpoint: string, body: any, contentType: 'json' | 'form-data' = 'json') =>
    request(endpoint, { method: 'POST', body, contentType });
export const put = (endpoint: string, body: any, contentType: 'json' | 'form-data' = 'json') =>
    request(endpoint, { method: 'PUT', body, contentType });
export const del = (endpoint: string) => request(endpoint, { method: 'DELETE' });
