import instacnce from "../configs/axios"

export const register = async (dataForm: any) => {
    try {

        const res = await instacnce.post('auth/register', dataForm);

        return res;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const login = async (dataForm: any) => {
    try {

        const res = await instacnce.post('auth/login', dataForm);

        return res;

    } catch (error) {
        console.log(error);
        throw error;
    }
}