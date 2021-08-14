export default function lockEvent(event,lock){
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
}

