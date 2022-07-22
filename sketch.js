var road, car1, car2, leftBoundary, rightBoundary
var roadImg, car1Img, car2Img;
var car2G;

var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {
    roadImg = loadImage("path.png");
    car1Img = loadImage("car.png");
    car2Img = loadImage("car2.png");
    endImg = loadAnimation("gameOver.png")
}

function setup() {
    createCanvas(400, 400);

    road = createSprite(200, 200);
    road.addImage(roadImg);
    road.velocityY = 4;
    road.scale = 1.2;

    car1 = createSprite(180, 300, 30, 30);
    car1.scale = 0.5
    car1.addAnimation("carMoving", car1Img);

    car2G = new Group();
    

    leftBoundary = createSprite(0, 0, 100, 800);
    leftBoundary.visible = false;
    rightBoundary = createSprite(410, 0, 100, 800);
    rightBoundary.visible = false;
}

function draw() {
    if (gameState === PLAY) {
        background(0);
        car1.x = World.mouseX

        edges = createEdgeSprites();
        car1.collide(edges[3]);
        car1.collide(leftBoundary);
        car1.collide(rightBoundary);

        if (road.y > 400) {
            road.y = height / 2;
        }

        createCar2();
        

        if (car2G.isTouching(car1)) {
            gameState = END;

            car1.addAnimation("carMoving", endImg);

            car1.x = 200;
            car1.y = 200;
            car1.scale = 1

            car2G.destroyEach();
            

            car2G.setVelocityYEach(0);
            

        }

        drawSprites();
    }
}



function createCar2() {
    if (World.frameCount % 200 == 0) {
        var car2 = createSprite(Math.round(random(50, 350), 40, 10, 10));
        car2.addImage(car2Img);
        car2.scale = 0.4;
        car2.velocityY = 3;
        car2.lifetime = 150;
        car2G.add(car2);
    }
}

