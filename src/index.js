let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

async function displayToys(){
  const response = await fetch("http://localhost:3000/toys")
  const convertedResponse = await response.json()
  const toyList = document.querySelector("#toy-collection")
  convertedResponse.forEach(toy=>{
    const divElement = document.createElement("div")
    divElement.className = "card"

    const h2Element = document.createElement("h2")
    h2Element.innerText = toy.name

    const imgElement = document.createElement("img")
    imgElement.src = toy.image
    imgElement.className = "toy-avatar"

    const pElement = document.createElement("p")
    pElement.innerText = "Likes: "+ toy.likes
    let currentLikes = parseInt(pElement.innerText.split("").splice(pElement.innerText.indexOf(" ")).join(""))


    const buttonElement = document.createElement("button")
    buttonElement.className = "like-btn"
    buttonElement.id = "toy_id"
    buttonElement.innerText = "Like ❤️"

    buttonElement.addEventListener("click", () =>{
      currentLikes++
      pElement.innerText = "Likes: "+ currentLikes;
    })


    divElement.append(h2Element, imgElement, pElement, buttonElement)
    toyList.append(divElement)
  })
}



document.querySelector("form").addEventListener("submit", e =>{
  // e.preventDefault();
  const newToy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes:0
  }
  fetch("http://localhost:3000/toys",{
    method:"POST",
    headers:{
      //sending JSON to db
      //**application/json rerenders page but applications/json doesn't 
      "Content-Type": "application/json",
      //expecting a copy of the JSON back as confirmation
      "Accept": "application/json" 
    },
    body:JSON.stringify(newToy)
  })
  .then(res => res.json())
  .then(newToy)
})

displayToys()
