let button = document.getElementById("enter");
let fullname =  document.getElementById("fullname");
let email = document.getElementById("email");
let bdate = document.getElementById("bdate");
let tbody = document.querySelector("tbody");
let calAge = document.getElementById("calAvg");
let ageArray = [];

function bdateLength(){
	return bdate.value.length;
}

function fnLength() {
	return fullname.value.length;
}

function emailLength() {
	return email.value.length;
}

function addRow(){
	let tr = document.createElement("tr");
	let td1 = document.createElement("td");
	td1.appendChild(document.createTextNode(fullname.value));
	let td2 = document.createElement("td");
	td2.appendChild(document.createTextNode(email.value));
	let td3 = document.createElement("td");
	td3.appendChild(document.createTextNode(bdate.value));
	let birthYear = new Date(bdate.value);
	let td4 = document.createElement("td");
	let currentYear = new Date();
	let ageDiff = new Date(currentYear -  birthYear);
	let age = ageDiff.getUTCFullYear() - 1970;
	ageArray.splice(0,0,age);
	td4.appendChild(document.createTextNode(age));
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);
	tbody.appendChild(tr);
	fullname.value = "";
	email.value = "";
	bdate.value = "";
}

function averageAge() {
	let avg = ageArray.reduce(function(a, b){
        return a + b;
    }, 0) / ageArray.length;
	calAge.innerHTML = `The average age of users is ${avg}.`;
}

function rowColorChanging() {
	var rows = tbody.getElementsByTagName("tr");
	let lastRow = rows.length-1;
	if (lastRow %2 == 0){
		rows[lastRow].children.className = "rowColorTrue"; 
	}
	else{
		rows[lastRow].children.className = "rowColorFalse";
	}
}

function mailValidation(){
	let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	if (emailLength() >0 && email.value.match(mailformat)){
		return true;
	}
	else{
		return false;
	}
}

function addItemafterClick(){
	if (fnLength() > 0 && mailValidation() && bdateLength() > 0){
		addRow();
		averageAge();
		rowColorChanging();
	}
	else if (fnLength() == 0) {
		alert("Please enter your full name.");
	}
	else if (emailLength() == 0) {
		alert("Please enter your email.");
	}
	else if (!mailValidation()){
		alert("Invalid email input.");
	}
	else{
		alert("Please enter your birthday.");
	}

}

// function addItemafterKeypress(event){
// 	if (fnLength() > 0 && mailValidation() && bdateLength() > 0 && event.keyCode === 13){
// 		addRow();
// 		averageAge();
// 		rowColorChanging();
// 	}
// 	else if (fnLength() == 0 && event.keyCode === 13) {
// 		alert("Please enter your full nameeeeee.");
// 	}
// 	else if (emailLength() == 0 && event.keyCode === 13) {
// 		alert("Please enter your email.");
// 	}
// 	else if (!mailValidation() && event.keyCode === 13){
// 		alert("Invalid email input.");
// 	}
// 	else if (bdateLength() && event.keyCode === 13){
// 		alert("Please enter your birthday.");
// 	}
// }

button.addEventListener("click", addItemafterClick);
// fullname.addEventListener("keypress", addItemafterKeypress);
// email.addEventListener("keypress", addItemafterKeypress);
// bdate.addEventListener("keypress", addItemafterKeypress);

// this sort algorithm is adapted from
// https://www.w3schools.com/howto/howto_js_sort_table.asp?fbclid=IwAR17GUw3aGDhqX-OSMNzoI0Ksl3ZUKXsDq_wTOLP3cDWh-JvZzeZLUe6iyA

let sortName = document.getElementById("sortName");
let sortEmail = document.getElementById("sortEmail");
let sortBday = document.getElementById("sortBday");

function sort(column) {
	let table = document.getElementById("userTable");
	let rows, compare, x, y, i;
	let toggle = true;
	while (toggle){
		toggle = false;
		rows = table.rows;
		for (i = 1; i < (rows.length - 1); i++) {
			compare = false;
			x = rows[i].getElementsByTagName("td")[column];
			y = rows[i + 1].getElementsByTagName("td")[column];
		    
		    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()){
		        compare = true;
        		break;
      		}
		}
		if (compare){
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      		toggle = true;
		}
	}
}

sortName.addEventListener("click", () => {
	sort(0);
});

sortEmail.addEventListener("click", () => {
	sort(1);
});

sortBday.addEventListener("click", () => {
	sort(2);
});

var images = ['./images/image1.jpeg',
  './images/image2.jpeg',
  './images/image3.jpeg',
  './images/image4.jpeg',
  './images/image5.jpeg',
  './images/image6.jpeg',
  './images/image7.jpeg',
  './images/image8.jpeg',
  './images/image9.jpeg',
  './images/image10.jpeg'
];

var img = document.getElementById("img");

function displayImage(x) {
  img.style.backgroundImage = "url(" + images[x] + ")";
}
function startTimer() {
  var x = 0;
  displayImage(x);
  setInterval(function() {
    x = x + 1 >= images.length ? 0 : x + 1;
    displayImage(x);
  }, 10000);
}