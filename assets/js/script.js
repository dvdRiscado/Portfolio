document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e){
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior : "smooth"
        });
    });
});

var form = document.querySelector('.form');
var txtretorno = document.querySelector('.txtretorno'); 

form.addEventListener("submit", event => {
    // event.preventDefault();

    txtretorno.style.display = "block";
})