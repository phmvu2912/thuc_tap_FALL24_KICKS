import { AxiosResponse } from "axios";
import instacnce from "../configs/axios";

// get all
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

// get one
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

// create
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

// create
export const updateProduct = async (dataForm: any): Promise<AxiosResponse<any>> => {
    try {
        
        const response = await instacnce.put(`/products/${dataForm.id}`, dataForm);

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

// remove
export const removeProductById = async (id: any) => {
    try {

        const response = await instacnce.delete(`/products/${id}`);

        // if (response.statusText !== 'OK') {
        //     throw new Error('Error fetching products');
        // }

        return response;

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}