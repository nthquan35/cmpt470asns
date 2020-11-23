const recDisplay = document.getElementById('recDisplay');	
const request = new Request('http://35.224.245.62/displayRectangles');
var deleteId = document.getElementById('deleteId');
var delButton = document.getElementById('delButton');
var alert = document.getElementById('alert');

const url = request.url;
const method = request.method;

fetch(request)
  .then(response => response.json())
  .then((users) => {
  	users.forEach(rec => {
  		let div = document.createElement("div");
  		let index = document.createElement("h2");
  		let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  		let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  		let id = rec.id;
  		let width = rec.width;
  		let height = rec.height;
  		let color = rec.color;
  		svg.style.width = width*5;
  		svg.style.height = height*5;
  		rect.style.width = width*5;
  		rect.style.height = height*5;
  		rect.style.fill = color;
  		svg.appendChild(rect);
		index.appendChild(document.createTextNode(id));
		div.appendChild(index);
		div.appendChild(svg);
		recDisplay.appendChild(div);
  	})
  })

delButton.addEventListener("click", triggerDelete);
function triggerDelete() {
	event.preventDefault();
	var id = {
		id: deleteId.value
	};
	var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://35.224.245.62/display", true);
   	xhr.setRequestHeader('Content-Type', 'application/json');
   	xhr.send(JSON.stringify(id));
   	xhr.onload = function () {
	   	if (xhr.status == 200){
  			var response = JSON.parse(xhr.responseText);
  			if (response === "Deleted"){
  				setTimeout(location.reload.bind(location), 0); 	
  			}
  			else{
  				alert.innerHTML = `${deleteId.value} is not found.`;
  				alert.className += " alert-warning";
  				fade(alert);
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
    }, 200);
}
