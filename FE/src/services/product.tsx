import { AxiosResponse } from "axios";
import instacnce from "../configs/axios";

export const getProducts = async (params?: any): Promise<AxiosResponse<any>> => {
    try {
        const response = await instacnce.get(`/products`, { params });

        if (response.statusText !== 'OK') {
            throw new Error('Error fetching products');
        }

        return response;
    } catch (error) {
        console.error('Error:', error);
        return {
            data: null,
            status: 500,
            statusText: 'Internal Server Error',
            headers: {},
            config: {} as any,
        }
    }
}

export const getProductById = async (id: any) => {
    try {

        const response = await instacnce.get(`/products/${id}`);

        if (response.statusText !== 'OK') {
            throw new Error('Error fetching products');
        }

        return response;

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export const createProduct = async (dataForm: any): Promise<AxiosResponse<any>> => {
    try {

        const response = await instacnce.post(`/products`, dataForm);

        if (response.statusText !== 'OK') {
            throw new Error('Error fetching products');
        }

        return response;

    } catch (error) {
        console.error('Error:', error);
        return {
            data: null,
            status: 500,
            statusText: 'Internal Server Error',
            headers: {},
            config: {} as any,
        }
    }
}