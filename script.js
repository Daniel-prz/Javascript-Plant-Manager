"use strict";

let aloe = {
  name: "aloe vera",
  species: "aloe vera",
  waterSchedule: "every 2-3 weeks",
};

let plantsArray = [];

plantsArray.push(aloe);

let plantsToStore = JSON.stringify(plantsArray);
localStorage.setItem("plantsArray", plantsToStore);

function displayPlants() {
  let plantList = document.getElementById("plantlist");
  plantList.innerHTML = "";
  plantsArray.forEach((plant) => {
    let plantitem = document.createElement("li");

    plantitem.innerHTML = `<p>Name: ${plant.name} </p>
    <p> Species: ${plant.species}</p>
    <p> Watering Schedule: ${plant.waterSchedule} `;
    plantList.appendChild(plantitem);
  });
}
loadLocalStorage();
displayPlants();

function addPlant(name, species, waterSchedule) {
  const newPlant = { name, species, waterSchedule };
  plantsArray.push(newPlant);
  displayPlants();
}

let plantForm = document.getElementById("plantform");

function addPlantFromForm(e) {
  e.preventDefault();
  const name = plantForm.name.value;
  const species = plantForm.species.value;
  const waterSchedule = plantForm.waterschedule.value;
  if (
    name.trim() === "" ||
    species.trim() === "" ||
    waterSchedule.trim() === ""
  ) {
    alert("All fields are required");
  } else if (name.length < 3) {
    alert("Please enter valid plant name: Character minimun not met");
  } else if (species.length < 5) {
    alert("Please enter valid plant species: Character minimun not met");
  } else if (waterSchedule.length > 30) {
    alert("Invalid watering schedule: Character limit exceeded");
  } else {

    addPlant(name, species, waterSchedule);
    displayPlants();
    plantForm.reset();
    
  }
}

plantForm.addEventListener("submit", addPlantFromForm);

//REFRESH AFTER CLICKING REMOVE TO LOAD NEW ARRAY
let remove = document.getElementById("remove");

function removePlant(e) {
  e.preventDefault();
  plantsArray.pop();
  let plantsToStore = JSON.stringify(plantsArray);
  localStorage.setItem("plantsArray", plantsToStore);
  displayPlants();
}

remove.addEventListener("click", removePlant);

function loadLocalStorage() {
  let rawPlantData = localStorage.getItem("plantsArray");
  let parsedPlantData = JSON.parse(rawPlantData);
  if (parsedPlantData) {
    plantsArray = parsedPlantData;
  }
}
