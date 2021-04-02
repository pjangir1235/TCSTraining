export class User {

    public userID: number;
    public userName: string;
    public password: string;
    public userType: string;
    public timestamp: string;
    constructor( userName, password, userID = null, userType = null, timestamp = null ) {
        this.userID = userID;
        this.userName = userName;
        this.password = password;
        this.userType = userType;
        this.timestamp = timestamp;
    }


}
