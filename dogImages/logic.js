function getInput() {
  let selectedDog = document.getElementById("dogs").value;
  console.log("selectedDog", selectedDog);
  if (selectedDog.includes("-")) {
    let newName = selectedDog.split("-");
    selectedDog = newName.join("/");
  }
  if (selectedDog) {
    displayImage(selectedDog);
  } else {
    alert("selectedDog is falsy");
  }
  let str = selectedDog;
}
async function displayImage(dogName) {
  document.getElementById("imageContainer").innerHTML = "";
  console.log(typeof dogName);
  if (dogName.includes("-")) {
    console.log("the name contains -");
  }
  await fetch(`https://dog.ceo/api/breed/${dogName}/images/random`)
    .then((response) => {
      console.log(response);
      if (!response.status === "success") {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle the data from the successful response
      let imageUrl = data.message;
      const image = new Image();
      image.src = imageUrl;
      document.getElementById("imageContainer").appendChild(image);
    })
    .catch((error) => {
      // Handle errors during the fetch
      console.error("There was a problem with the fetch operation:", error);
      alert("Error: " + error.message);
    });
}
