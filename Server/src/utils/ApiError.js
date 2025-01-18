class ApiError extends Error{
    constructor(
        statusCode,
        message="Something Went wrong",
        error=[],
        stack
    ){
        super(message)
        this.statusCode=statusCode,
        this.data=null
        this.message=message
        this.sucasse=false
        this.error=error
        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}