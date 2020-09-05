var canvas , car , carIMG ; 
var play , tutorial , back ,left , right , leftIMG , rightIMG , playIMG , tutorialIMG , backIMG ;
var gameState=0
var bg1 , road , roadIMG ;
var rand ;
var npc,npcGroup,bg ;

function preload() {
  roadIMG = loadImage('images/track.png');
  carIMG = loadImage('images/ezgif.com-crop (1).png');
  leftIMG = loadImage('images/ezgif.com-rotate.png');
  rightIMG = loadImage('images/ezgif.com-rotate (1).png');
  playIMG = loadImage('images/play.png');
  tutorialIMG = loadImage('images/tutorial.png');
  backIMG = loadImage('images/back.png');
  npc1 = loadImage('images/ezgif.com-crop.png');
  npc2 = loadImage('images/ezgif.com-crop (1) (1).png');
  npc3 = loadImage('images/ezgif.com-crop (2).png');
  npc4 = loadImage('images/ezgif.com-crop (3).png');
  npc5 = loadImage('images/ezgif.com-crop (4).png');
  npc6 = loadImage('images/ezgif.com-crop (5).png');
  npc7 = loadImage('images/ezgif.com-gif-maker.png');
  bg = loadImage('images/bg.jpg');
}
function setup(){
  canvas = createCanvas(windowWidth-30,windowHeight-30);

  road = createSprite(700,800);
  road.velocityY = 5 ;
  road.addImage(roadIMG);
  road.scale = 1.5; 
  road.visible = false;

  play = createSprite(700,565,60,20);
  play.addImage(playIMG);
  play.scale = 1; 

  tutorial = createSprite(500,570,60,20);
  tutorial.addImage(tutorialIMG);
  tutorial.scale = 1; 

  back = createSprite(600,400,60,20);
  back.addImage(backIMG);
  back.scale = 0.2; 
  back.visible = false;

  left= createSprite(1100,490,60,20);
  left.addImage(leftIMG);
  left.scale = 0.5; 
  left.visible = false;

  right= createSprite(1200,490,60,20);
  right.addImage(rightIMG);
  right.scale = 0.5; 
  right.visible = false;

  car= createSprite(600,500,60,20);
  car.addImage(carIMG);
  car.visible = false;
  
  npcGroup=createGroup();
 
  //roadIMG="white";

}

function draw(){
  background(bg);

if (mousePressedOver(tutorial)) {
  play.visible = false;
  tutorial.visible = false;
  fill("red");
  back.visible=true;
  back.shapeColor = "red";
  gameState = 1;
}
if(gameState===1){
  fill("yellow");
  textSize(20);
  text("PRESS THE ARROW KEYS TO MOVE THE CAR SO THAT THE CAR DOES NOT TOUCHES THE OTHER CAR",50,200);
}

if (mousePressedOver(back)) {
  gameState=3;
  play.visible = true;
  tutorial.visible = true;
  back.visible = false;
}

if (mousePressedOver(play)) {
  road.visible = true;
  tutorial.visible = false;
  play.visible = false;
  left.visible = true;
  right.visible = true;
  car.visible = true;
  gameState = 2;
}

reset()
if (car.x < 300) {
  car.x = 300 ;
}
if (car.x > 1107) {
  car.x = 1107 ;
}

if (gameState === 2) {
  controls(); 
  NPC() 
}

  drawSprites();
  text("X:"+mouseX+"Y:"+mouseY,mouseX,mouseY);
}

function controls() {
  if (mousePressedOver(left)) {
    car.x = car.x - 10;
  } 
  if (mousePressedOver(right)) {
    car.x = car.x + 10;
  } 
}

function reset() {
  if (road.y > 500) {
    road.y = road.height/2 ;
  }
}

function NPC() {
  if (frameCount%50===0) {
    npc = createSprite(random(300,1107),50);
    npc.velocityY = 5 ;
    rand = Math.round(random(1,6))
    switch(rand){
      case 1 : npc.addImage(npc1);
      break ;
      case 2 : npc.addImage(npc2);
      break ;
      case 3 : npc.addImage(npc3);
      break ;
      case 4 : npc.addImage(npc4);
      break ;
      case 5 : npc.addImage(npc5);
      break ;
      case 6 : npc.addImage(npc6);
      break ;
      default: break ;
    }
    npc.lifetime = 150 ;
    npcGroup.add(npc);
    ending()
  }
}

function ending() {
  if (npcGroup.isTouching(car)) {
    gameState=3
  }
  
  if (gameState===3) {
    npcGroup.setVelocityYEach(0) ;
    road.visible = false ;
    road.velocityY = 0 ;
    left.visible = false;
    right.visible = false;
    npcGroup.setLifetimeEach(-1) ;
  }
}