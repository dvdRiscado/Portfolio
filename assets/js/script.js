let divProjetos = document.querySelector('.filterable-cards');
let divProjDestaque = document.querySelector('.proj-destaque');

var armProjetos;

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e){
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior : "smooth"
        });
    });
});

fetch("./assets/js/projetos.json").then((response) => {
    response.json().then((objProjetos) => {

        objProjetos.projetos.map((projeto) => {
            divProjetos.innerHTML +=
                `<div class="card" style="background-color: ${projeto.background};">
                    <div class="card-body" onclick="abrirProjeto(${projeto.id});">
                        <img src="${projeto.media[0][0]}" alt="${projeto.media[0][1]}" class="card-img-top">
                        <div class="card-text">
                            <p class="h6">${projeto.topico[0]}</p>
                            <p class="p text-center">${projeto.nome}</p>
                        </div>
                    </div>
                </div>`
        });

        armProjetos = objProjetos;
        console.log(armProjetos);
    });
});

function abrirProjeto(id) {
    var projeto = armProjetos["projetos"][id];
    console.log(projeto);

    var addHTML = 
        `<div class="destaque row" style="background-color: ${projeto["background"]};">`;

    if (projeto["media"].length > 1) {
        addHTML = `
            <div id="carouselExample" class="col carousel carousel-dark slide">
                <div class="carousel-inner">`;

            for (let i = 0; i < projeto["media"].length; i++) {
                addHTML += `
                    <div class="carousel-item">
                        <img src="${projeto["media"][i][0]}" alt="${projeto["media"][i][1]}" class="img-fluid rounded-start w-100">
                        <figcaption>${projeto["media"][i][1]}</figcaption>
                    </div>`;
            };

        addHTML += `
                </div>
                <button class="carousel-control-prev" data-bs-target="#carouselExample" type="button" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>                                        
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>`;
    } else {
        addHTML += `
            <div class="col">
                <img src="${projeto["media"][0][0]}" alt="${projeto["media"][0][1]}" class="img-fluid rounded-start w-100">
            </div>`;
    };

    addHTML += `
            <div class="col">
                <div class="card-body">
                    <div class="cima">
                        <div class="card-text nome-projeto">
                            <p class="h6">Nome:</p>
                            <p class="printitulo p">${projeto["nome"]}</p>
                        </div>
                        <div class="card-text descricao-projeto">
                            <p class="h6">Descrição:</p>`;

    for (let i = 0; i < projeto["descricao"].length; i++) {
        addHTML += `
                            <p class="p">${projeto["descricao"][i]}</p>`;
    };

    addHTML += `
                        </div>`;

    if (projeto["link"].length > 0) {
        addHTML += `
                        <div class="card-text links-projeto">
                            <p class="h6">Links:</p>`;

        for (let i = 0; i < projeto["link"].length; i++) {
            addHTML += `
                            <a href="${projeto["link"][i][0]}">${projeto["link"][i][1]}</a>`;
        }
        addHTML += `</div>`;
    }

    addHTML += `
                </div>
                    
                    <div class="baixo">
                        <div class="card-text">
                            <div class="col-6 ferramentas-projeto">
                                <p class="h6">Ferramentas:</p>`;
    
    for (let i = 0; i < projeto["ferramenta"].length; i++) {
        addHTML += `
                                <p class="p">${projeto["ferramenta"][i]}</p>`;
    }

    addHTML += `
                            </div>`;

    if (projeto["instituicao"].length > 0) {
        addHTML += `
                            <div class="col-6 instituicao-projeto">
                                <p class="h6">Instituição:</p>`;
        for (let i = 0; i < projeto["instituicao"].length; i++) {
            addHTML += `
                                <p class="p">${projeto["instituicao"][i]}</p>`;
        }
    }

    addHTML += `
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    divProjDestaque.innerHTML = addHTML;
    console.log(addHTML);
};

function filtrarProjetos(filtro) {

    divProjetos.innerHTML = ``;

    // document.querySelector(".active").classList.remove("active");

    
    for (let id = 0; id < armProjetos["projetos"].length; id++) {
        var projeto = armProjetos["projetos"][id];

        if (projeto["topico"][0] == filtro || filtro == "Todos") {

            divProjetos.innerHTML +=
                `<div class="card" style="background-color: ${projeto.background};">
                    <div class="card-body" onclick="abrirProjeto(${projeto.id});">
                        <img src="${projeto.media[0][0]}" alt="${projeto.media[0][1]}" class="card-img-top">
                        <div class="card-text">
                            <p class="h6">${projeto.topico[0]}</p>
                            <p class="p text-center">${projeto.nome}</p>
                        </div>
                    </div>
                </div>`
        };
    };
};