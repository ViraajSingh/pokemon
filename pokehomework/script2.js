$(document).ready(function () {
    function clearOutput() {//a way to make sure that there is othign in the output div in the html when we call this fuctio 
        document.getElementById("output").innerHTML = "";
    }

    // this i s how we woudl get the ccertai data by usig the fetch with the certia amme of tthe poke o i order to do this 
    function Cards(data) {
        const output = document.getElementById("output");
        output.innerHTML += `
            <div class="card">
                <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p>Abilities: ${data.abilities[0].ability.name}</p>
                <p>Types: ${data.types[0].type.name}</p>
                <p>Base Experience: ${data.base_experience}</p>
            </div>`;
    }

    //how we do the seach function 
    $("#search-button").click(function () {
        const query = document.getElementById("search-input").value.toLowerCase();//makign sure that name of the pokem which we get is lowwercase sice we imbed it into the url for the apu 
        if (!query) return;//numbers or empty string will not work

        clearOutput();//make sure that after we store the name we clear it 

        fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)//fid the data of the certia ame of the pokemo that we just got 
            .then(response => {
                if (!response.ok) {
                    throw new Error("Pokémon not found.");//this is if the repose messed up then we knwo they put in smt that was not a pokemon 
                }
                return response.json();//makign sure to retunr the repionse in case 
            })
            .then(pokemonData => {
                Cards(pokemonData);//getting the data of that certian pokemon 
            })
            .catch(error => {
                $("#output").html(`<p">${error.message}</p>`);//displayign the messsage if we do go wrog 
            });
    });

    // Enter key triggers search
    $("#search-input").on("keypress", function (e) {//this is dong the same function as the click but with the key down o the enter key 
        if (e.which === 13) {
            $("#search-button").click();
        }
    });

    // this will display a certian 1 istead oif the first 10 i the other page 
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

    const display = document.getElementById("poke-list");//display the ames of the pokemon 

    favoritePokemon.forEach(name => {//this is how we owudl get the name then put it to an li and then from tehr we woudl put the li in the pooutput 
        const li = document.createElement("li");
        li.textContent = name;
        display.appendChild(li);

        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)//doing the cards for the na,ees in the favorite pokemon 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(pokemonData => {
                Cards(pokemonData);//this will just get the data for that pokemon in the array 
            })
            .catch(error => {
                console.error('Error fetching Pokémon details:', error);
            });
    });
});
