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
ctx.fillStyle = "gray";
ctx.fillRect(0,0, main_canvas.width, main_canvas.height);

ctx.fillStyle = "white";
ctx.fillRect(stageProperties.left, stageProperties.top, stageProperties.width, stageProperties.height);

const path = [];

main_canvas.addEventListener('pointerdown', function(e){
    const mousePos = {
        x: e.offsetX,
        y: e.offsetY
    };
    path.push(mousePos);
});

main_canvas.addEventListener('pointermove', function(e){
    const mousePos = {
        x: e.offsetX,
        y: e.offsetY
    };
    path.push(mousePos);
});

main_canvas.addEventListener('pointerup', function(e){
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    path.forEach( (point)=>{
        ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();//45:24
});