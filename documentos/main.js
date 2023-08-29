const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3&breed_ids=beng&api_key=live_nwsApJ3OEyQYFoawz6kLo5nywRWPi3SpDzAosM1gM0FSPGJuAMmHuFuhXHZYNeni';
const API_KEY_FAVORITES = 'https://api.thecatapi.com/v1/favourites?limit=40';
const API_KEY_FAVORITES_DELETE =(id) => `https://api.thecatapi.com/v1/favourites/${id}?limit=40`;
const spanError = document.getElementById('error');
const posts = document.getElementsByClassName('posteos');
const img1 = document.getElementById('img1');


async function generarPosts() {
    const response = await fetch(API_URL_RANDOM);
    const data = await response.json();
    console.log('gatos aleatorios');
    console.log(data);

    const postsContainer = document.getElementById('postsContainer');

    data.forEach(post => {
        const postHTML = `
        <div class="row posteos">
            
            <div class="col mt-2 p-0">
                <div class="container-img-user">
                    <img class="img-fluid img-user" src="${post.url}" alt="foto de perfil">
                </div>
            </div>
            <div class="col-11 mt-2 ">
                <div class="row-1">
                    <div class="name-user">
                        <p class="fw-bold">${post.breeds[0].name}</p>
                        <span class="text-muted arroba-user"> @${post.breeds[0].name} </span>
                        ·
                        <p class="text-muted hora">16h</p>
                    </div>
                </div>
                <div class="row-1">
                    ${post.breeds[0].description}
                </div>
                <div class="row posteos-img">
                    <img style="width: 300px;" class="img-fluid" src="${post.url}">
                </div>
                <div class="row-2 container-statistics">
                    <div><img src="./src/chat.svg" alt="comentarios"> 269</div>
                    <div><img src="./src/repeat.svg" alt="repost"> 865</div>
                    <div><img src="./src/suit-heart.svg" alt="Me gusta"> 45,7 mil</div>
                    <div><img src="./src/bar-chart-line.svg" alt="Ver"> 1,6 M</div>
                    <div><img src="./src/save2.svg" alt="Guardar" onclick="guardarGatitosFavoritos('${post.id}')"></div>
                    <div><img src="./src/upload.svg" alt="Compartir"> </div>
                </div>
            </div>
        </div>
        `;
        postsContainer.innerHTML += postHTML;
        console.log("id",post.id);
    });
}


//cargar gatos favoritos
async function cargarGatosFavoritos() {
    const res = await fetch(API_KEY_FAVORITES, { //fecht por defecto usa metodo get
        method: 'GET',
        headers: {
            'x-api-key': 'live_7FRL9HsULdTLTNfcdUTkH8WgTsHfOJPNoMziJMAcao5d9hLmIoRlmeVgdkHHflOV',
        },
    });

    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        const section = document.getElementById('gatosFavoritos');
        section.innerHTML = ""; // Limpiar el contenido existente

        const h2 = document.createElement('h2');
        h2.textContent = 'Gatos favoritos';
        section.appendChild(h2);

        data.forEach(gato => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            img.src = gato.image.url;
            img.width = 150;

            const btn = document.createElement('button');
            btn.textContent = 'Eliminar de favoritos';
            btn.onclick = () => eliminarGatitosFavorito(gato.id);

            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
            console.log("gato.id",gato.id);
        });
    }
}

async function guardarGatitosFavoritos(id){
    console.log("guardar id", id);
    const res = await fetch(API_KEY_FAVORITES,
        {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                'x-api-key': 'live_nwsApJ3OEyQYFoawz6kLo5nywRWPi3SpDzAosM1gM0FSPGJuAMmHuFuhXHZYNeni',
            },
            body: JSON.stringify ({
                image_id: id,
            })

        } ); 
        const data = await res.json();
        if(res.status !== 200 ){
            spanError.innerHTML= "Hubo un error: "+res.status;
        }else{
            console.log('Guardado');
            cargarGatosFavoritos();
        }
        console.log(res);
        console.log(data);
        
}


async function eliminarGatitosFavorito(id) {
    const res = await fetch(API_KEY_FAVORITES_DELETE(id), {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            'x-api-key': 'live_nwsApJ3OEyQYFoawz6kLo5nywRWPi3SpDzAosM1gM0FSPGJuAMmHuFuhXHZYNeni',
        },
    });

    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status;
    } else {
        console.log('Eliminado');
        cargarGatosFavoritos();
    }
}

generarPosts();
cargarGatosFavoritos();