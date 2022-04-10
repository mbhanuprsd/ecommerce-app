import axios from 'axios'
import { PROD_API_KEY, PROD_BASE_URL } from '../firebase';

const axiosInstance = axios.create({
    baseURL: PROD_BASE_URL
})

axiosInstance.interceptors.request.use((req) => {
    req.headers["Content-Type"] = "application/json"
    req.url = req.url.replace('?', '?apiKey='+PROD_API_KEY+'&')
    console.log(req.url)
    return req
})

axiosInstance.interceptors.response.use((res) => {
    console.log(res)
    return res
})

export const findProducts = async (searchValue, setProducts) => {
    try {
        const response = await axiosInstance.get('/food/products/search?query=' + searchValue + "&number=10")
        setProducts(response?.data?.products)
    }
    catch (err) {
        alert(err.message)
    }
}
