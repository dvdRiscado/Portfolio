let divProjetos = document.querySelector('.filterable-cards');

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
        console.log(objProjetos);

        objProjetos.projetos.map((projeto) => {
            divProjetos.innerHTML +=
                `<div class="card" style="background-color: ${projeto.background};">
                    <div class="card-body">
                        <img src="${projeto.imagens[0]}" alt="${projeto.imagens[1]}" class="card-img-top">
                        <div class="card-text">
                            <p class="h6">${projeto.topicos[0]}</p>
                            <p class="p text-center">${projeto.nome}</p>
                        </div>
                    </div>
                </div>`
        });
    });
});