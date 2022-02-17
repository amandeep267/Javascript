
var items = document.querySelectorAll(".left li");
for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('drop', onDrop);
    items[i].addEventListener('dragover', dragOver);

}

let cards = document.querySelectorAll('.right .card');

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('dragstart', dragstart);
}

function update() {
    var update = document.querySelectorAll(".left p");

    for (let i = 0; i < update.length; i++) {
        update[i].textContent = "Rs.  " + TableList[i].TotalBill + " | Total items: " + TableList[i].noOfItems;

    }
    setTotalOnPopUp();
}


var price = 0;
var name1 = "";
function dragstart() {
    for (let i = 0; i < MenuList.length; i++) {
        if (MenuList[i].id == this.id) {
            price = MenuList[i].cost;
            name1 = MenuList[i].item_name;
            break;
        }


    }

}
function onDrop() {

    if (this.id == "table1") {
        sessionStorage.setItem("currentTable", "table1");
        addItem();
    }
    else if (this.id == "table2") {
        sessionStorage.setItem("currentTable", "table2");
        addItem();
    }
    else if (this.id == "table3") {
        sessionStorage.setItem("currentTable", "table3");
        addItem();
    }
}

function addItem() {
    for (let i = 0; i < TableList.length; i++) {
        if (TableList[i].id == sessionStorage.getItem("currentTable")) {
            TableList[i].noOfItems++;
            TableList[i].TotalBill += price;
            TableList[i].items.push(name1);

            update();
            break;
        }


    }
}

function dragOver(ev) {
    ev.preventDefault();
}

function dragOver(ev) {
    ev.preventDefault();
}

function setTotalOnPopUp() {
   
    let ele = document.querySelector('#total p');

    for (let i = 0; i < TableList.length; i++) {
        if (TableList[i].id == sessionStorage.getItem('currentTable')) {
            ele.innerText = 'Total=' + TableList[i].TotalBill;
            break;
        }
    }
}