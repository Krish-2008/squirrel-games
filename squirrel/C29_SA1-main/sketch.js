const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var squirrel;
var bg;
var rope;
var eating;
var sad;
var eat;
var tree;
var fruit;
var fruit_con;
var cut_button;
var bgm;
var Mute;
var balloon;
var air;
var sad2;
function preload(){
  bgImg = loadImage("bg.png");
  squirrelImg = loadImage("squirell3.png");
  eat = loadAnimation("squirrel2.png","squirrel.png");
  sad = loadAnimation("squirrel3.png","squirrel5.png");
  treeImg = loadImage("tree.png");
  fruitImg = loadImage("fruit.png");
  bgm = loadSound("bg.mp3");
  air = loadSound("air.mp3");
  sad2 = loadSound("sad.mp3");
  


  eat.playing = true;
  sad.playing = true;
  eat.looping = false;
  sad.looping = false;
  }

function setup() 
{
  
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth+80,displayHeight);
  }
  else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth,windowHeight);
  

  }
  
  frameRate(80);
  engine = Engine.create();
  world = engine.world;


  cut_button = createImg("cut_btn.png");
  cut_button.position(479,20);
  cut_button.size(50,50);
  cut_button.mouseClicked(drop);

  balloon = createImg("balloon.png");
  balloon.position(100,300);
  balloon.size(100,100);
  balloon.mouseClicked(airflow);




  Mute = createImg("mute.png");
  Mute.position(1000,100);
  Mute.size(50,50);
  Mute.mouseClicked(mute);

 // bgm.play();
  

  squirrel = createSprite(470,480,100,100);
  squirrel.scale  = 0.2;
  squirrel.addImage(squirrelImg)
  eat.frameDelay = 20;

  squirrel.addAnimation("eating",eat);
  squirrel.addAnimation("crying",sad);
 
 

 rope = new Rope(7,{x:500,y:9});

 fruit = Bodies.circle(300,300,20);
 Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
 
  

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

 
}

function draw() 
{
  background(197)
  image(bgImg,0,0,displayWidth+80,displayHeight);

  rope.show();
//  image(fruitImg,fruit.position.x,fruit.position.y,90,90)
  
  Engine.update(engine);

  if(fruit!=null){
    image(fruitImg,fruit.position.x,fruit.position.y,70,70);
  }
 // if(collide(fruit,squirrel)==true)
 // {
 //   squirrel.changeAnimation('eating');
    
 // }
 
 if(collide(fruit,squirrel)==true)
  {
   squirrel.changeAnimation('eating');
    
  }
 
  drawSprites();
  if(fruit!=null && fruit.position.y>=650)
  {
    squirrel.changeAnimation('crying');
    bgm.stop();
    sad2.play();
    fruit=null;
    
     
   }
  
 
 
   
}
function drop(){
rope.break();
fruit_con.detach();

    
  
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function mute(){
  if(bgm.isPlaying()){
    bgm.stop();


  }
  else{
    bgm.play();
  }
}

function airflow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
  air.play();

}

