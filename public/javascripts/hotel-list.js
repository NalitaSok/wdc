//Hotel sliding range
var slider= document.getElementById("range");
var output=document.getElementById("result");
output.innerHTML= slider.value; //display the value

//when dragged, it'll update 
slider.oninput = function() {
    output.innerHTML=this.value;  
} 