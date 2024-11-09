import { AxiosResponse } from "axios";
import instacnce from "../configs/axios";

export const getCategories = async (params?: any): Promise<AxiosResponse<any>> => {
    try {
        const response = await instacnce.get(`/categories`, { params });

        if (response.statusText !== 'OK') {
            throw new Error('Error fetching categories');
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

export const getCategoryById = async (id: any) => {
    try {

        const response = await instacnce.get(`/categories/${id}`);

        if (response.statusText !== 'OK') {
            throw new Error('Error fetching category');
        }

        return response;

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// create
export const createCategory = async (dataForm: any): Promise<AxiosResponse<any>> => {
    try {

        const response = await instacnce.post(`/categories`, dataForm);

        if (response.statusText !== 'OK') {
            throw new Error('Có lỗi khi thêm mới danh mục');
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
export const updateCategory = async (dataForm: any): Promise<AxiosResponse<any>> => {
    try {
        
        const response = await instacnce.put(`/categories/${dataForm.id}`, dataForm);

        if (response.statusText !== 'OK') {
            throw new Error('Có lỗi khi cập nhật danh mục');
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
export const removeCategoryById = async (id: any) => {
    try {

        const response = await instacnce.delete(`/categories/${id}`);

        return response;

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}