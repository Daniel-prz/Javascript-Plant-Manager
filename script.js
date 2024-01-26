"use strict";

let aloe = {
  name: "aloe vera",
  species: "aloe vera",
  waterSchedule: "every 2-3 weeks",
};

let rawPlantData = localStorage.getItem("plantsArray");
let parsedPlantData = JSON.parse(rawPlantData);

let plantsArray = parsedPlantData || [];
plantsArray.push(aloe);

let plantsToStore = JSON.stringify(plantsArray);
localStorage.setItem("plantsArray", plantsToStore);

function displayPlants() {
  plantsArray.forEach((plant) => {
    let plantitem = document.createElement("li");
    plantitem.innerHTML = `<p>Name: ${plant.name} </p>
    <p> Species: ${plant.species}</p>
    <p> Watering Schedule: ${plant.waterSchedule} `;
    document.getElementById("plantlist").appendChild(plantitem);
  });
}
displayPlants();

function addPlant(name, species, waterSchedule) {
  const newPlant = { name, species, waterSchedule };
  plantsArray.push(newPlant);
}

let plantForm = document.getElementById("plantform");

function addPlantFromForm(e) {
  e.preventDefault();
  const name = plantForm.name.value;
  const species = plantForm.species.value;
  const waterSchedule = plantForm.waterschedule.value;

  addPlant(name, species, waterSchedule);
  displayPlants();
}

plantForm.addEventListener("submit", addPlantFromForm);

//REFRESH AFTER CLICKING REMOVE TO LOAD NEW ARRAY
let remove = document.getElementById("remove");

function removePlant(e) {
  e.preventDefault();
  plantsArray.pop();
  let plantsToStore = JSON.stringify(plantsArray);
  localStorage.setItem("plantsArray", plantsToStore);
}

remove.addEventListener("click", removePlant);
