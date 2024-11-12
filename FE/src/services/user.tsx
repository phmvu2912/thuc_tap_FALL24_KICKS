import { AxiosResponse } from "axios";
import instacnce from "../configs/axios"

export const register = async (dataForm: any) => {
    try {

        const res = await instacnce.post('register', dataForm);

        return res;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const login = async (dataForm: any) => {
    try {

        const res = await instacnce.post('login', dataForm);

        return res;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getUsers = async (params?: any): Promise<AxiosResponse<any>> => {
    try {
        const response = await instacnce.get(`/users`, { params });

        if (response.statusText !== 'OK') {
            throw new Error('Error fetching users');
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

export const getUserById = async (id: any): Promise<AxiosResponse<any>> => {
    try {
        const response = await instacnce.get(`/users/${id}`,);

        if (response.statusText !== 'OK') {
            throw new Error('Error fetching user');
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
export const updateUser = async (dataForm: any): Promise<AxiosResponse<any>> => {
    try {
        
        const response = await instacnce.put(`/users/${dataForm.id}`, dataForm);

        if (response.statusText !== 'OK') {
            throw new Error('Có lỗi khi cập nhật thông tin người dùng');
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