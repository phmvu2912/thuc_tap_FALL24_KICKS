import instacnce from "../../configs/axios";

export const getProducts = async () => {
    try {
        const response = await instacnce.get('/products');

        // Kiểm tra nếu status không nằm trong khoảng 200-299
        if (response.statusText !== 'OK') {
            throw new Error('Error fetching products');
        }

        return response;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}