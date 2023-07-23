function getRolesConcat(rolesList) {
    let out = ""
    for (const role in rolesList) {
        out += (role == "ROLE_USER") ? "USER " : "ADMIN ";
    }
    return out;
}

async function newUserScript() {

    let  username = document.getElementById("input-new-username").value
    let  age = document.getElementById("input-new-age").value
    let  password = document.getElementById("input-new-password").value
    let  email = document.getElementById("input-new-email").value
    let  opts = document.getElementById("select-new-roles").options

    let selectedRoles = [];
    for (let i= 0; i < opts.length; i++) {

        if (opts[i].selected  == true) {
            console.log(opts[i], " is TRUE")
            selectedRoles.push("ROLE_" + opts[i].innerText)
        }
    }
    console.log("NEW DATA: ", username, age, password, email, selectedRoles)

    const requestHeaders = new Headers()
    requestHeaders.append("Content-Type", "application/json")

    const promise = await fetch(`/admin/create`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({username : username, password: password, email: email, age: age, roles: selectedRoles})
    })

    let id = await promise.json()
    console.log("RESPONSE: ")
    console.log(id)

    let table = document.getElementById("users-table")

    table.insertRow().innerHTML =
        `<td id="td${id}"> ${id} </td> ` +
        `<td> ${username} </td> ` +
        `<td> ${age} </td> ` +
        `<td> ${email} </td> ` +
        `<td> ${getRolesConcat(selectedRoles)} </td> ` +
        `<td> <button onclick="fillForm(${id}, 'edit')"   type=\"button\" class=\"btn btn-primary" data-bs-toggle=\"modal" data-bs-target="\#modal-edit">     Edit       </button>  </td>` +
        `<td> <button onclick="fillForm(${id}, 'delete')" type=\"button\" class=\"btn btn-danger\" data-bs-toggle=\"modal" data-bs-target="\#modal-delete">    Delete     </button> </td>`

    document.getElementById("new-user-tab").classList.remove("active")
    document.getElementById("new-user-tab").classList.remove("show")
    document.getElementById("nav-link").classList.remove("active")
    document.getElementById("table-tab").classList.add("active")
    document.getElementById("table-tab").classList.add("show")
    document.getElementById("nav-link-active").classList.add("active")

}