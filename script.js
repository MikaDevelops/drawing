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

let path = [];
const shapes = [];

main_canvas.addEventListener('pointerdown', function(e){
    const mousePos = {
        x: e.offsetX,
        y: e.offsetY
    };
    path.push(mousePos);

    const moveCallback = function(e){
        const mousePos = {
        x: e.offsetX,
        y: e.offsetY
        };
        path.push(mousePos);

        clearCanvas();
        for (const shape of [...shapes, path]){
            ctx.beginPath();
            ctx.moveTo(shape[0].x, shape[0].y);
            for (let i = 1; i<shape.length;i++){
                ctx.lineTo(shape[i].x, shape[i].y)
            }
            ctx.stroke();
        }
    }

    main_canvas.addEventListener('pointermove', moveCallback);

    const upCallback = function(e){
        main_canvas.removeEventListener('pointermove', moveCallback);
        main_canvas.removeEventListener('pointerup', upCallback);
        shapes.push(path);
        path = [];
    }

    main_canvas.addEventListener('pointerup', upCallback);

});

function clearCanvas(){
    ctx.clearRect(0,0, main_canvas.width, main_canvas.height);
    ctx.fillStyle = "gray";
    ctx.fillRect(0,0, main_canvas.width, main_canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(stageProperties.left, stageProperties.top, stageProperties.width, stageProperties.height);
    }

