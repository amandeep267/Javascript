
let search = document.getElementById("tableInput");
search.addEventListener('keyup', searchTables);
document.getElementById("menuInput").addEventListener('keyup', searchMenu);


function searchTables() {
    let input = document.getElementById('tableInput').value;
    input = input.toLowerCase();

    let cards = document.querySelectorAll('.left .card');
    let names = document.querySelectorAll('.left .card>section>h3');
 
    for (i = 0; i < names.length; i++) {
        if (!names[i].innerHTML.toLowerCase().includes(input)) {
            names[i].parentNode.parentNode.style.display = "none";
        }
        else {

            names[i].style.display = "list-item";
            names[i].parentNode.parentNode.style.display = "list-item";
        }
    }
}

function searchMenu() {
    let input = document.getElementById('menuInput').value;
    input = input.toLowerCase();
    let cards = document.querySelectorAll('.right .card');

    for (let i = 0; i < cards.length; i++) {
        let category = cards[i].classList.value.split(" ")[1];

        let names = cards[i].getElementsByTagName("h3");
  
        if (!(names[0].innerHTML.toLowerCase().includes(input))&& (!category.includes(input))) {
            names[0].parentNode.parentNode.style.display = "none";
        }
        else {
            names[0].style.display = "list-item";
            names[0].parentNode.parentNode.style.display = "list-item";

        }
    }
}