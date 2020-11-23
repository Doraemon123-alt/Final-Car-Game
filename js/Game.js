class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1, car2, car3, car4];

    car1.addImage(car1Img)
    car2.addImage(car2Img)
    car3.addImage(car3Img)
    car4.addImage(car4Img)

  }

  play(){
    form.hide();
    
    
    Player.getPlayerInfo();
player.getFinishedCars()
    background(ground)

    image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5)

    if(allPlayers !== undefined){
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction

        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
          fill("green")
        ellipse(x,y,60,60)
        }
        textAlign(CENTER)
        fill("yellow")
        textSize(15);
        text(allPlayers[plr].name,cars[index-1].x,cars[index-1].y+80)
        
        
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null && passedFinished===false){
      player.distance +=10
      player.update();
    }

    if(player.distance > 100 && passedFinished===false){
      Player.updateFinishedCars();
      player.rank= finishedCars;
      player.update();
      passedFinished=true 

      
     
    }
    

    

    drawSprites();
  }


  displayRanks()
  {
camera.position.x=displayWidth/2;
camera.position.y=0;

imageMode(CENTER);

Player.getPlayerInfo();
image(gold,displayWidth/4 + 400,-100,250,300)
image(silver,displayWidth/2 -200,-100 + displayHeight/10,225,270)
image(bronze,displayWidth - 400,-100+displayHeight/9,200,250)

textAlign(CENTER)
textSize(50)

for (var plr in allPlayers)
{

if(allPlayers[plr].rank ===1)
{

  fill("yellow")
  text(allPlayers[plr].name , displayWidth/4 + 400,20)
}
else if( allPlayers[plr].rank ===2)
{

  fill("silver")
  text(allPlayers[plr].name ,displayWidth/2 -200,-100 + displayHeight/10 + 100)
}

else if( allPlayers[plr].rank ===3)
{
  fill("brown")
  text(allPlayers[plr].name ,displayWidth - 400,-100+displayHeight/9 + 100)
}

  else 
{

  textSize(30)
  fill("white")
  text("Honorable Mention to " + allPlayers[plr].name ,displayWidth/2,255)

}
  
}

  }
   
}
