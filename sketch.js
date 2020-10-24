var PLAY = 1;
var END = 0;
var gameState = 1;

var score = 0;
var fruitGroup, enemyGroup
var gameOverImage;
var gameOverSound;
var monster,monsterImage
var sword,swordImage;
var knifeSwooshSound;

function preload(){
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png");
  gameOverImage =loadImage("gameover.png");
  fruit1 =loadImage("fruit1.png");
  fruit2 =loadImage("fruit2.png");
  fruit3 =loadImage("fruit3.png");
  fruit4 =loadImage("fruit4.png");
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
}

function setup() {
  createCanvas(600,600);
  
  fruitGroup=new Group();
  enemyGroup=new Group();
  //creating sword
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.7
}

function draw(){
  background("220");
  colorMode(HSB);
  fill(255, 204, 100);
  textSize(32);
  text("Score:  " + score,450,30);
  fruits();
  Enemy();
  
   if(gameState === PLAY){
  sword.y=mouseY;
  sword.x=mouseX;
     
     if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
       
    knifeSwooshSound.play();   
    score=score+ 2;
  }
     if(enemyGroup.isTouching(sword)){
   gameState=END
    
    //gameover sound   
    gameOverSound.play();
    fruitGroup.destroyEach();
    enemyGroup.destroyEach(); 
    sword.addImage(gameOverImage);
    sword.x=200;
    sword.y=200;   
    score=score- 2;
  }
    
   }
  
  drawSprites();
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
  fruit=createSprite(400,200,20,20);
  
    if(position==1)
    {
      fruit.x=400;
      fruit.velocityX=-(7+(score/4));
    }
  else
    {
      if (position==2){
        fruit.x=0;
        
        //increase the velocity of fruit after score 4 or 10
        fruit.velocityX=(7+(score/4));
      }
    }
    fruit.scale=0.2;
    //fruit.debug=true;
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(fruit1);
    }else if (r == 2){
      fruit.addImage(fruit2);
    }else if (r==3){
      fruit.addImage(fruit3);
    }else {
      fruit.addImage(fruit4);
    }
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
  }
}
function Enemy(){
  if(World.frameCount%200==0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}