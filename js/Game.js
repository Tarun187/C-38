class Game {
  constructor() {
    this.resetButton=createButton("Reset Button");
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
      
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
    
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    this.resetButton.position(width/2+230,100);

  }

  play() {
    this.handleElements();
    this.handleReset();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      var index = 0; //cars array index[]

      // allPlayers = {player1:{name:value, positionX: value,positionY:value},player2:{name:value, positionX: value,positionY:value}}
      for(var plr in allPlayers){
       var x = allPlayers[plr].positionX;
       var y = height - allPlayers[plr].positionY;

       cars[index].position.x = x;
       cars[index].position.y = y;
       if(index+1 === player.index){
        fill("red");
        stroke("black");
        ellipse(x,y,60)
         camera.position.y = cars[index].position.y
       }

    
       index++;  //index= index+1
      }

     this.handlePlayerControls();
      drawSprites();
    }
  }

  handlePlayerControls(){
     if(keyIsDown(UP_ARROW)){
       player.positionY+=10
       player.update();
     }
     if(keyIsDown(DOWN_ARROW)){
      player.positionY-=10
      player.update();
    }
  }
  handleReset(){
    this.resetButton.mousePressed(()=>{
    player.updateCount(0);
    this.update(0);
    database.ref("players").remove();
    window.location.reload();
    })
  }
  
}
