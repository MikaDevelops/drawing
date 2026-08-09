const canvasProperties = {
    width:  window.innerWidth,
    height: window.innerHeight,
    center: {
        x: window.innerWidth/2,
        y: window.innerHeight/2
    }
};
const stageProperties = {
    width:  600,
    height: 480,
    left: canvasProperties.center.x-600/2,
    top: canvasProperties.center.y-480/2
};

main_canvas.width =     canvasProperties.width;
main_canvas.height =    canvasProperties.height;

const ctx = main_canvas.getContext('2d');
clearCanvas()

//let path = [];
//path.type="path"
//let rectangle = {};
//rectangle.type = "rect"
let currentShape = null;
const shapes = [];

const downCallbackForRect = (e)=>{
    const mousePos = {
        x: e.offsetX,
        y: e.offsetY
    };
    //rectangle.corner1 = mousePos;
    currentShape = new Rectangle(mousePos);

    const moveCallback = function(e){
        const mousePos = {
        x: e.offsetX,
        y: e.offsetY
        };
        //rectangle.corner2 = mousePos;
        currentShape.setCorner2(mousePos);

        clearCanvas();
        drawShapes([...shapes, currentShape]);
    }

    main_canvas.addEventListener('pointermove', moveCallback);

    const upCallback = function(e){
        main_canvas.removeEventListener('pointermove', moveCallback);
        main_canvas.removeEventListener('pointerup', upCallback);
        shapes.push(currentShape);
    }

    main_canvas.addEventListener('pointerup', upCallback);

};

const downCallbackForPath = (e)=>{
    const mousePos = {
        x: e.offsetX,
        y: e.offsetY
    };
    currentShape = new Path(mousePos);

    const moveCallback = function(e){
        const mousePos = {
        x: e.offsetX,
        y: e.offsetY
        };
        currentShape.addPoint(mousePos);

        clearCanvas();
        drawShapes([...shapes, currentShape]);
    }

    main_canvas.addEventListener('pointermove', moveCallback);

    const upCallback = function(e){
        main_canvas.removeEventListener('pointermove', moveCallback);
        main_canvas.removeEventListener('pointerup', upCallback);
        shapes.push(currentShape);
    }

    main_canvas.addEventListener('pointerup', upCallback);
};

main_canvas.addEventListener('pointerdown', downCallbackForPath);

function clearCanvas(){
    ctx.clearRect(0,0, main_canvas.width, main_canvas.height);
    ctx.fillStyle = "gray";
    ctx.fillRect(0,0, main_canvas.width, main_canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(stageProperties.left, stageProperties.top, stageProperties.width, stageProperties.height);
    }

function drawShapes(shapes){
    for (shape of shapes){
        shape.draw(ctx);
    /*     switch(shape.type){
        case "path":
                ctx.beginPath();
                ctx.strokeStyle = "rgba(0,0,0,0.75)";
                ctx.lineWidth = 3;
                ctx.moveTo(shape[0].x, shape[0].y);
                for (let i = 1; i<shape.length;i++){
                    ctx.lineTo(shape[i].x, shape[i].y)
                }
                ctx.stroke();
        break;
        case "rect":
                ctx.beginPath();
                ctx.strokeStyle = "rgba(0,0,0,0.75)";
                ctx.lineWidth = 3;
                const rect = shape;
                const minX = Math.min(rect.corner1.x, rect.corner2.x);
                const minY = Math.min(rect.corner1.y, rect.corner2.y);
                const width = Math.abs(rect.corner1.x - rect.corner2.x);
                const height = Math.abs(rect.corner1.y - rect.corner2.y);
                ctx.rect(minX,minY,width,height);
                ctx.stroke();
        break; 
    }*/
    }

}

function changeTool(tool){
    main_canvas.removeEventListener('pointerdown', downCallbackForRect);
    main_canvas.removeEventListener('pointerdown', downCallbackForPath);
    switch(tool){
        case "rectangle":
            main_canvas.addEventListener('pointerdown', downCallbackForRect);
        break;
        case "path":
            main_canvas.addEventListener('pointerdown', downCallbackForPath);
        break;
    }
}

/*
2:10:10 https://youtu.be/PsTUuID27KA?list=PLB0Tybl0UNfaxaLvusZR7KoB1mU-ewTZl&t=7810
*/