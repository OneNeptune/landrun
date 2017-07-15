export const turn = new Audio('./assets/sounds/NFF-spit.wav');
export const collision = new Audio('./assets/sounds/NFF-low-wave.wav');
export const track = new Audio('./assets/sounds/Rhinoceros.mp3');
export const tailComplete = new Audio('./assets/sounds/NFF-money.wav');
export const explode = new Audio('./assets/sounds/NFF-magic-exploding.wav');


turn.volume = 0.25;
collision.volume = 0.50;
track.volume = 0.25;
tailComplete.volume = 0.15;
explode.volume = 0.25;

track.loop = true;
