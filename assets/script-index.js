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

var articles = document.querySelectorAll("main a");
var dates = ["2025-11-10", "2025-11-17", "2025-11-24", "2025-12-01", "2025-12-08", "2025-12-15", "2026-01-05", "2026-01-12", "Tout"];

document.querySelector('input[name="date"]').addEventListener('input', (event) => {
    var value = event.target.value;
    var currentDate = dates[value];
    document.querySelector('#date label').innerText = currentDate;

    if (value == dates.length - 1) {
        articles.forEach((article) => {
            article.style.display = "block";
        });
    } else {
        var nextDate = dates[Number(value)+1];
        var thresholdMin = new Date(currentDate);
        var thresholdMax = new Date(nextDate);

        articles.forEach((article) => {
            var articleDate = new Date(article.getAttribute('data-date'));
            if (articleDate >= thresholdMin && articleDate < thresholdMax){
                article.style.display = "block";
            } else {
                article.style.display = "none";
            }
        });
    }
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