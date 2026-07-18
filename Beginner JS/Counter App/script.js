let myLabel = document.getElementById("myLabel");
let myButton1 = document.getElementById("myButton1");
let myButton2 = document.getElementById("myButton2");
let myButton3 = document.getElementById("myButton3");
let count = 0;

myButton1.onclick = function() {
    count++;
    myLabel.textContent = count;
}
myButton2.onclick = function() {
    count = 0;
    myLabel.textContent = count;
}
myButton3.onclick = function() {
    count--;
    myLabel.textContent = count;
}