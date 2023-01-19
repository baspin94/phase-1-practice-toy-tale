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
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toyData => toyData.forEach(toy => createToy(toy)));
});

const toyCollection = document.querySelector("#toy-collection");

function createToy(toyObject) {
    //create/append card
    const toyCard = document.createElement("div");
    toyCard.className = "card";
    toyCollection.append(toyCard);

    //create/append card elements

    //heading
    const toyName = document.createElement("h2");
    toyName.textContent = toyObject.name;
    toyCard.append(toyName);

    //image
    const toyImage = document.createElement("img");
    toyImage.src = toyObject.image;
    toyImage.alt = toyObject.name;
    toyImage.className = "toy-avatar";
    toyCard.append(toyImage);

    //number of likes
    const toyLikes = document.createElement("p");
    let numLikes = parseInt(toyObject.likes);
    if (numLikes === 1) {
      toyLikes.textContent = numLikes + " Like";
    } else toyLikes.textContent = numLikes + " Likes";
    
    toyCard.append(toyLikes);

    //like button
    const likeBtn = document.createElement("button");
    likeBtn.id = toyObject.id;
    likeBtn.className = "like-btn";
    likeBtn.textContent = "Like ❤️";
    toyCard.append(likeBtn);

    //add event listener to like button
    likeBtn.addEventListener("click", () => {
      fetch(`http://localhost:3000/toys/${likeBtn.id}`,{
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(
          {likes: numLikes += 1}
        )
        }
      )
      .then(response => response.json())
      .then(updatedToy => 
        toyLikes.textContent = updatedToy.likes + " Likes");
  });
}