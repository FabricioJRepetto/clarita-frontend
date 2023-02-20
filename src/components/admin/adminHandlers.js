import { deleteApi, editApi } from "@/services/api";

export const approve = async (user_id, arg) => {
    const aux = { user_id, approved: arg }
    // console.log('/user/admin/approve', '{ user_id, approved: boolean }', aux);
    const res = await editApi(['/user/admin/approve', aux])
    console.log(res);
}

export const deleteUser = async (user_id) => {
    const res = await deleteApi(`/user/admin/delete?id=${user_id}`)
    console.log(res);
}

export const password = (user_id, newPassword) => {
    const aux = { user_id, newPassword }
    console.log('/user/admin/password', '{ user_id, newPassword }', aux);

}

export const email = (user_id, newEmail) => {
    const aux = { user_id, newEmail }
    console.log('/user/admin/email', '{ user_id, newEmail }', aux);

}

export const role = (user_id, newRole) => {
    const aux = { user_id, newRole }
    console.log('/user/admin/role', '{ user_id, newRole }', aux);

}


