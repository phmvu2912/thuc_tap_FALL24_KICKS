import instacnce from "../configs/axios";

export const getCartById = async (id: string) => {
    try {
        
        const data = await instacnce.get(`/carts/${id}`);

        return data;

    } catch (error) {
        console.log(error);
    }
}

export const addItemToCart = async (dataForm: any) => {
    try {
        
        const data = await instacnce.post(`/carts/add-to-cart`, dataForm);

        return data;

    } catch (error) {
        console.log(error)
    }
}

export const removeItemFromCart = async (dataForm: any) => {
    try {
        
        const data = await instacnce.post(`/carts/remove-item`, dataForm);

        return data;

    } catch (error) {
        console.log(error)
    }
}