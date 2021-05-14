const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
var uHit=0;
var pHit=0;
player={
    x:100,
    y:100,
    r:20,
    dx:3,
    dy:3,
    score:0,
    speed:4

};
ball={
    x:canvas.width/2,
    y:canvas.height/2,
    r:50,
    dx:3,
    dy:3
    
};
opponent={
    x:500,
    y:400,
    r:20,
    dx:-3,
    dy:-3,
    score:0
    
};

function drawBall()
{
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2);
    ctx.fillStyle='black';
    ctx.fill();
}
function drawPlayer()
{
    ctx.beginPath();
    ctx.arc(player.x,player.y,player.r,0,Math.PI*2);
    ctx.fillStyle='red';
    ctx.fill();
}
function drawOpponent()
{
    ctx.beginPath();
    ctx.arc(opponent.x,opponent.y,opponent.r,0,Math.PI*2);
    ctx.fillStyle='blue';
    ctx.fill();
}
function clear()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
   
}

function score()
{
    if(ball.x+ball.r>canvas.width)
{    player.score++;
    document.getElementById('score').innerHTML="RED :"+player.score+" VS BLUE :"+ opponent.score;
    document.getElementById('canvas').style.border='0px';
    document.getElementById('canvas').style.borderRight='5px solid red';
}
    if(ball.x-ball.r<0)
    {opponent.score++;
        document.getElementById('score').innerHTML="RED :"+player.score+" VS BLUE :"+ opponent.score;
        document.getElementById('canvas').style.border='0px';
        document.getElementById('canvas').style.borderLeft='5px solid blue';
    }
}
function newPos()
{
    player.x+=player.dx;
    player.y+=player.dy;
    ball.x+=ball.dx;
    ball.y+=ball.dy;
    opponent.x+=opponent.dx;
    opponent.y+=opponent.dy;
   
}
function AI()
{
    if(ball.x>opponent.x&&ball.dx>0&&opponent.dx<0)
    opponent.dx*=-1;
    else if(ball.x>opponent.x&&ball.dx<0&&opponent.dx<0)
    opponent.dx*=-1;
    //   else if(ball.x<opponent.x&&ball.dx<0&&opponent.dx>0)
    //  opponent.dx*=1;
    // else if(ball.x<opponent.x&&ball.dx>0&&opponent.dx>0)
    // opponent.dx*=1;

else if(opponent.y<ball.y&&opponent.dy<0&&ball.dy>0)
    opponent.dy*=-1;
   else if(opponent.y<ball.y&&opponent.dy<0&&ball.dy<0)
    opponent.dy*=-1;
    else if(opponent.y>ball.y&&opponent.dy>0&&ball.dy<0)
    opponent.dy*=-1;
    else if(opponent.y>ball.y&&opponent.dy>0&&ball.dy<0)
    opponent.dy*=-1;
}
function detectCollision()
{
    var h=Math.pow(player.x-ball.x,2)+Math.pow(player.y-ball.y,2);
    var i=Math.pow(opponent.x-ball.x,2)+Math.pow(opponent.y-ball.y,2);
    if(Math.sqrt(h)+3<=ball.r+player.r)
    {
        var a=player.dx;
        var b=player.dy;
        player.dx*=-1;
        player.dy*=-1;
        // setTimeout(()=>{;},2000);

        ball.dx=a;
        ball.dy=b;
      
    }
    if(Math.sqrt(i)+3<=ball.r+opponent.r)
    {
        // opponent.dx=ball.dx;
        // opponent.dy=ball.dy;
        
        ball.dx=opponent.dx;
        ball.dy=opponent.dy;
        // setTimeout(()=>{;},1000);
        // setTimeout(()=>{console.log('a');2000});
        opponent.dx*=-1;
        opponent.dy*=-1;
        
    //   console.log("error");
    
    }
        // console.log(ball.dx+" "+ball.dy);
    
    if(player.x-player.r<0)
    player.x=player.r;
    // right wall
    if(player.x+player.r>canvas.width)
    player.x=canvas.width-player.r;
    // top wall
    if(player.y-player.r<0)
    player.y=player.r;
    // bottom wall
    if(player.y+player.r>canvas.height)
    player.y=canvas.height-player.r;

    // if(opponent.x-opponent.r<0)
    // opponent.x=opponent.r;
    // // right wall
    // if(opponent.x+opponent.r>canvas.width)
    // opponent.x=canvas.width-opponent.r;
    // // top wall
    // if(opponent.y-opponent.r<0)
    // opponent.y=opponent.r;
    // // bottom wall
    // if(opponent.y+opponent.r>canvas.height)
    // opponent.y=canvas.height-opponent.r;

    // ball detection
    if(ball.x+ball.r>canvas.width||ball.x-ball.r<0)
    ball.dx*=-1;

    if(ball.y-ball.r<0||ball.y+ball.r>canvas.height)
    ball.dy*=-1;

    if(opponent.x+opponent.r>canvas.width||opponent.x-opponent.r<0)
    opponent.dx*=-1;

    if(opponent.y-opponent.r<0||opponent.y+opponent.r>canvas.height)
    opponent.dy*=-1;
    
}
function update()
{
    clear();
    score();
    drawBall();
    drawPlayer();
    drawOpponent();
    detectCollision();

    newPos();
    AI();
        // setTimeout(()=>{;},3000);
    
    requestAnimationFrame(update);
    
    
}


function moveUp()
{
    player.dy=-player.speed;
}
function moveDown()
{
    player.dy=player.speed;
}
function moveRight()
{
    player.dx=player.speed;
}
function moveLeft()
{
    player.dx=-player.speed;
}

    function keyDown(e){
        if(e.key==='ArrowRight'||e.key==='Right')
        moveRight();
        else if(e.key==='ArrowUp'||e.key==='Up')
        moveUp();
        else if(e.key==='ArrowDown'||e.key==='Down')
        moveDown();
        else if(e.key==='ArrowLeft'||e.key==='Left')
        moveLeft();
    }
    function keyUp(e){
        if(
            e.key=='ArrowRight'||
            e.key=='ArrowLeft'||
            e.key=='ArrowUp'||
            e.key=='ArrowDown'
        ){
            player.dx=0;
            player.dy=0;
        }
    }
    update();
    document.addEventListener('keydown',keyDown);
    // document.addEventListener('keyup',keyUp);

