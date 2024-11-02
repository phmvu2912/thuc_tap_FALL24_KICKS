import instacnce from "../configs/axios";

export const getProducts = async () => {
    try {
        const response = await instacnce.get('/products');

        if (response.statusText !== 'OK') {
            throw new Error('Error fetching products');
        }

        return response;
    } catch (error) {
        console.error('Error:', error);
        return null;
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