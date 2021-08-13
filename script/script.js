const navbar = document.getElementById("sidebar");
const navToggler = document.getElementById("navbar-toggler");

let isToggled = false
let id = null;
function toggleNav() {
    if(isToggled){
        let pos= 0;
        clearInterval(id);
        id = setInterval(animate, 4);
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
        id = setInterval(animate, 4);
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
navToggler.addEventListener('click',toggleNav)