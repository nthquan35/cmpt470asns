var submit = document.getElementById('submit');
var form = document.getElementById('addForm');

var width = document.getElementById('width');
var height  = document.getElementById('height');
var color = document.getElementById('color');
var successMessage = document.getElementById("successMessage");

submit.addEventListener("click", addRectangle);

function addRectangle(event){
	event.preventDefault();
	var element = {
		w : width.value,
		h : height.value,
		c : color.value
	}
	var xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action, true);
   	xhr.setRequestHeader('Content-Type', 'application/json');
   	xhr.send(JSON.stringify(element));
   	xhr.onreadystatechange = function() { 
	    if (xhr.readyState == 4 && xhr.status == 200){
			var response = JSON.parse(xhr.responseText);
			// console.log(response);
			if (response === "Success"){
				successMessage.innerHTML = "<span style='color: green;'>Your Rectangle has been added!</span>";
				fade(successMessage);
			}
			else{
				successMessage.innerHTML = "<span style='color: red;'>An error occurs</span>";				
				fade(successMessage);
			}	
	    }
    };
}

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 100);
}