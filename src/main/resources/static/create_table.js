async function getAllUsers() {
    const result = await fetch("admin/getAllUsers");
    return await result.json()
}


function getRolesConcat(rolesList) {
    let out = ""
    for (const role in rolesList) {
        out += (role == "0") ? "USER " : "ADMIN ";
    }
    return out;
}


async function fillTable() {
    let table = document.getElementById("users-table")
    let usersList = await getAllUsers();

    for (let i = 0; i < usersList.length; i++) {
        let user = usersList[i]
        table.insertRow().innerHTML =
            `<td id="td${user.id}"> ${user.id} </td> ` +
            `<td> ${user.username} </td> ` +
            `<td> ${user.age} </td> ` +
            `<td> ${user.email} </td> ` +
            `<td> ${getRolesConcat(user.roles)} </td> ` +
            `<td> <button onclick="fillForm(${user.id}, 'edit')"   type=\"button\" class=\"btn btn-primary" data-bs-toggle=\"modal" data-bs-target="\#modal-edit">     Edit       </button>  </td>` +
            `<td> <button onclick="fillForm(${user.id}, 'delete')" type=\"button\" class=\"btn btn-danger\" data-bs-toggle=\"modal" data-bs-target="\#modal-delete">    Delete     </button> </td>`
    }
}
fillTable()
