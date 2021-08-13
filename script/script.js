
//Nav Toggler
const navbar = document.getElementById("sidebar");
const navToggler = document.getElementById("navbar-toggler");

let isToggled = false
let id = null;
function toggleNav() {
    if(isToggled){
        let pos= 0;
        clearInterval(id);
        id = setInterval(animate, 2);
        function animate () {
            if(pos==-100){
                clearInterval(id);
            }else{
                pos--;
                navbar.style.transform = `translateX(${pos}%)`
            }
        }
        isToggled=false;
    }else{
        let pos= -100;
        clearInterval(id);
        id = setInterval(animate, 2);
        function animate () {
            if(pos==0){
                clearInterval(id);
            }else{
                pos++;
                navbar.style.transform = `translateX(${pos}%)`
            }
        }
        isToggled=true;
    }
}
navToggler.addEventListener('click',toggleNav);


//Color Change
const colors = document.querySelectorAll('.color');
colors.forEach( (color) => {
    color.isLocked = false;
    color.addEventListener('mouseover', ()=>{
        color.querySelector('.lock').style.opacity = 1;
    });
    color.addEventListener('mouseleave', ()=>{
        if(color.querySelector('.lock').isClicked==false){
            color.querySelector('.lock').style.opacity = 0;
        }
    });
})

const locks = document.querySelectorAll('.lock');
locks.forEach((lock)=>{
    lock.isClicked = false;
    lock.addEventListener('click', (event)=> {
        if(lock.isClicked){
            let color = event.target.parentNode.parentNode;
            color.isLocked = false;
            lock.style.color = 'rgb(68, 68, 68)'
            lock.isClicked = false
        }else{
            let color = event.target.parentNode.parentNode;
            color.isLocked = true;
            lock.style.color = 'black'
            lock.isClicked = true
            lock.style.opacity = 1;
        }
    });
})

function randomColor(color){
    let letters = '0123456789ABCDEF';
    let newColor = '#';
    for (var i = 0; i < 6; i++) {
        newColor += letters[Math.floor(Math.random() * 16)];
    }
    color.style.backgroundColor = newColor;
    let colorName = color.querySelector('.color-name');
    colorName.innerHTML = newColor;
}
function changeColors(colors){
    colors.forEach((color)=>{
        if(!color.isLocked){
            randomColor(color);
        }
    })
}
changeColors(colors);
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
    if(event.key == "ArrowRight"){
        changeColors(colors)
    }
})
