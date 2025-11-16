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
    link.href = "themes/article/" + theme + ".css";
    document.head.appendChild(link);
}

var themesNumber = document.querySelectorAll('input[name="theme"]').length;
var randomTheme = Math.floor(Math.random() * themesNumber);

document.querySelectorAll('input[name="theme"]')[randomTheme].checked = true;
changeTheme();