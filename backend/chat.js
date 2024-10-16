

const createChat = (profileName, image) => {
    let box = document.createElement("div"); 

    box.classList.add("chat-box"); 

    let img = document.createElement("img"); 
    img.src = image;
    img.classList.add("profile-img"); 

    let profileNameDiv = document.createElement("div"); 
    profileNameDiv.innerHTML = profileName; 
    profileNameDiv.classList.add("profile-name"); 

    let chatSpace = document.getElementById("chat-space"); 
    
    box.appendChild(img); 
    box.appendChild(profileNameDiv); 
    chatSpace.appendChild(box); 

}



export {
    createChat
}



