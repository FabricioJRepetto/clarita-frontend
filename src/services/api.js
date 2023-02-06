import { deleteCookie, getCookie, setCookie } from "@/utils/cookies";
import axios from "axios";
const BACK_URL = import.meta.env.VITE_BACK_URL
const TOKEN = getCookie('userToken')

const config = {
    //: TODO: set waiting for response time (failsafe for fatal errors on server and to avoid infinite loadings)
    headers: {
        Authorization: TOKEN
    }
};

export const login = async (data) => {
    const { data: response } = await axios.post(BACK_URL + '/user/login', data)
    console.log('api.js', response);
    if (!response.error) {
        //: TODO: hay una forma de que la res del servidor setee automaticamente la cookie
        //: TODO: expiración del token
        setCookie('userToken', response.token, 1)
        return response
    } else throw new Error(response.error)
}

export const autoLogin = async ([key, token]) => {
    // se recomienda que swr envíe el token para que indexe la req
    const { data: response } = await axios(BACK_URL + '/user/autologin', config)
    console.log('api.js', response);
    if (!response.error) {
        return response
    } else {
        deleteCookie('userToken')
        throw new Error(response.error)
    }
}

// const fetcher = (...args) => fetch(...args).then(res => res.json())

// const postFetcher = (...args) => fetch(...args).then(res => res.json())

// const fetchWithToken = (url, token) => fetch(...args).then(res => res.json())

// const { data: user } = useSWR(['/api/user', token], ([url, token]) => fetchWithToken(url, token))