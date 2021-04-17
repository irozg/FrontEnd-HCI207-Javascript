var plays = Object.keys(shows);
const datesDiv = document.querySelector("#dates");

plays.forEach(function (play) {
    let option = document.createElement('option');
    option.value = play;
    option.innerHTML = shows[play].name;
    document.querySelector('#plays').appendChild(option);
});

function userSelection() {

    //Αν ο χρηστης επιλέξει κάποιο τίτλο απο τις εικόνες
    const elements = document.querySelectorAll('.title');
    playSelect = elements.forEach((el) => {
        el.addEventListener('click', (e) => {
            let playSelect = e.target.className;

            //  επιλεξε τη μία κλάση απο τις δύο 
            playSelect = playSelect.split(' ')[1];
            document.querySelector('#plays').value = playSelect;

            // σβήσε τις προηγουμενες επιλογές
            let previous = document.querySelector('#dates');
            previous.innerHTML = " ";

            // printSelection(playSelect);
            displayAllPlays(playSelect);

            //βάλε μπορτερ στην φωτογραφία για να φαίνεται επιλεγμένη   
            document.querySelectorAll(".feature").forEach((element) => element.classList.remove("selected"));
            e.target.parentElement.classList.add("selected");

        });
    });

    // Αν ο χρηστης επιλέξει κάποια επιλογή απο τον επιλογέα
    const selectElement = document.querySelector('#plays');
    selectElement.addEventListener('change', (e) => {
        playSelect = e.target.value;
        
        // σβήσε τις προηγουμενες επιλογές
        let previous = document.querySelector('#dates');
        previous.innerHTML = " ";
        previous.classList.remove("dateSelected");
 
        printSelection(playSelect);
        displayAllPlays(playSelect);

        //βάλε μπορτερ στην φωτογραφία για να φαίνεται επιλεγμένη
        let selected = document.querySelectorAll(".feature")
        selected.forEach((element) => element.classList.remove("selected"));
        // .parentElement.classList.toggle("selected");

    });

}

function printSelection(userSelection){
    let print = document.querySelector("#userSelection");
    let play = shows[userSelection];

    let div = document.createElement("div");
    div.classList.add("namePlay");
    div.innerHTML = play.name;

    let div2 = document.createElement("div");
    div2.classList.add("roomPlay");
    div2.innerHTML = play.room

    print.appendChild(div);
    print.appendChild(div2);

}


function displayAllPlays(userSelection) {

    let wrapper = document.createElement("div");
    wrapper.classList.add('rWrapper');

    let play = shows[userSelection];
    let datesAr = play.dates;

    // για κάθε παρασταση
    datesAr.forEach(function (date) {
        // φτιαξε ενα radio button
        let div = document.createElement('div');
        div.classList.add('date');
        let dateId = "dateId" + date.replaceAll("-", "");

        // φτιαξε ενα radio button
        let input = document.createElement('input');
        input.classList.add('radio');
        input.setAttribute("type", "radio");
        input.setAttribute("id", dateId);
        input.setAttribute("name", "date");
        input.addEventListener("click", (e) => formApplication(e.target.id));

        input.value = date;
        div.appendChild(input);
        // φτιάξε ενα label
        let label = document.createElement('label');
        label.setAttribute("for", dateId);
        label.innerHTML = date;
        div.appendChild(label);

        for (role in play.roles) {
            let divRole = document.createElement('div');
            divRole.classList.add('role');
            divRole.innerHTML = role + ": <br/>";
            div.appendChild(divRole);
            let span = document.createElement('span');
            span.classList.add('actor');
            divRole.appendChild(span);
            // console.log(role);  //return strings with the names of roles    
            let dateAr = play.roles[role];
            // console.log(actors);   // return object of actors

            // print the roles of the actors for each date
            for (actor in dateAr) {
                let exist = dateAr[actor].some(arrVal => date === arrVal);
                if (exist) {
                    span.innerHTML = actor;
                } else if (dateAr[actor].length === 0) {
                    span.innerHTML = actor;
                }
            }

        }

        wrapper.appendChild(div);
        datesDiv.appendChild(wrapper);

    });


}

userSelection();

function formApplication(id) {
    //    console.log("Hello");
    let d = document.querySelectorAll(".date");
    for (i = 0; i < d.length; i++) {
        d[i].style.display = "none";
    }
    let dateSelected = document.querySelector("#" + id);
    dateSelected.parentElement.style.display = "block";

    let dates = document.querySelector("#dates");
    dates.classList.add("dateSelected");


}
