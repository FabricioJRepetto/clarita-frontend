import { editApi } from "@/services/api"

export const password = async (password, newPassword) => {
    const aux = { password, newPassword }
    // console.log('/user/admin/password', '{ user_id, newPassword }', aux);
    const res = await editApi(['/user/changePassword', aux])
    return res
}

//: TODO
export const email = async (user_id, newEmail) => {
    const aux = { user_id, newEmail }
    console.log('/user/admin/email', '{ user_id, newEmail }', aux);
    const res = await editApi(['/user/admin/email', aux])
    return res
}