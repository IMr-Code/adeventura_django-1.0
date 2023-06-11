window.addEventListener('load', main);

function main(){

const canvas = document.getElementById('canvas'); 
canvas.width = 1070; 
canvas.height = 600;
canvas.style.display = 'block';
canvas.style.margin = '0 auto';


let img = new Image();
img.src = './boy.png';
let spriteWidth = 1024/8, spriteHeight = 489/3;

const ctx = canvas.getContext('2d');
const gravidade = 0.5;

let frameX = 0;
let frameY = 0;


class Player{
    constructor(position){
       
        this.position = position;
        this.largura = 70;
        this.algura =  70;
        this.velocidade = { x: 0, y: 5.9}; 
        this.framesX = [0,2,3,4,5,6,7,8];
        this.framesY = [0,2,3];
    }
    movimento(){
        
        this.position.x += this.velocidade.x;

    }

    gravidade(){
        this.position.y += this.velocidade.y;
        if(this.position.y + this.largura >= canvas.height - 50){
            
            this.velocidade.y = 0;
            key_pressed = true;
        }
        else{

             this.velocidade.y += gravidade;
        }    
  }
    desenhar(){
    
        ctx.drawImage(img,spriteWidth * this.framesX[frameX], spriteHeight * this.framesY[frameY], spriteWidth,spriteHeight,this.position.x,this.position.y,this.largura,this.algura);

    }
    update(){
        this.gravidade();

    }
}

let teclas = {
    ArrowLeft:{
        pressed: false,
    },
    ArrowRight:{
        pressed: false,
    },
       ArrowUp:{
        pressed: false,
    },
    ArrowDown:{
        pressed: false,
    }

};

function fundo(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvas.width, canvas.height);
}

let img_arena = new Image();
img_arena.src = 'bg.png';

function arena(){

    ctx.drawImage(img_arena,0,0,928,793,0,0,canvas.width, canvas.height);
}

const player = new Player({

    x: 100,
    y: 0,

});

let gameFrame = 0;
let startFrame = 4;

function loop(){

    fundo();
    arena();
    player.desenhar();
    player.update();

    console.log(player.velocidade.x);

    if(teclas.ArrowLeft.pressed){ 
       
        player.position.x -= player.velocidade.x;
    }
    else if(teclas.ArrowRight.pressed){
        player.velocidade.x = 3;
        player.position.x += player.velocidade.x;
    

        if(gameFrame % startFrame == 0){
        if(frameX < 6){         
            frameX++;
            console.log('frameX: ',frameX);

         }else{  frameX = 1; console.log('frameX: ',frameX)};          
    }
    gameFrame++;
}
    window.requestAnimationFrame(loop);
}

loop();

let key_pressed = true;

window.addEventListener('keydown',(event)=>{

    switch(event.key){

        case 'ArrowLeft':
        teclas.ArrowLeft.pressed = true;
        break;
        case 'ArrowRight':
            teclas.ArrowRight.pressed = true;
            console.log(player.position.x);
          

            break;
            case ' ':
                if(key_pressed){
                player.velocidade.y = -10.5;
                key_pressed = false;
                }
                else{
                    return;
                }
                break;
    }

});

window.addEventListener('keyup',(event)=>{
    

    switch(event.key){

        case 'ArrowLeft':
           teclas.ArrowLeft.pressed = false;
           break;
           case 'ArrowRight':
            teclas.ArrowRight.pressed = false;
            break;
       }
   });
};
