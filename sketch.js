var gameState = 1;
var PLAY= 1;
var END = 0;
var barricade;

var road, roadImage; 
var diamondImage, cashImage,jwellImage;
var treasure;

var trap;
var trap1, trap2;

var player, playerAnime, player_stop;
var event;
var ran;

var trapGroup, treasureGroup;
var gameoverImg,gameOver;
var restartImg, restart;


var score = 0;

function preload(){
  roadImage = loadImage("Road.png");
  diamondImage = loadImage("diamonds.png");
  cashImage = loadImage("cash.png"); 
  jwellImages = loadImage("jwell.png");
  playerAnime = loadAnimation("Runner1.png","Runner2.png");
  trap1 =  loadImage("trap1.png"); 
  trap2 = loadImage("trap2.png");
  player_stop = loadImage("Runner1.png");
  gameoverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}



function setup(){
  
  createCanvas(windowWidth,windowHeight);

    road = createSprite(width/2,width,10,10);
    road.addImage("road", roadImage);
    road.velocityY =6;
  
  
    barricade = createSprite(width/2,height-110,width,10)
    barricade.visible = false;
    player= createSprite(width/2,height-100,10,10);
    player.addAnimation("anime",playerAnime);
    player.addAnimation("anime2",player_stop);
    player.scale  = 0.075;
    player.velocityY = 0;
  player.collide(barricade);
    
    gameOver = createSprite(width/2,height/2-50,10,10);
    gameOver.addAnimation("gameover",gameoverImg);
  
    restart = createSprite(width/2,height/2+30,10,10);
    restart.addImage("restart",restartImg);
    restart.scale = 0.35
  

    
  trapGroup = new Group();
  treasureGroup = new Group();
  
  
  
       console.log(road.y);
}



function draw(){
  background(255);
  
  
   if (gameState == 1){
     
  Touch();
    
    player.x=World.mouseX;
     
     gameOver.visible = false;
     restart.visible = false;
     
     ran = Math.round(random(1,2));
         player.collide(barricade);
     if (World.frameCount%80==0){
       if(ran==1){
       spawnTreasures();
     }
     else if(ran==2){
     spawnTrap()}
  player.collide(trapGroup,destroy1);
         player.collide(treasureGroup,destroy2)
       
if (player.isTouching(trapGroup)){
         gameState = 0;
       }
       
       if (road.y>400){
      road.y = road.height/8;
  }
     if(treasureGroup.isTouching(player)){
       score = score+1;
       treasureGroup.destroyEach();
       
     }
       
     
     }
    
   } else if (gameState == 0){
      
     
     end();
   }
  
  
 drawSprites();
  fill(255);
  textSize(40);
  textFont("monotype corsiva");
  text("Score : "+score,width-150,40);

}

function spawnTreasures(){
  
  var r  = Math.round(random(1,3));
  ran    = Math.round(random(30,width-40));
  treasure = createSprite(ran, 0,10,10);
  treasure.velocityY = 4;
  
  treasure.lifetime = 200;
   if (r==1){
     treasure.addImage("diamonds", diamondImage); 
    treasure.scale = 0.04;
    }
  else if (r==2){
    treasure.addImage("jwellery", jwellImages);
    treasure.scale = 0.15;
    }
  else {treasure.addImage("cash",cashImage) 
    treasure.scale = 0.15;}
  treasureGroup.add(treasure);
}

function spawnTrap(){
   ran = Math.round(random(30,width-40));
  var r  = Math.round(random(1,2));
  trap = createSprite(ran,0,10,10)
  trap.velocityY = 4;
  trap.scale = 0.15;
  trap.lifetime = 200;
  
   if (r ==1){
     trap.addImage("trap1", trap1);     
   }
  else if (r ==2) {
     trap.addImage("trap2",trap2);
  }
  trapGroup.add(trap);
}




function end (){
  
   player.collide(barricade);
  restart.visible = true;
  
     treasureGroup.setLifetimeEach(-1);
     trapGroup.setLifetimeEach(-1);
     
     treasureGroup.setVelocityYEach(0);
     trapGroup.setVelocityYEach(0);
     
     
     road.velocityY= 0;
     player.velocityY =0;
     gameOver.visible = true;
     player.changeAnimation("anime2", player_stop);
  
  if(mousePressedOver(restart)){
    
    reset();
  }
   
  
  
}

function reset(){

  gameState = 1;
  
  player.changeAnimation ("anime",playerAnime);
  trapGroup.destroyEach();
  treasureGroup.destroyEach();
  road.velocityY = 6;
  score = 0;
   player.collide(barricade);
  
}

function Touch(){
  if(touches.length > 0 && player.y  >= height-120) {
   
       touches = [];
    }
}

function destroy1(player,trap){
  trap.destroy();
  gameState = 0;
}

function destroy2(player,treasure){
  treasure.destroy();
  gameState = 0;
}


