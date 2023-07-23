async function fillForm(id, target) {

    const promise = await fetch(`/admin/getUser${id}`);
    const  user = await promise.json()

    console.log("user.email: ", user.email)

    document.getElementById(`input-${target}-id`).value = user.id
    document.getElementById(`input-${target}-username`).value = user.username
    document.getElementById(`input-${target}-age`).value = user.age
    document.getElementById(`input-${target}-password`).value = user.password
    document.getElementById(`input-${target}-email`).value = user.email
}