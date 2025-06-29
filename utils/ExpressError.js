class ExpressError extends Error {
    constructor(status,message,stack){
        super();
        this.status=status;
        this.message=message;
        this.stack=stack;
    }
}

module.exports=ExpressError;