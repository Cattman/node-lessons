fetch('menu.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#replace_with_navbar");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem,oldelem);
})

function ToggleMenuOrientation(toggleButton){
    let listItems = document.getElementsByTagName("li");
    for (let i=0; i<listItems.length; i++){
        listItems[i].style.float = toggleButton.checked ? "none" : "left";
    }
}

function Dropdown(){
    let dropdown = document.getElementsByClassName("dropdown");
    for (let i=0; i<dropdown.length; i++){
        dropdown[i].style.display = "none";
    }
}