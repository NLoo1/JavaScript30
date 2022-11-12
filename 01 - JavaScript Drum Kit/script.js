function playSound(e){
    window.addEventListener('keydown', function(e){
    // gets key selected, attempts to match to data key
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);

    // Gets key selected, attempts to match to the corresponding div/class = .key
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    if(!audio) return; //Stops function from running if audio key not found
    audio.currentTime = 0;
    audio.play(); // By itself, will not allow repeats until current clip is done
    
    // Adds a class to the key: playing
    key.classList.add('playing');

  });
  }

    function removeTransition(e){
      if(e.propertyName !== 'transform') // return;
      this.classList.remove('playing');
    }


    // Selects ALL keys
    const keys = document.querySelectorAll('.key');

    // See removeTransition()
    keys.forEach(key => key.addEventListener('transitionend', removeTransition))

    window.addEventListener('keydown', playSound);  