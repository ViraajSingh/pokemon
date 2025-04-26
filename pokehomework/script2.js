$(document).ready(function () {

    const favoritePokemon = [
        "gengar",
        "charizard",
        "bulbasaur",
        "lucario",
        "eevee",
        "snorlax",
        "dragonite",
        "pikachu",
        "mewtwo",
        "scizor"
    ];

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

    const display = document.getElementById("poke-list");

    favoritePokemon.forEach(name => {
        const li = document.createElement("li");
        li.textContent = name;
        display.appendChild(li);

        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(pokemonData => {
                Cards(pokemonData);
            })
            .catch(error => {
                console.error('Error fetching pokemon details:', error);
            });
    });
});
