/* Changer le thème */
    
changeTheme = () => {
    var theme = document.querySelector('input[name="theme"]:checked').value;
    var actualTheme = document.querySelector('#theme-style');
    if (actualTheme){
        actualTheme.remove();
    }

    var link = document.createElement("link");
    link.id = "theme-style";
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = "themes/index/" + theme + ".css";
    document.head.appendChild(link);
}

var themesNumber = document.querySelectorAll('input[name="theme"]').length;
var randomTheme = Math.floor(Math.random() * themesNumber);

document.querySelectorAll('input[name="theme"]')[randomTheme].checked = true;
changeTheme();

/* Changer la date */

var dates = ["10.11", "17.11", "24.11", "01.12", "08.12", "15.12", "05.01", "12.01", "Tout"];
document.querySelector('input[name="date"]').addEventListener('input', (event) => {
    var value = event.target.value;
    document.querySelector('#date label').innerText = dates[value];
});

/* Filtrer par auteur·ice */

var selectAuthor = document.querySelector('#auteurices select');
selectAuthor.addEventListener("change", (event) => {
    var author = event.target.value;
    var articles = document.querySelectorAll("main a");
    if (author === "all") {
        articles.forEach((article) => {
            article.style.display = "block";
        });
    } else {
        articles.forEach((article) => {
            if (author === "all" || article.getAttribute('data-author') === author) {
                article.style.display = "block";
            } else {
                article.style.display = "none";
            }
        });
    }
});