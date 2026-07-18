let myButton = document.getElementById("myButton");
let myLabel = document.getElementById("myLabel");

myButton.onclick = function() {
    // Generates a fresh random number (0 to 99) every time the button is clicked
    let randomNumber = Math.floor(Math.random() * 100); 
    myLabel.textContent = randomNumber;
}
