var list = document.getElementById("toggle");
var btn = document.getElementById("btn");
function toggle() {
    if (list.style.display != "none") {
        list.style.display = "none";
        btn.style.display = "block";
    }
    else {
        list.style.display = "block";
        btn.style.display = "none";
    }
}
