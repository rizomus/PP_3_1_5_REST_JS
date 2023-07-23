function getRolesConcat(rolesList) {
    let out = ""
    for (const role in rolesList) {
        out += (role == "ROLE_USER") ? "USER " : "ADMIN ";
    }
    return out;
}

function editUserScript() {

    let  id = document.getElementById("input-edit-id").value
    let  username = document.getElementById("input-edit-username").value
    let  age = document.getElementById("input-edit-age").value
    let  password = document.getElementById("input-edit-password").value
    let  email = document.getElementById("input-edit-email").value
    let  opts = document.getElementById("select-edit-roles").options

    let selectedRoles = [];
    for (let i= 0; i < opts.length; i++) {

        if (opts[i].selected  == true) {
            console.log(opts[i], " is TRUE")
            selectedRoles.push("ROLE_" + opts[i].innerText)
        }
    }
    console.log("NEW DATA: ", id, username, age, password, email, selectedRoles)

    console.log("NEW DATA: ", id, username, password, email)

    const requestHeaders = new Headers()
    requestHeaders.append("Content-Type", "application/json")

    fetch(`/admin/edit`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify({id : id, username : username, password: password, email: email, age: age, roles: selectedRoles})
    })

    let row = document.getElementById(`td${id}`).parentNode
    console.log("row: ", row)
    console.log(row.getElementsByTagName("td"))
    let oldUserName = row.firstElementChild.nextElementSibling
    let oldAge = oldUserName.nextElementSibling
    let oldEmail = oldAge.nextElementSibling
    let oldRole = oldEmail.nextElementSibling

    oldUserName.innerText = username
    oldAge.innerText = age
    oldEmail.innerText = email
    oldRole.innerText = getRolesConcat(selectedRoles)

}