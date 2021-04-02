

export class UserResponse {
    public status:boolean;
    public message: string;
    public object:any;
    constructor(){
        
    }
    
    getStatus():boolean{
        return this.status;
    }
    
    getMessage():string{
        return this.message;
    }
    
    getObject(){
        return this.object;
    }
}
