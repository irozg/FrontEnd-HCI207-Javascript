var plays = Object.keys(shows);
const datesDiv = document.querySelector("#dates");

plays.forEach(function (play) {
    let option = document.createElement('option');
    option.value = play;
    option.innerHTML = shows[play].name;
    document.querySelector('#plays').appendChild(option);
});

function userSelection() {

    const elements = document.querySelectorAll('.title');
    playSelect = elements.forEach((el) => {
        el.addEventListener('click', (e) => {
            let playSelect = e.target.className;
            playSelect = playSelect.split(' ')[1];
            document.querySelector('#plays').value = playSelect;
            displayAllPlays(playSelect);
            console.log(playSelect);
        });
    });


    const selectElement = document.querySelector('#plays');
    selectElement.addEventListener('change', (e) => {
        playSelect = e.target.value;
        displayAllPlays(playSelect);
        // return playSelect;
        console.log(playSelect);
    });

}

function displayAllPlays(userSelection) {

     const wrapper = document.querySelector("#wrapper");

    let datesDiv = document.querySelector(".wrapper");
    console.log(datesDiv);

    let play = shows[userSelection];
    let datesAr = play.dates;

    // για κάθε παρασταση
    datesAr.forEach(function (date) {
        // φτιαξε ενα radio button
        let div = document.createElement('div');
        div.classList.add('date');

        // φτιαξε ενα radio button
        let input = document.createElement('input');
        input.classList.add('radio');
        input.setAttribute("type", "radio");
        input.setAttribute("id", date);
        input.value = date;
        div.appendChild(input);
        // ενα label
        let label = document.createElement('label');
        label.setAttribute("for", date);
        label.innerHTML = date;
        div.appendChild(label);
   
        for (role in play.roles) {
            let divRole = document.createElement('div');
            divRole.classList.add('role');
            divRole.innerHTML = role + ": ";
            div.appendChild(divRole);
            let span = document.createElement('span');
            span.classList.add('actor');
            divRole.appendChild(span);
            // console.log(role);  //return strings with the names of roles    
            let actors = play.roles[role];
            //  console.log(actors);   // return object of actors
            for (actor in actors) {
                let exist = actors[actor].some(arrVal => date === arrVal);
                console.log(exist);
                if (exist) {
                    span.innerHTML = actor;
                }
            }

        }
        wrapper.appendChild(div);
        // console.log(wrapper);   
    });


}

userSelection();


