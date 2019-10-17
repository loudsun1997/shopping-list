const list = document.getElementById('item-list');
const toBuyCountSpan = document.getElementById('to-buy-count');
const boughtCountSpan = document.getElementById('bought-count');


let toBuyCount = 0;
let boughtCount = 0;
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


function addNewAgeGroup(value){
	
	let newLabel = document.createElement('label');
	newLabel.innerHTML = `${value}` + '<br>';
	
	let newButton = document.createElement('input');
	newButton.id = `${value}`;
	newButton.type = "button";
	newButton.name = `${value}`;
	newButton.value = "Delete";
	newLabel.prepend(newButton); 

	let newCheckBox = document.createElement('input');
	newCheckBox.id = `${value}`;
	newCheckBox.type = "checkbox";
	newCheckBox.name = `${value}`;
	newLabel.prepend(newCheckBox); 
	
	document.getElementById("item-list").appendChild(newLabel);	
	
	var node = document.createElement("LI");
	var textnode = document.createTextNode("Water");
	node.appendChild(textnode);
	document.getElementById("item-list").appendChild(node);
}

function addItemToBuy() {
  alert('New To-buy Item button clicked!');
  let itemName = prompt('Please enter the name of the item.');  

  toBuyCount++;
  listOfItem.push(itemName)
  let uniqueSet = new Set(listOfItem)
  listOfItem = [...uniqueSet]
  //list.innerHTML = listOfItem;
  //showList();
  addNewAgeGroup(listOfItem[listOfItem.length-1])
  updateCount()
  alert(toBuyCount)
}