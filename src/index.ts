
class Test{
    val: string;
    constructor(options: { name: string; }){
        this.val = options.name || '';

        this.init();
    }


    init(){

        return this.val
    }
}