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