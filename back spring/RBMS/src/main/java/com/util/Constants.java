package com.util;

public class Constants {

	public static final String USERNAME = "TVM1819_TVM38_TJA202_DEV";
	public static final String PWD = "tcstvm38";
	public static final String URL = "jdbc:oracle:thin:@intvmoradb04:1521:ORAJAVADB";
	public static final String DRIVER = "oracle.jdbc.driver.OracleDriver";
	public static final String CREATE_ACCOUNT = "createAccount";
	public static final String DELETE_ACCOUNT = "deleteAccount";
	public static final String GET_ACCOUNT_BY_ACCOUNTNO = "getAccountByAccountNo";
	public static final String VIEW_ACCOUNT_BY_CUSTOMERID = "viewAccountByCustomerID";
	public static final String VIEW_ALL_ACCOUNTS = "viewAllAccounts";
	public static final String CHECK_ACCOUNT = "checkAccount";
	
	public static final String CHECK_ACCOUNT_BY_CUSTOMERID = "checkAccountByCustomerId";
	public static final String ACCOUNT_TABLE = "RBMS_ACCOUNT";
	public static final String ACCOUNT_TYPE_TABLE = "RBMS_ACCOUNT_TYPE ";
	public static final String PROCESS_TRANSACTION_ENDPOINT = "processTransaction";
	public static final String GET_STATEMENT = "getStatement";
	public static final String TRANSACTION_TABLE = "RBMS_TRANSACTION ";
	public static final String GET_STATEMENT_BY_DATE = "getStatementByDate";

	public static final String SERVER_ERROR = "Server Error! Please Try Again";
	public static final String INVALID_REQUEST = "Invalid Request Format";
	public static final String NEGATIVE_BALANCE = "NEGATIVE BALANCE CAN'T BE TRANSFERRED";
	public static final String SUCCESS_MSG = "SUCCESS";
	public static final String BAD_REQUEST = "BAD REQUEST";

	public static final String ACCOUNT_FAILED = "Account creation failed";
	public static final String ACCOUNT_BALANCE="Balance was not zero. Account is closed after remaining amount withdrawn. Amount withdrawn: ";
	public static final String ACCOUNT_NOT_FOUND = "Account not found";
	public static final String ACCOUNT_FETCH = "Account fetching failed";
	public static final String ACCOUNT_TYPE_NOT_FOUND = "Account Type not Exist";
	public static final String ACCOUNT_DELETED = "Account Deleted";
	public static final String FILTER_ACCOUNT = "searchAccounts";
	
	public static final String ACCOUNT_EXIST = "Account already Exist";
	// Customer process messages 
	public static final String CUSTOMER_CREATION_SUCCESS = "User Successfully Created";
	public static final String CUSTOMER_NOT_FOUND = "Customer not found";
	public static final String CUSTOMER_ALREADY_EXIST = "Customer already exist";
	
	// Customer Functions mapping
	public static final String CUSTOMER_ADD_CUSTOMER = "addCustomer";
	public static final String CUSTOMER_UPDATE_CUSTOMER = "updateCustomer";
	public static final String CUSTOMER_DELETE_CUSTOMER = "deleteCustomer";
	public static final String CUSTOMER_READ_CUSTOMER = "getCustomer";
	public static final String FILTER_CUSTOMERS = "searchCustomers";
	public static final String CUSTOMER_BY_ID="getCustomerById";
	
	public static final String USER_SUCCESS = "user logged in";
	public static final String USER_FAIL = "wrong username and password";
	public static final String AUTHENTICATION_ERROR="Bad request";
	public static final String USER_WRONG_PARAMETERS="Wrong parameters entered";
	public static final String AUTHENTICATE_USER="authenticateUser";
	
	public static final String DELETE_CUSTOMER_FAILED="Customer has one or more active accounts, so customer can't be deleted.";
	
	public static final String TRANSACTION_NOT_AVAILABLE="NO TRANSACTION AVAILABLE BETWEEM THESE DAYS";
	


}
