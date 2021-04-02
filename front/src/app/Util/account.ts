export class Account {

    public customerID;
    public accountStatus;
    public typeId;
    public balance:number;
    public accountNumber:string;
    public accountID;
    public date: string;
    public type:any;
    constructor(customerID,accountStatus,typeId,balance,accountNumber, date,type){
        this.customerID=customerID;
        this.typeId=typeId;
        this.accountStatus=accountStatus;
        this.balance=balance;
        this.accountNumber=accountNumber;
        this.date=date;
        this.type=type;
    }
    
}