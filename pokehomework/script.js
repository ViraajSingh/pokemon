$(document).ready(function() {

    function Cards(data) {
        const output = document.getElementById("output");
        output.innerHTML += `
            <div class="card">
                <h2>${data.name}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p>Abilities: ${data.abilities[0].ability.name}</p>
                <p>Types: ${data.types[0].type.name}</p>
                <p>Base Experience: ${data.base_experience}</p>
            </div>`;
    }

    fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
    .then(response => {
        if(!response.ok) {throw new Error('Network response was not ok' + response.statusText);}
        return response.json();
    })
    .then(data => {
        const display = document.getElementById("poke-list");
        data.results.forEach(pokemon => {
            const li = document.createElement("li");
            li.textContent = pokemon.name;
            display.appendChild(li);
            fetch(pokemon.url)
            .then(response => {
                if(!response.ok) {throw new Error('Network response was not ok' + response.statusText);}
                return response.json();
            })
            .then(pokemonData => {
                Cards(pokemonData);
            })
            .catch(error => {
                console.error('Error fetching pokemon details:', error);
            });
        });
        })
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        });


});


