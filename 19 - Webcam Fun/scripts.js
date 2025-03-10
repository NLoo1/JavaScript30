const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {

            video.srcObject = localMediaStream;
            video.play();   
        })
        .catch(err =>{
            console.log(err);
        })
}

function paintToCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(()=> {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);

        // pixels = rgbSplit(pixels);
        // ctx.globalAlpha = 0.8;
        // pixels = redEffect(pixels);

        pixels = greenScreen(pixels);
        ctx.putImageData(pixels, 0,0);
        
        
    }, 16);
}

function takePhoto(){
    snap.currentTime = 0;
    snap.play();

    // get data
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    // link.textContent = 'Download Image';
    link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
    strip.insertBefore(link, strip.firstChild);

}

function redEffect(pixels){
    for(let i = 0; i < pixels.data.length; i+=4){
        pixels[i] = pixels[i] + 200; // red
        pixels[i + 1] = pixels[i + 1] - 50; // green
        pixels[i + 2] = pixels[i + 2]  * 0.5 // blue
    }
}

function rgbSplit(pixels){
    for(let i = 0; i < pixels.data.length; i+=4){
        pixels[i - 150] = pixels[i]; // red
        pixels[i + 500] = pixels[i + 1]; // green
        pixels[i - 550] = pixels[i + 2] // blue
    }
}

function greenScreen(pixels){
    const levels = {};

    [...document.querySelectorAll('.rgb input')].forEach((input) => {
        levels[input.name] = input.ariaValueMax;
    });

    for(i = 0; i < pixels.data.length; i +=4){
        red = pixels.data[i +0];
        green = pixels.data[i +1];
        blue = pixels.data[i +2];
        alpha = pixels.data[i +3];

        if(red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmind
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax
            
            
            ){
                pixels.data[i + 3] = 0;
            }
    }

}

getVideo();

video.addEventListener('canplay', paintToCanvas);