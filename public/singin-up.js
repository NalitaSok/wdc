//Javascript hotel-list 



//Hotel list map
function mapfunc() {
var mapInfo= {
    center:new google.maps.LatLng(-34.92866,138.59863),
    zoom:5,
};
var map=new google.maps.Map(document.getElementById("googleMap"),mapInfo);
}


//Hotel sliding range
var slider= document.getElementById("range");
var output=document.getElementById("result");
output.innerHTML= slider.value; //display the value

//when dragged, it'll update 
slider.oninput = function() {
    output.innerHTML=this.value;  
} 

/* Dropdown bar*/ 
/*user button*/ 
function dragFunction() {
    document.getElementById("dropBox").classList.toggle("show"); 
}

/*close dropdown when user is not hovering over */ 
window.onclick=function(event) {
    if (!event.target.matches('.dropbtn'))
        {
            var dropdown= document.getElementsByClassName("dropContent");
            var i;
            /*number in dropdown*/ 
            for(i=0;i<dropdown.length;i++)
                {
                    var openDrop= dropdown[i];
                    if(openDrop.classList.contains('show')) {
                        openDropdown.classlist.remove('show'); 
                    }
                }
        }
}










