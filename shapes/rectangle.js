class Rectangle extends Shape{
    constructor(corner1, options){
        super(options);
        this.corner1 = corner1;
        this.corner2 = corner1;
    }
    setCorner2(corner2){
        this.corner2 = corner2;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.strokeStyle = this.options.strokeColor;
        ctx.fillStyle = this.options.fillColor;
        ctx.lineWidth = 3;
        const minX = Math.min(this.corner1.x, this.corner2.x);
        const minY = Math.min(this.corner1.y, this.corner2.y);
        const width = Math.abs(this.corner1.x - this.corner2.x);
        const height = Math.abs(this.corner1.y - this.corner2.y);
        ctx.rect(minX,minY,width,height);
        if(this.options.fill) ctx.fill();
        if(this.options.stroke) ctx.stroke();
    }
}