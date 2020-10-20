document.addEventListener("DOMContentLoaded", function (event) {
    let names = ["Jacek", "Robert", "Bartek", "Zuza", "Wiktor", "Paweł"];

    names.forEach(function (name, id) {
        console.log(name + " " + id);
    });
});

document.addEventListener("DOMContentLoaded", function (event) {
    let laureates = prepareLaureates();

    laureates.forEach(function (laureate, id) {
        putLaureatesIntoTable(laureate);
    });
});

function putLaureatesIntoTable(laureate) {
    let tbody = document.getElementById("laureates_tbody");
    let size = tbody.children.length;

    tbody.innerHTML +=
            "<tr><td>" + (size + 1)
            + "</td><td>" + laureate.name
            + "</td><td>" + laureate.surname
            + "</td><td>" + laureate.discipline
			+ "</td><td>" + laureate.year
            + "</td></tr>";
}

function prepareLaureates() {
    let laureate_1 = new NobelLaureate("Andriej", "Gejm", "Fizyka", "2010");
    let laureate_2 = new NobelLaureate("Konstantin", "Nowosiołow", "Fizyka", "2011");
    let laureate_3 = new NobelLaureate("Mo", "Yan", "Literatura", "2013");
    let laureate_4 = new NobelLaureate("Barack", "Obama", "Pokojona Nagroda Nobla", "2014");
    let laureate_5 = new NobelLaureate("Bob", "Dylan", "Literatura", "2015");

    let laureates = [laureate_1, laureate_2, laureate_3, laureate_4, laureate_5];

    return laureates;
}

function NobelLaureate(name, surname, discipline, year) {
    this.name = name;
    this.surname = surname;
    this.discipline = discipline;
	this.year = year;
}