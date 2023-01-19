
const API_ENDPOINT = "http://localhost:8080"
const API_ENDPOINT_USERS = "http://localhost:8080/users"

let username = document.getElementById("username")
let password = document.getElementById("password")
let submit = document.getElementById("submit-btn")
let formSubmit = document.getElementById("form-submit")

const token = localStorage.getItem("access_token")
if(token)
{
window.alert("Already logged in!")
window.location.replace("homepage.html")
}

username.addEventListener("input", (e)=>{
username.setAttribute("value", e.target.value);
isSumbitOpen();
})
password.addEventListener("input", (e)=>{
password.setAttribute("value", e.target.value);
isSumbitOpen();
})

const isSumbitOpen=()=>{
    if(password?.value && username?.value){
        submit.removeAttribute("disabled", "")
    }
    else{
        submit.setAttribute("disabled","")
    }
}

submit.addEventListener("click", handleFormSubmit)

function handleFormSubmit(e){
    e.preventDefault();
    const bodyData = {
        email: username?.value,
        pass: password?.value
    }
    const data = handlePostRequest(`${API_ENDPOINT_USERS}/login`, bodyData)
    data.then(res=>{
        window.alert(`${res?.message}`);
        localStorage.setItem("access_token", res?.token);
        localStorage.setItem("name", res?.name);
        localStorage.setItem("email", res?.email);
        window.location.replace("homepage.html")
    }).catch((err)=>{
        window.alert("Wrong Credentials")
        throw err;
    })
}

async function handlePostRequest(url, body){
    const config = {
        method:"POST",
        headers:{'Content-Type':"application/json"},
        body: JSON.stringify(body)
    }
    const response = await fetch(url,config)
    const dataRes = await response.json()
    if(!response.ok){
        throw new Error(`HTTP error! state: ${response.status}`)
    }
    return dataRes;
}