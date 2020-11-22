var submit = document.getElementById('editButton');
var form = document.getElementById('editForm');
var alert = document.getElementById('alert');

var id = document.getElementById('index');
var width = document.getElementById('editWidth');
var height  = document.getElementById('editHeight');
var color = document.getElementById('editColor');	

function checkId() {
	return id.value.length;
}

function checkWidth(){
	return width.value.length;
}

function checkHeight(){
	return height.value.length;
}

function checkColor(){
	return color.value.length;
}


submit.addEventListener("click", submitEditForm);

function submitEditForm(event){
	event.preventDefault();
	if (checkId() > 0){
		if (checkWidth() == 0 && checkHeight() == 0 && checkColor() == 0){
			alert.innerHTML = `Nothing is requested to change.`;
			alert.className += " alert-warning ";
			fade(alert);
		}
		else{
			var element = {
				id: id.value,
				width : width.value,
				height : height.value,
				color : color.value
			}
			console.log(form.action, form.method);
			var xhr = new XMLHttpRequest();
		    xhr.open(form.method, form.action, true);
		   	xhr.setRequestHeader('Content-Type', 'application/json');
		   	xhr.send(JSON.stringify(element));
		   	// console.log(JSON.stringify(element));
			xhr.onreadystatechange = function() { 
				if (xhr.readyState == 4 && xhr.status == 200){
					var response = JSON.parse(xhr.responseText);
					if (response === "Changed"){
						alert.innerHTML = "One or more components has changed.";
						alert.className += " alert-success";
						fade(alert);
					}
					else {
						alert.innerHTML = `ID ${id.value} is invalid.`;
						alert.className += " alert-warning";
						fade(alert);
					}
				}
			}
		}
	}
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