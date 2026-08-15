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

let currentShape = null;
const shapes = [];

const downCallbackForRect = (e)=>{
    const mousePos = {
        x: e.offsetX,
        y: e.offsetY
    };

    currentShape = new Rectangle(mousePos, getDrawOptions());

    const moveCallback = function(e){
        const mousePos = {
        x: e.offsetX,
        y: e.offsetY
        };
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
    currentShape = new Path(mousePos, getDrawOptions());

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

function getDrawOptions(){
    return {
        fillColor: fillColor.value,
        strokeColor: lineColor.value,
        fill: fillChecked.checked,
        stroke: strokeChecked.checked,
        strokeWidth: strokeWidth.value
    };
}