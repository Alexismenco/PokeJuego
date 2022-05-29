var container = document.querySelector('.container');
var img = document.querySelector('img');
var h1 = document.querySelector('h1');
var input = document.querySelector("input");
var btn = document.querySelector("#btn");
var reiniciar = document.querySelector("#btnr");
var imgEvent = [];
var puntos = 0;
var ganar= 0;

// Primera parte
async function pedirPokemon(nombre){
    let res = await fetch("https://pokeapi.co/api/v2/pokemon/"+nombre);
    let data = await res.json();
    img.setAttribute("src", data.sprites.front_default);
    h1.innerText= data.forms[0].name;
};
pedirPokemon(25);

var input = document.querySelector("input");
var btn = document.querySelector("#btn");
input.addEventListener("keyup", function(e){
    if(e.key == "Enter"){
        pedirPokemon(input.value);
    input.value ='';
    };
});

btn.addEventListener("click", function(e){
    pedirPokemon(input.value);
    input.value ='';
});

// Segunda parte
function pokemon(){
    var pokemon = Math.floor(Math.random()*899);
    return pokemon;
};

function cartas(){
    var cartas = [];
    cartas.push(pokemon());
    cartas.push(pokemon());
    cartas.push(pokemon());
    cartas.push(pokemon());
    cartas.push(pokemon());
    cartas.push(pokemon());
    cartas.push(pokemon());
    cartas.push(pokemon());
    cartas.push(pokemon());
    cartas.push(pokemon());
    cartas.push(pokemon());
    cartas.push(pokemon());
    cartas.push(pokemon());
    cartas.push(pokemon());
    cartas.push(pokemon());
    cartas.push(pokemon());
    cartas.push(pokemon());
    cartas.push(pokemon());
    cartas.push(pokemon());
    cartas.push(pokemon());
    
    recorrerCartas(cartas);
}

function recorrerCartas(cartt){
    
    let carta1 = cartt;
    let carta2 = carta1.sort()
    
    for(i=0 ; i < cartt.length; i++){
        pedirPoke(cartt[i]);
        pedirPoke(carta2.reverse()[i]);
    };
    console.log(cartt)
    console.log(carta2)
};
cartas()

async function pedirPoke(numero){
    let res = await fetch("https://pokeapi.co/api/v2/pokemon/"+numero); 
    let data = await res.json();

    let img = document.createElement("img");
    img.className="pokemon";
    let direccionImagen =  '../img/carta.jpg';
    img.setAttribute("src",direccionImagen);
    img.addEventListener("click", function(e){
        if(imgEvent.length < 2){
            img.setAttribute("src",data.sprites.front_default);
            let w = img;
            imgEvent.push(w);
            if (imgEvent.length == 2){
                if (imgEvent[0].src === imgEvent[1].src){
                    e.target;
                    imgEvent = [];
                    puntos +=1;
                    ganar ++;
                    document.querySelector('#puntos').innerText='Intentos: '+puntos;
                    if(ganar == 20){
                        document.querySelector("#ganar").innerText="¡EXELENTE!";
                    }
                } else {
                    puntos+=1;
                    document.querySelector('#puntos').innerText='Intentos: '+puntos;
                    setTimeout(function(){
                        imgEvent[0].setAttribute("src",direccionImagen);
                        imgEvent[1].setAttribute("src",direccionImagen);
                        imgEvent = [];
                    }, 1200);
                };
            };
        };
    });

    let divP = document.createElement("div");
        divP.style.display='inline';
    let div = document.createElement("div");
    div.className='card';
    div.style.width='max-content';
    div.appendChild(img);
    divP.appendChild(div);
    container.appendChild(divP);
    
    reiniciar.addEventListener('click', function(){
        if(puntos>0){
            container.innerHTML='';
            puntos=0;
            ganar=0;
            document.querySelector('#puntos').innerText='Intentos: '+puntos;
            document.querySelector("#ganar").innerText="";
            cartas();
        };
    });
};





