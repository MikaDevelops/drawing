class Path extends Shape{
    constructor(startPoint, options){
        super(options);
        this.points = [startPoint];

    }
    addPoint(point){
        this.points.push(point);
    }
    draw(ctx){
        ctx.beginPath();
        ctx.strokeStyle = this.options.strokeColor;
        ctx.fillStyle = this.options.fillColor;
        ctx.lineWidth = this.options.strokeWidth;
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i<this.points.length;i++){
            ctx.lineTo(this.points[i].x, this.points[i].y)
        }
        if(this.options.fill) ctx.fill();
        if(this.options.stroke) ctx.stroke();
    }
}