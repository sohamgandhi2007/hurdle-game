var boy, boy_jumping, boy_collided;
var ground, invisibleGround, groundImage;


var cloudsGroup, cloudImage;
var HurdleGroup, hurdle1,hurdle2,hurdle3,hurdle4,hurdle5,hurdle6 ;

var score;
var restart, restartImage, gameOver, gameOverImage
var PLAY=1, END=0
  var gameState=PLAY


function preload(){
  boy_jumping = loadImage("boy.png");
  boy_collided = loadImage("boy_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
    hurdle1 = loadImage("hurdle1.png");
    hurdle2 = loadImage(" hurdle2.png");
    hurdle3= loadImage(" hurdle3.png");
    hurdle4= loadImage(" hurdle4.png");
    hurdle5= loadImage(" hurdle5.png");
    hurdle6= loadImage(" hurdle6.png");
  
  gameOverImage= loadImage("gameOver.png")
  restartImage= loadImage("restart.png")

}

function setup() {
  createCanvas(600, 200);
  
  boy=createSprite(50,180,20,50);
  boy.addImage("running", boy_jumping);
  boy.scale = 0.5;
  boy.addImage("collided", boy_collided)
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  HurdleGroup = new Group();
  
  score = 0;

  gameOver= createSprite(300,100,50,50)
  gameOver.addImage(gameOverImage)
  gameOver.visible= false;
  gameOver. scale=0.5
  
  restart= createSprite(300,140,50,50)
 restart. addImage(restartImage) 
 restart.visible= false;
  restart. scale=0.5
}

function draw() {
  background(180);

  text("Score: "+ score, 500,50);
  
  if(gameState===PLAY){
  
  
  
  
  
  score = score + Math.round(getFrameRate()/60);
  
  ground.velocityX=-(6+3*score/100)
    
  if(keyDown("space")&&trex.y>=159) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
 
  spawnClouds();
  spawnHurdles();
    
    if(HurdleGroup.isTouching(boy)){
            gameState = END;
      
          }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    boy.velocityY = 0;
    HurdleGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    boy.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    HurdleGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
     boy.collide(invisibleGround);
  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  hurdle.destroyEach();
  cloudsGroup.destroyEach();
  
  boy.changeAnimation("running",trex_running);
  
  score = 0;
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    boy.depth = boy.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnHurdles() {
  if(frameCount % 60 === 0) {
    var hurdle = createSprite(600,165,10,40);
    hurdle.velocityX = -(6+3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: hurdle.addImage(hurdle1);
              break;
      case 2:hurdle .addImage(hurdle2);
              break;
      case 3: hurdle.addImage(hurdle3);
              break;
      case 4: hurdle.addImage(hurdle4);
              break;
      case 5: hurdle.addImage(hurdle5);
              break;
      case 6: hurdle.addImage(hurdle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    hurdle.scale = 0.5;
    hurdle.lifetime = 300;
    //add each obstacle to the group
    HurdleGroup.add(hurdle);
  }
}