async function deleteUserScript() {

    let id = document.getElementById("input-delete-id").value

    const requestHeaders = new Headers()
    requestHeaders.append("Content-Type", "application/json")

    fetch(`/admin/delete/${id}`, {
        method: "PATCH",
        headers: requestHeaders,
        body: JSON.stringify({id : id})
    })

    let row = document.getElementById(`td${id}`).parentNode
    let parent = row.parentNode
    parent.removeChild(row)
}