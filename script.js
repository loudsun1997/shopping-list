const list = document.getElementById('item-list');
const toBuyCountSpan = document.getElementById('to-buy-count');
const boughtCountSpan = document.getElementById('bought-count');


let toBuyCount = 0;
let boughtCount = 0;
let totalCount = 0;
let listOfItem = [];

let valueToGetRidOf = null
let text;


function updateCount(){  
	boughtCount = listOfItem.length - toBuyCount
	document.getElementById('to-buy-count').innerHTML = toBuyCount
	document.getElementById('bought-count').innerHTML = boughtCount
}

function removeItemInArrayCallBack(value)
{
	return !(value == valueToGetRidOf)
}

function removeThisLine(){
	buttonStatus = document.getElementById(this.id).firstElementChild.checked
	//alert(document.getElementById(this.id).firstElementChild.checked)
	
	valueToGetRidOf = this.id
    listOfItem = listOfItem.filter(removeItemInArrayCallBack)

	if(buttonStatus)
	{
		updateCount()
		document.getElementById("item-list").removeChild(document.getElementById(this.id))
	}
	else{
		toBuyCount--
		document.getElementById("item-list").removeChild(document.getElementById(this.id))
		updateCount()
	}
}

function buyItem(){
	if(this.checked)
	{
		toBuyCount--
		updateCount()
	}
	else if(!this.checked)
	{
		toBuyCount++
		updateCount()
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
	updateCount()
}

function addItemToBuy() {
	let itemName = prompt('Please enter the name of the item.');  

	listOfItem.push(itemName)
	let uniqueSet = new Set(listOfItem)
	listOfItem = [...uniqueSet]

	addHtml(listOfItem[listOfItem.length-1])
	//alert(toBuyCount)
}