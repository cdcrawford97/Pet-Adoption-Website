/* Post-Render Dropdown Selection by Value */
function setSelectedIndex(s, valsearch) {
  // Loop through all the items in drop down list
  for (i = 0; i< s.options.length; i++){ 
      if (s.options[i].value == valsearch){
          // Item is found. Set its property and exit
          s.options[i].selected = true;
          break;
      }       
  }
  return;
};


const petObject = {
  "Birds": [
    "Mixed Breed", "Birds of Prey", "Canaries", "Doves", "Parrots", "Pigeons"],
  "Cats": [
      "Mixed Breed", "Bengal", "British Longhair", "British Shorthair", "Burmese",
      "Maine Coon", "Munchkin", "Persian", "Ragdoll", "Scottish Fold", "Siamese" ,
      "Sphynx",  "Thai", "Tibetan"],
  "Dogs": [
      "Mixed Breed", "Alaskan Malamute", "American Bulldog", "Australian Shepard",
      "Basset Hound", "Beagle", "Bernese Mountain Dog", "Border Collie", "Boxer", "Cavapoo",
      "Chihuahua", "Dachschund", "Dalmation", "Doberman", "English Bulldog", "English Springer Spaniel",
      "French Bulldog", "German Shephard", "Golden Retriever", "Great Dane", "Greyhound", "Jack Russel",
      "Labrador Retriever", "Poodle", "Pug", "Saint Bernard", "Schnauzer", "Shih Tzu", "Siberian Husky",
      "Tibetan Terrier", "Yorkshire Terrier"],
  "Fish": [
      "Catfish", "Goldfish", "Other/Mixed Breed", "Pond Fish", "Pufferfish", "Rainbow Fish", "Shrimps"],
  "Rabbits": [
      "Mixed Breed", "British Giant", "Dwarf Lop", "English Spot", "Sable", "Silver Fox", "Tri Coloured Dutch"],
  "Reptiles": [
      "Mixed Breed", "Bearded Dragon", "Frog", "Snake", "Gecko", "Lizard", "Newt", "Turtle/Tortoise"],
  "Rodents": [
      "Mixed Breed", "Chinchilla", "Ferret", "Gerbil", "Guinea Pig", "Hamster", "Mouse", "Hedgehog", "Rat"]
};

const petTypeSel = document.getElementById("type");
const breedSel = document.getElementById("breed");
const genderSel = document.getElementById("gender");

// assigns dropdown options to selected values for the edit page
function selectDropdownValues(type, breed, gender) {

  for (let x in petObject) {
      petTypeSel.options[petTypeSel.options.length] = new Option(x, x);
  };

  setSelectedIndex(petTypeSel, type );

  let y = petObject[petTypeSel.value];
  for (let i = 0; i < y.length; i++) {
      breedSel.options[breedSel.options.length] = new Option(y[i], y[i]);
  };
  
  //asigns submitted pet breed to the dropdown option selected
  setSelectedIndex(breedSel, breed);
  //asigns submitted pet age to the dropdown option selected
  setSelectedIndex(genderSel, gender);

};

petTypeSel.onchange = () => {
  //remove all options first
  breedSel.length = 1;
  //traversing through each property array and adding them to dropdown list
  let y = petObject[petTypeSel.value];
  for (let i = 0; i < y.length; i++) {
      breedSel.options[breedSel.options.length] = new Option(y[i], y[i]);
  };
};


//assigns checkbox state to checked if its value is true
function checkCheckBox(booleanValue, elementId){
  if(booleanValue == "true" ){
    document.getElementById(elementId).checked = true;
  }
}

