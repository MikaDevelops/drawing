class Shape{
    constructor(options){
        if (options == undefined) throw new Error('Options must be set to shape object.');
        this.options = options;
    }
    draw(){
        throw new Error("draw method should be implemented");
    }
}