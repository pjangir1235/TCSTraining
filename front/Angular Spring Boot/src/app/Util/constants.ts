export class Constants {

    public static IP: string = "172.26.53.198";
    public static PORT: string = "8080";
    public static API_URL: string = "http://" + Constants.IP + ":" + Constants.PORT + "/RBMS/";
    public static AUTH_URL: string = Constants.API_URL + "AuthenticationController";

    public static CUSTOMER_URL: string = Constants.API_URL + "CustomerController";

    public static CUST_URL: string = Constants.API_URL + "AccountController";


    public static TRANSACTION_URL: string = Constants.API_URL + "TransactionController";

    public static ACCOUNT_URL: string = Constants.API_URL + "AccountController";

    public static DELETE_CUSTOMER = Constants.CUSTOMER_URL + "/deleteCustomer?customerId=";

    public static ADD_CUSTOMER=Constants.CUSTOMER_URL+"/addCustomer"
    public static GET_CUSTOMER = Constants.CUSTOMER_URL + "/getCustomerById?customerId=";

}
