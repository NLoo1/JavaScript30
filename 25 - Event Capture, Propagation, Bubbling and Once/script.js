const divs = document.querySelector('div');
const button = document.querySelector('button');

function logText(e){

    // Stops bubbling
    e.stopPropagation();

    // Will return ALL divs
    // console.log(this.classList.value);
}

// If you click on innermost div, console returns it and then parents

divs.forEach(div => div.addEventListener('click', logText, {
    capture: true, // Will run function on way DOWN rather than UP. Default F
    once: true // Unbind or remove event listener
}))