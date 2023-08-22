const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_nwsApJ3OEyQYFoawz6kLo5nywRWPi3SpDzAosM1gM0FSPGJuAMmHuFuhXHZYNeni';

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
        <div class="row posteos" id="postsContainer">
            
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
                    <div><img src="../src/chat.svg" alt="comentarios"> 269</div>
                    <div><img src="../src/repeat.svg" alt="repost"> 865</div>
                    <div><img src="../src/suit-heart.svg" alt="Me gusta"> 45,7 mil</div>
                    <div><img src="../src/bar-chart-line.svg" alt="Ver"> 1,6 M</div>
                    <div><img src="../src/upload.svg" alt="Compartir"> </div>
                </div>
            </div>
        </div>
        `;

        postsContainer.insertAdjacentHTML('beforeend', postHTML);
    });
}

generarPosts();

