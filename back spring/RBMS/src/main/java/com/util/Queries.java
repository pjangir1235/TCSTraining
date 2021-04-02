package com.util;

public class Queries {

	public static final String FETCHACCOUNT = "SELECT A.ACCOUNT_NO, A.BALANCE, A.ACCOUNT_STATUS, A.TYPE_ID,A.CUSTOMER_ID, A.DOC, A.LAST_UPDATED, T.TYPE_NAME,T.MIN_BALANCE,c.Name FROM RBMS_ACCOUNT A inner join RBMS_ACCOUNT_TYPE T ON A.TYPE_ID=T.TYPE_ID inner join rbms_customer c on a.customer_id=c.customer_id  ";
	public static final String FETCHACCOUNTBYCUSTOMERID = FETCHACCOUNT + " WHERE A.CUSTOMER_ID LIKE ?";
	public static final String FETCHACCOUNTBYACCOUNTNO = FETCHACCOUNT + " WHERE ACCOUNT_NO LIKE ?";
	public static final String FETCHACCOUNTBYSTATUS = FETCHACCOUNT + " WHERE ACCOUNT_STATUS = ?";
	public static final String UPDATEACCOUNTTIMESTAMP = "UPDATE " + Constants.ACCOUNT_TABLE + " SET LAST_UPDATED=? WHERE ACCOUNT_NO=?";
	public static final String VIEWACCOUNTBYCUSTOMERID = "SELECT * FROM " + Constants.ACCOUNT_TABLE + " WHERE CUSTOMER_ID=?";
	public static final String REMOVEACCOUNT ="UPDATE " + Constants.ACCOUNT_TABLE + " SET ACCOUNT_STATUS= 'INACTIVE' WHERE ACCOUNT_NO=?";
	public static final String GETACCOUNTTYPE ="SELECT * FROM " + Constants.ACCOUNT_TYPE_TABLE;
	
	public static final String FETCHACCOUNTBYNUMBER = FETCHACCOUNT + " WHERE ACCOUNT_NO = ?";
	public static final String CHECKUSER = "select * from RBMS_USERS where USER_NAME=? AND PASSWORD=?";
	public static final String UPDATETOLOGIN = "update RBMS_USERS SET LAST_LOG_IN=? WHERE USER_NAME=?";

	// Customer

	public static final String CUSTOMERSEARCHBYSSN = "SELECT * FROM RBMS_CUSTOMER WHERE LOWER(SSN_ID) LIKE ?";
	public static final String CUSTOMERSEARCHBYNAME = "SELECT * FROM RBMS_CUSTOMER WHERE LOWER(NAME) LIKE ?";
	public static final String CUSTOMERSEARCHBYCONTACT = "SELECT * FROM RBMS_CUSTOMER WHERE LOWER(CONTACT) LIKE ?";
	public static final String CUSTOMERSEARCHBYEMAIL = "SELECT * FROM RBMS_CUSTOMER WHERE LOWER(EMAIL) LIKE ?";
	public static final String CUSTOMERSEARCHBYSTATUS = "SELECT * FROM RBMS_CUSTOMER WHERE CURRENT_STATUS = ?";
	public static final String CUSTOMERSEARCHALL = "SELECT * FROM RBMS_CUSTOMER ";
	public static final String UPDATECUSTOMER = "Update RBMS_CUSTOMER SET NAME = ?, DOB = ?, EMAIL = ?, CONTACT = ?, ADDRESS1 = ?, ADDRESS2 = ?, CITY = ?, PINCODE = ? WHERE SSN_ID = ?";
	public static final String DELETECUSTOMER = "SELECT * FROM RBMS_CUSTOMER ";
	
	//transaction
	public static final String TRANSACTIONNVALUE ="SELECT * FROM (SELECT * FROM "	+ Constants.TRANSACTION_TABLE + " WHERE SOURCE=? OR TARGET=? ORDER BY DOT DESC) WHERE ROWNUM<=?";
	public static final String TRANSACTIONGETBETWEENDATE ="SELECT * FROM " + Constants.TRANSACTION_TABLE+ " WHERE DOT between ? and ? and (source=? or target=?) order by DOT DESC";
}
