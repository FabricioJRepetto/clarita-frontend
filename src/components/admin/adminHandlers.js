import { deleteApi, editApi } from "@/services/api";

//: TODO: NOTIFICATIONS

export const approve = async (user_id, arg) => {
    const aux = { user_id, approved: arg }
    // console.log('/user/admin/approve', '{ user_id, approved: boolean }', aux);
    const res = await editApi(['/user/admin/approve', aux])
    return res
}

export const deleteUser = async (user_id) => {
    const res = await deleteApi(`/user/admin/delete?id=${user_id}`)
    return res
}

export const password = async (user_id, newPassword) => {
    const aux = { user_id, newPassword }
    // console.log('/user/admin/password', '{ user_id, newPassword }', aux);
    const res = await editApi(['/user/admin/password', aux])
    return res
}

export const email = async (user_id, newEmail) => {
    const aux = { user_id, newEmail }
    console.log('/user/admin/email', '{ user_id, newEmail }', aux);
    const res = await editApi(['/user/admin/email', aux])
    return res
}

export const role = async (user_id, newRole) => {
    const aux = { user_id, newRole }
    // console.log('/user/admin/role', '{ user_id, newRole }', aux);
    const res = await editApi(['/user/admin/role', aux])
    return res
}


