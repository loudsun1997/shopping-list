const list = document.getElementById('item-list');
const toBuyCountSpan = document.getElementById('to-buy-count');
const boughtCountSpan = document.getElementById('bought-count');


let toBuyCount = 0;
let boughtCount = 0;
let totalCount = 0;
let listOfItem = [];

let valueToGetRidOf = null
let text;


function showList(){
	text = "<ul>";
	listOfItem.forEach(addLine);
	text += "</ul>";
	document.getElementById("item-list").innerHTML = text;
}


function addLine(value) {
	text += '<li><input type="checkbox" onClick=updateCount()><button onClick=removeItem(\'' + value + '\')>X</button>' + value + "</li>";
} 


function removeItem(value){
    valueToGetRidOf = value
    listOfItem = listOfItem.filter(removeItemInArrayCallBack)
	updateCount()
    showList()
	updateCount()
	showList()
}


function removeItemInArrayCallBack(value)
{
	return !(value == valueToGetRidOf)
}


function updateCount(){
    let checkboxes = document.getElementsByTagName("input"),
    count = 0;
    for (var i=0; i<checkboxes.length; i++) {       
        if (checkboxes[i].type == "checkbox" && checkboxes[i].checked == true) 
        {
        count++;
        }
    }
	
  boughtCount = count
  document.getElementById('bought-count').innerHTML = boughtCount
  
  toBuyCount = checkboxes.length - boughtCount
  document.getElementById('to-buy-count').innerHTML = toBuyCount

}

function updateCount1(){  
  boughtCount = listOfItem.length - toBuyCount
  document.getElementById('to-buy-count').innerHTML = toBuyCount
  document.getElementById('bought-count').innerHTML = boughtCount
}


function removeThisLine(){
	buttonStatus = document.getElementById(this.id).firstElementChild.checked
	alert(document.getElementById(this.id).firstElementChild.checked)
	
	valueToGetRidOf = this.id
    listOfItem = listOfItem.filter(removeItemInArrayCallBack)
	
	if(buttonStatus)
	{
		updateCount1()
		document.getElementById("item-list").removeChild(document.getElementById(this.id))
	}
	else{
		toBuyCount--
		document.getElementById("item-list").removeChild(document.getElementById(this.id))
		updateCount1()
	}

	

}

function buyItem(){
	if(this.checked)
	{
		toBuyCount--
		updateCount1()
	}
	else if(!this.checked)
	{
		toBuyCount++
		updateCount1()
	}
}


function addHtml(value){
	
	let newLabel = document.createElement('label');
	newLabel.id = value
	newLabel.innerHTML = `${value}` + '<br>';
	
	let newButton = document.createElement('input');
	newButton.id = `${value}`;
	newButton.type = "button";
	newButton.name = `${value}`;
	newButton.value = "Delete";
	newButton.onclick = removeThisLine.bind(newLabel)
	newLabel.prepend(newButton); 

	let newCheckBox = document.createElement('input');
	newCheckBox.id = `${value}`;
	newCheckBox.type = "checkbox";
	newCheckBox.name = `${value}`;
	newCheckBox.onchange = buyItem.bind(newCheckBox)
	newLabel.prepend(newCheckBox); 
	
	document.getElementById("item-list").appendChild(newLabel);	
	totalCount++
	toBuyCount++
	updateCount1()
}

function addItemToBuy() {
	let itemName = prompt('Please enter the name of the item.');  

	listOfItem.push(itemName)
	let uniqueSet = new Set(listOfItem)
	listOfItem = [...uniqueSet]

	addHtml(listOfItem[listOfItem.length-1])
	alert(toBuyCount)
}