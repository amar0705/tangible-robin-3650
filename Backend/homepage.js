const token = localStorage.getItem("access_token")
// if(token)
// document.getElementById("show-body").style.display = "block";
// else
// document.getElementById("show-body").style.display = "none";
let user = document.getElementById("logged-user")
let logout = document.getElementById("logout")

if(token){
user.innerHTML = `<h5> Hi! ${localStorage.getItem("name")}</h5>`
}
else{
    logout.style.display="none";
}


logout.addEventListener("click", ()=>{
    localStorage.clear();
    window.location.replace("homepage.html")
})

