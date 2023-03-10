import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "@/utils/cookies";

const BACK_URL = import.meta.env.VITE_BACK_URL

// const config = {
//     //: TODO: set waiting for response time (failsafe for fatal errors on server and to avoid infinite loadings)
//     headers: {
//         Authorization: getCookie('userToken')
//     }
// };

export const api = async (key) => {
    const { data: response } = await axios(BACK_URL + key, {
        headers: {
            Authorization: getCookie('userToken')
        }
    })
    if (!response.error) {
        return response
    } else throw new Error(response.error)
}

export const login = async (data) => {
    const { data: response } = await axios.post(BACK_URL + '/user/login', data)
    if (!response.error) {
        //: TODO: hay una forma de que la res del servidor setee automaticamente la cookie
        //: TODO: expiración del token
        setCookie('userToken', response.token, 1)
        return response
    } else return response
}

export const autoLogin = async ([key, token]) => {
    // se recomienda que swr envíe el token para que indexe la req
    const { data: response } = await axios(BACK_URL + '/user/autologin', {
        headers: {
            Authorization: getCookie('userToken')
        }
    })

    if (!response.error) {
        return response
    } else {
        deleteCookie('userToken')
        throw new Error(response.error)
    }
}

export const postApi = async ([key, data]) => {
    // se recomienda que swr envíe el token para que indexe la req
    //: el header puede dar problemas en los post donde no es necesario el header (osea que no hay sesion iniciada, como el cambio de password)
    const { data: response } = await axios.post(BACK_URL + key, data, {
        headers: {
            Authorization: getCookie('userToken')
        }
    })

    if (!response.error) {
        return response
    } else {
        throw new Error(response.error)
    }
}

export const editApi = async ([key, data]) => {
    // se recomienda que swr envíe el token para que indexe la req
    const { data: response } = await axios.put(BACK_URL + key, data, {
        headers: {
            Authorization: getCookie('userToken')
        }
    })

    if (!response.error) {
        return response
    } else {
        throw new Error(response.error)
    }
}

export const deleteApi = async (key) => {
    // se recomienda que swr envíe el token para que indexe la req
    const { data: response } = await axios.delete(BACK_URL + key, {
        headers: {
            Authorization: getCookie('userToken')
        }
    })

    if (!response.error) {
        return response
    } else {
        throw new Error(response.error)
    }
}