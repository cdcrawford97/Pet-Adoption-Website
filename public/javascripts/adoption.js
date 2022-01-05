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


/* Post-Render Dropdown Selection by Value */
function setSelectedIndex(s, valsearch) {
    // Loop through all the items in drop down list
    for (i = 0; i< s.options.length; i++){ 
        if (s.options[i].value == valsearch){
            // Item is found. Set its property and exit
            s.options[i].selected = true;
            break;
        };     
    };
    return;
};


/* Checks dropdown options of submission form when submitted and keeps them for when page reloads*/
function checkSearch(sort, type, breed) {
    window.addEventListener('load', function() {

        //asigns submitted pet age to the dropdown option selected
        setSelectedIndex(document.getElementById("sort-dropdown"), sort );

        //asigns submitted pet type to the dropdown option selected
        for (let x in petObject) {
            petTypeSel.options[petTypeSel.options.length] = new Option(x, x);
        };
        setSelectedIndex(document.getElementById("type"), type );

        //loads the dropdown pet breed options based on the first param1 (pet type)
        if(petTypeSel.value){
            let y = petObject[petTypeSel.value];
            for (let i = 0; i < y.length; i++) {
                breedSel.options[breedSel.options.length] = new Option(y[i], y[i]);
            }
            //asigns submitted pet breed to the dropdown option selected
            setSelectedIndex(document.getElementById("breed"), breed );
        }
    });
};

petTypeSel.onchange = function() {
    //remove all options first
    breedSel.length = 1;
    //traversing through each property array and adding them to dropdown list
    let y = petObject[petTypeSel.value];
    for (let i = 0; i < y.length; i++) {
        breedSel.options[breedSel.options.length] = new Option(y[i], y[i]);
    };
};

function checkAgeSearch(age) {
    window.addEventListener('load', function() {
        //asigns submitted pet age to the dropdown option selected
        setSelectedIndex(document.getElementById("age"), age );
    });
}

//assigns checkbox state to checked if its value is true
function checkCheckBox(booleanValue, elementId){
    if(booleanValue == "true" ){
      document.getElementById(elementId).checked = true;
    };
};

//disables form fields that are empty when submitting faceted search form
function disableEmptyInputs(form) {
    let controls = form.elements;
    for (let i=0, iLen=controls.length; i<iLen; i++) {
        if (controls[i].value == '') controls[i].disabled = true;
    };
};

//When sort by dropdown list changes then submit search form
function sortSubmitForm(element){
    let sortValue = document.getElementById("sort");
    sortValue.value = element.value;
    document.getElementById("submit").click();
};

//When pagination button changes then submit search form
function paginationSubmitForm(element){
    const paginationValue = document.getElementById("page");
    paginationValue.value = element.value;
    document.getElementById("submit").click();
};

// clears all options selected and submits form
function clearAll() {
    const form = document.getElementById('search')
    const type = document.getElementById('type');
    const breed = document.getElementById('breed');
    const age = document.getElementById('age');
    const location = document.getElementById('location');
    const keywords = document.getElementById('keywords');
    const petFriendly = document.getElementById('petFriendly');
    const childFriendly = document.getElementById('childFriendly');
    const specialNeeds = document.getElementById('specialNeeds');

    type.options[0].selected = true;
    breed.options[0].selected = true;
    age.options[0].selected = true;
    location.value = '';
    keywords.value = '';
    petFriendly.checked = false;
    childFriendly.checked = false;
    specialNeeds.checked = false;

    form.submit;
};