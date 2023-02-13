import { api } from "@/services/api"

const useValidate = async ({ token }) => {

    const { data } = await api(`/user/checkPasswordToken?t=${token}`)

    return {
        data: data || false,
        isLoading: !data
    }
}

export default useValidate