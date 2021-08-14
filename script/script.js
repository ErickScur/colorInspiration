import lockEvent from './lock-event.js'
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


//! Show Icons When Mouse Hover
const colors = document.querySelectorAll('.color');
colors.forEach( (color) => {
    color.history =['#FFFFFF'];
    color.isLocked = false;
    color.addEventListener('mouseover', ()=>{
        color.querySelector('.undo').style.opacity = 1;
        color.querySelector('.lock').style.opacity = 1;
    });
    color.addEventListener('mouseleave', ()=>{
        color.querySelector('.undo').style.opacity = 0;
        if(color.querySelector('.lock').isClicked==false){
            color.querySelector('.lock').style.opacity = 0;
        }
    });
})

//! Event Listener for lock buttons
const locks = document.querySelectorAll('.lock');
locks.forEach((lock)=>{
    lock.isClicked = false;
    lock.addEventListener('click', (event)=> {
        lockEvent(event,lock)
    });
})

function randomColor(color){
    let letters = '0123456789ABCDEF';
    let newColor = '#';
    for (var i = 0; i < 6; i++) {
        newColor += letters[Math.floor(Math.random() * 16)];
    }
    color.history.push(newColor)
    color.style.backgroundColor = newColor;
    let colorName = color.querySelector('.color-name');
    colorName.innerHTML = newColor;
}

//! Call the change color function if it isn't locked
function changeColors(colors){
    colors.forEach((color)=>{
        if(!color.isLocked){
            randomColor(color);
        }
    })
}
changeColors(colors);//* Initial Color Change

//! Go back one color
function backColor(color){
    let index = (color.history.length)-2;
    if(index>-1){
        color.style.backgroundColor = color.history[index];
        let colorName = color.querySelector('.color-name');
        colorName.innerHTML =color.history[index];
        color.history.pop();
    }
}

//!Undo Buttons Event
const undoButtons = document.querySelectorAll('.undo');
undoButtons.forEach((undobtn)=> {
    undobtn.addEventListener('click', ()=>{
        let color = undobtn.parentNode
        backColor(color)
    })
})

//!Keypress event
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
    if(event.key == "ArrowRight"){
        changeColors(colors)
    }
})
