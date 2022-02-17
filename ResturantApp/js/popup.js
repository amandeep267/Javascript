document.getElementById("table1").addEventListener("click", function (event) {
	event.stopImmediatePropagation();
	document.querySelector('.bg-modal').style.display = "flex";
	sessionStorage.setItem("currentTable", "table1");
	
	let tableName = document.getElementById("table-name");
	tableName.innerText = "Table-1";
	displayItems();
	setTotalOnPopUp();
}, true);

document.getElementById('table2').addEventListener("click", function (event) {
	event.stopImmediatePropagation();
	document.querySelector('.bg-modal').style.display = "flex";
	sessionStorage.setItem("currentTable", "table2");
	let tableName = document.getElementById("table-name");
	tableName.innerText = "Table-2";
	displayItems();
	setTotalOnPopUp();

}, true);
document.getElementById('table3').addEventListener("click", function (event) {
	event.stopImmediatePropagation();
	document.querySelector('.bg-modal').style.display = "flex";
	sessionStorage.setItem("currentTable", "table3");
	let tableName = document.getElementById("table-name");
	tableName.innerText = "Table-3";
	displayItems();
	setTotalOnPopUp();

}, true);
document.querySelector('.close').addEventListener("click", function (event) {
	document.querySelector('.bg-modal').style.display = "none";
	document.querySelector('.bill-container').style.display="none;";
	sessionStorage.setItem("currentTable", "none");
	event.stopImmediatePropagation();
	clearList();


});
document.querySelector('.bill-container .close-bill').addEventListener("click",function (event) {

	document.querySelector('.bill-container').style.display="none";
	clearTable();
	sessionStorage.setItem("currentTable", "none");
	event.stopImmediatePropagation();
	clearList();
	



});


document.getElementById("GenerateBill").addEventListener('click', function (event) {
	event.stopImmediatePropagation();
	generateBill();
});

function clearTable() {
	for (let i = 0; i < TableList.length; i++) {
		if(TableList[i].id==sessionStorage.getItem('currentTable'))
		{
			TableList[i].noOfItems=0;
			TableList[i].items=[];
			TableList[i].TotalBill=0;
		}
	}
setTotalOnPopUp();
}

function displayItems() {
	for (let i = 0; i < TableList.length; i++) {
		if (TableList[i].id == sessionStorage.getItem("currentTable")) {
			let tablerows = createItems(TableList[i]);
			
			for (let j = 0; j < tablerows.length; j++) {
				let element = document.getElementById('mTable');
				element.parentNode.style.overflowY = 'scroll';
				element.appendChild(tablerows[j]);
			}
		}
	}
}

function createItems(table) {
	var arr = []; var temp = [];
	for (let i = 0; i < table.noOfItems; i++) {
		if (!temp.includes(table.items[i])) {
			temp.push(table.items[i])
			let tr = document.createElement("tr");
			tr.id = i;
			tr.setAttribute('class', 'table');

			let sno = document.createElement("td");
			let itemName = document.createElement("td");
			let itemPrice = document.createElement("td");
			let noOfItems = document.createElement("input");
			let bt = document.createElement("td");
			let delButton = document.createElement("button");

			noOfItems.setAttribute('type', 'number');
			noOfItems.setAttribute('value', 0);
			noOfItems.style.width = '45px';
			noOfItems.style.paddingLeft = '40px';
			noOfItems.addEventListener('keyup', function (ev) {
				ev.stopImmediatePropagation();
				noOfItemsUpdate(noOfItems.parentElement);
			})


			bt.style.width = '80px';
			bt.style.paddingLeft = '50px';
			bt.style.paddingTop = '50px';

			delButton.innerHTML = 'Delete';
			delButton.setAttribute('value', 'Delete');
			delButton.id = i;
			delButton.style.width = '90px';
			delButton.style.height = '20px';
			delButton.style.float = 'right';
			delButton.addEventListener('click', function (e) {
				e.stopPropagation();
				deleteItem(delButton.id);
			});
			bt.appendChild(delButton);

			sno.innerHTML = i + 1;
			itemName.innerHTML = table.items[i];
			itemPrice.innerHTML = findPrice(table.items[i]);

			noOfItems.value = findNoOfItems(table.items[i], table);
			sno.style.marginLeft = "2px";
			sno.style.width = '40px';

			itemName.style.width = '100px';
			itemName.style.paddingTop = '15px';
			itemPrice.style.width = '90px';
			itemPrice.style.textAlign = 'center';

			noOfItems.style.width = '100px';
			noOfItems.style.paddingTop = '60px';
			noOfItems.style.border = '0';

			noOfItems.style.borderBottom = '1px solid gray';
			tr.appendChild(sno);
			tr.appendChild(itemName);
			tr.appendChild(itemPrice);
			tr.appendChild(noOfItems);
			tr.appendChild(bt);

			arr.push(tr);
		}
		else
			continue;
	}
	return arr;
}

function deleteItem(id) {
	let elements = document.getElementsByClassName('table');
	Array.from(elements).forEach(function (element) {
		if (element.id == id)
			removeEntryFromTable(element);
	});
}


function findPrice(nameOfItem) {
	for (let i = 0; i < MenuList.length; i++)
		if (MenuList[i].item_name == nameOfItem)
			return MenuList[i].cost;
}

function findNoOfItems(nameOfItem, tablename) {
	let count = 0;
	for (let i = 0; i < tablename.noOfItems; i++)
		if (nameOfItem == tablename.items[i])
			count++;
	return count;
}

function clearList() {
	var elements = document.getElementsByClassName('table');
	while (elements.length > 0)
		elements[0].parentNode.removeChild(elements[0]);
	update();
}



function removeEntryFromTable(element) {
	for (let i = 0; i < TableList.length; i++) {
		if (sessionStorage.getItem('currentTable') == TableList[i].id) {
            let nameOfItem=element.getElementsByTagName("td")[1].innerText;
			let countOfItems=parseInt(element.getElementsByTagName('input')[0].value);
			let cost=parseInt(element.getElementsByTagName("td")[2].innerText);

for(let j=0;j<countOfItems;j++) {
	let index=TableList[i].items.indexOf(nameOfItem);
	if (index > -1)
	{
	TableList[i].items.splice(index,1);
	TableList[i].TotalBill -=cost;
	}

}
TableList[i].noOfItems=TableList[i].items.length;
		clearList();
		displayItems();
	}
	

}}


function generateBill() {
	for (let i = 0; i < TableList.length; i++)
		if (sessionStorage.getItem('currentTable') == TableList[i].id)
		{	document.getElementsByClassName('bill-container')[0].style.display="block";
			document.querySelector('.bill-container p').innerHTML="Total Bill: "+TableList[i].TotalBill;
		}

		
}

function noOfItemsUpdate(element) {

	for (let i = 0; i < TableList.length; i++) {
		if (sessionStorage.getItem('currentTable') == TableList[i].id) {
			
			let val = parseInt(element.getElementsByTagName('input')[0].value);
            let item=element.getElementsByTagName("td")[1].innerText;

			if (!(isNaN(val)) && (val !== undefined)) {
				let count = findNoOfItems(item, TableList[i]);
				let price = parseInt(findPrice(item));

				if (val >= count) {
					for (let j = 1; j <= val - count; j++) {
						TableList[i].items.push(item);
						TableList[i].TotalBill += price;
					}
					TableList[i].noOfItems += val - count;
				}

				else {
					const index = TableList[i].items.indexOf(item);
					if (index > -1) {
						for (let j = 0; j < count - val; j++) {
							let index = TableList[i].items.
								indexOf(item);
							TableList[i].items.splice(index, 1);
						}
						TableList[i].TotalBill -= (count - val) * price;
						TableList[i].noOfItems -= count - val;
					}
				}
			}
			setTotalOnPopUp();
		}
	}
}

