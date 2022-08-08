song = "";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    song = loadsound("music.mp3");
}

function draw(){
    image(video,0,0,600,530);


    fill("#FF0000");
    stroke("#FF0000");
    if(scoreRightWrist > 0.2)
{

    circle(rightWristX, rightWristY, 20);

    if(rightWristY > 0 && rightWristY <= 100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY > 100 && rightWristX)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if(rightWristY > 200 && rightWristY <= 300)
    {
        document.getElementById("speed").innerHTML = "speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY > 300 && rightWristY <= 400)
    {
        document.getElementById("speed").innerHTML = "speed = 2x";
        song.rate(2);
    }
    else if(rightWristY > 400 && rightWristY <= 500)
    {
        document.getElementById("speed").innerHTML = "speed = 2.5x";
        song.rate(2.5);
    }
}

    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "volume = " + volume;
    song.setVolume(volume);

    if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);
		InNumberleftWristY = Number(leftWristY);
		new_leftWristY = floor(InNumberleftWristY *2);
		leftWristY_divide_1000 = new_leftWristY/1000;
		document.getElementById("volume").innerHTML = "Volume = " + leftWristY_divide_1000;		
		song.setVolume(leftWristY_divide_1000);	
	}
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);
         
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}