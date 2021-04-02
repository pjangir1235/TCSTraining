export class Constants {

    public static IP: string = "localhost";
    public static PORT: string = "8081";
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
