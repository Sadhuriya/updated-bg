var bird, birdImage;
var  bg, bgImage;
var pillar, pillarImage;
var gameState = "START";
var score = 0;
var survivalTime = 0;
var survivaldisplay = 0;
var x1 = 0;
var x2; 
var scrollSpeed = 0;
var foodImage;
var eagleImage;
var life = 5;
var bird1, bird2,bird3,bird1Img,bird2Img,bird3Img
var birds = []
var index = 3

function preload(){
  birdImage = loadImage("bird.png");
  bgImage = loadImage("bg.jpg");
  pillarImage = loadImage("pillar.png"); 
  foodImage = loadImage("food.png");
  eagleImage = loadImage("eagle.png"); 
  bird1Img= loadImage("bird.png");
  bird2Img= loadImage("bird.png");
  bird3Img = loadImage("bird.png");

}

function setup(){
  createCanvas(1000, 600);

  x2 = width;

  bird = createSprite(50, 300, 10, 10);
  bird.addImage(birdImage);
  bird.scale = 0.1;
  bird.setCollider("circle", 0, 0, 150);

  obstacleGroup = new Group();
  foodGroup = new Group();
  eagleGroup = new Group();  

  bird1 = createSprite (500,100)
  bird1.scale = 0.05
  bird1.addImage (bird1Img)

  bird2 = createSprite (550,100)
  bird2.scale = 0.05
  bird2.addImage (bird1Img)

  bird3 = createSprite (600,100)
  bird3.scale = 0.05
  bird3.addImage (bird1Img)

  birds.push(bird3)
  birds.push(bird2)
  birds.push(bird1)

}

function draw(){
  background(0);
  
  if(gameState === "START"){
  scrollSpeed = 0;
  }

  image(bgImage, x1, 0, width + 10, height);
  image(bgImage, x2, 0, width + 10, height);
   x1 -= scrollSpeed;
   x2 -= scrollSpeed;
  if (x1 < -width){
     x1 = width;
  }
  if (x2 < -width){ 
    x2 = width;
  } 

  textSize(20);
  fill("black");
  text("Survival Time : " + survivaldisplay, 800, 100);
  text("Score : " + score, 100, 100);
  //text("life : " + life, 500, 100);

  drawSprites();

  if(keyDown("space") && gameState === "START"){
    gameState = "PLAY"
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    eagleGroup.destroyEach();
  }

  
  if( gameState === "PLAY"){
    scrollSpeed = 2 + survivaldisplay/100;

    survivalTime = survivalTime + 0.1;
    survivaldisplay = Math.round(survivalTime);

    if(survivaldisplay % 100 === 0 && survivaldisplay > 0){
      scrollSpeed = scrollSpeed + 1;
    }

    if(keyDown("UP_ARROW")){
      bird.velocityY = -5;
    }
    bird.velocityY = bird.velocityY + 0.5; 


    if(bird.isTouching(foodGroup)){
     foodGroup.destroyEach();
     score = score + 1;
    }

    if(score > 2){
    spawnEagle();
    }

    if(bird.isTouching(obstacleGroup)|| bird.y > 700 || bird.isTouching(eagleGroup)){
      life = life - 1;
      index = index -1
      birds[index].destroy();
      gameState = "START";
      bird.velocityY = 0;
      obstacleGroup.setVelocityXEach (0);
      foodGroup.setVelocityXEach (0);
      eagleGroup.setVelocityXEach (0);
      obstacleGroup.setLifetimeEach(-1);
      foodGroup.setLifetimeEach(-1);
      eagleGroup.setLifetimeEach(-1);

    }
    spawnObstacles();
    spawnFood();
    if (life <= 0 ){
      gameState = "END";
    }
  }else if(gameState === "END"){
    bird.velocityY = 0;
    scrollSpeed = 0;
//   bg.velocityX = 0;
    obstacleGroup.setVelocityXEach (0);
    obstacleGroup.destroyEach();
    textSize(50);
    fill("black");    
    text("GAME OVER", 400, 300);
    eagleGroup.setVelocityXEach(0);
    eagleGroup.destroyEach();
  }
}

function spawnObstacles(){
   if(frameCount % 200 === 0){
    var obstacle = createSprite(1000, 100, 10, 10);
    obstacle.addImage(pillarImage);
    obstacle.velocityX = -5;
    obstacle.scale = 0.5;
    obstacle.setCollider("rectangle", 0, 0, obstacle.width - 300, obstacle.height);
    var obstacle2 = createSprite(1000, 100, 10, 10);
    obstacle2.addImage(pillarImage);
    obstacle2.velocityX = -5;
    obstacle2.scale = 0.5;
    obstacle.debug = true;
    obstacle2.debug = true;
    obstacle2.setCollider("rectangle", 0, 0, obstacle2.width - 300, obstacle2.height);
    // var position = Math.round(random(1, 2));
    //   switch(position){
    //     case 1: obstacle.y = 100;
    //             obstacle2.y = 500;
    //     break;
    //     case 2: obstacle.y = 500;
    //             obstacle2.y = 100
    //     break;
    //     default: break;
    //   }
      var size = Math.round(random(1, 5));
      
      switch(size){
        case 1: obstacle.scale = 0.15;
                obstacle2.scale = 0.15;
                obstacle.y = 30;
                obstacle2.y = 570;
        break;
        case 2: obstacle.scale = 0.25;
                obstacle2.scale = 0.25;
                obstacle.y = 50;
                obstacle2.y = 550;
        break;
        case 3: obstacle.scale = 0.35;
                obstacle2.scale = 0.35;
                obstacle.y = 70;
                obstacle2.y = 530;
        break;
        case 4: obstacle.scale = 0.45;
                obstacle2.scale = 0.45;
                obstacle.y = 90;
                obstacle2.y = 510;
        break;
        case 5: obstacle.scale = 0.55;
                obstacle2.scale = 0.55;
                obstacle.y = 110;
                obstacle2.y = 490;
        break;
        default: break;
      }
      obstacle.lifetime = 250;
      obstacle2.lifetime = 250;
      obstacleGroup.add(obstacle);
      obstacleGroup.add(obstacle2);
   }
   
   
}
function spawnFood(){
  if(frameCount % 280 === 0){
    var food = createSprite(1000, 50);
    food.addImage(foodImage);
    food.y = Math.round(random(100, 500));
    food.velocityX = -5;
    food.scale = 0.1;
    foodGroup.add(food);
    food.lifetime = 250;
  }
}

function spawnEagle(){
  if(frameCount % 280 === 0){
    var eagle = createSprite(1000, 50);
    eagle.addImage(eagleImage);
    eagle.y = Math.round(random(100, 500));
    eagle.velocityX = -9;
    eagle.scale = 1;
    eagleGroup.add(eagle);
    eagle.lifetime = 250;
    eagle.debug = true;
    eagle.setCollider("circle", 0,-20,20)
  }   
}