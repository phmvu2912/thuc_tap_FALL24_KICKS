import axios from "axios";

const instacnce = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000
});

export default instacnce;