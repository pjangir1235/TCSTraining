package com.service.impl;

import java.sql.*;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.bean.Account;
import com.bean.Customer;
import com.bean.Response;
import com.interfacerepo.AccountRepo;
import com.interfacerepo.CustomerRepo;
import com.service.interf.CustomerServiceInterface;
import com.util.ConstantFunction;
import com.util.Constants;

@Service
public class CustomerService implements CustomerServiceInterface {
	@Autowired
	CustomerRepo custRepo;
	
	@Autowired
	AccountRepo repoAccount;
	/* (non-Javadoc)
	 * @see com.service.impl.CustomerServiceInterface#addCustomer(com.bean.Customer)
	 */
	@Override
	public ResponseEntity<Response> addCustomer(Customer customer) {

		if (customer == null)
			return new ResponseEntity<Response>(ConstantFunction.createObject(false, Constants.INVALID_REQUEST, null),
					HttpStatus.BAD_REQUEST);

		// Fetching Customer For verification..
		Customer c = custRepo.getCustomerBySsnId(customer.getSsnId());

		if (c != null)
			return new ResponseEntity<Response>(
					ConstantFunction.createObject(false, Constants.CUSTOMER_ALREADY_EXIST, null), HttpStatus.OK);

		customer.setDoc(new Date(System.currentTimeMillis()));

		customer.setLastUpdated(new Timestamp(System.currentTimeMillis()));

		// adding Customer
		c = custRepo.save(customer);

		// Fetching the added customer...
		if (c != null)
			return new ResponseEntity<Response>(ConstantFunction.createObject(true, Constants.SUCCESS_MSG, c),
					HttpStatus.OK);
		return new ResponseEntity<Response>(ConstantFunction.createObject(false, Constants.SERVER_ERROR, null),
				HttpStatus.BAD_REQUEST);

	}

	/* (non-Javadoc)
	 * @see com.service.impl.CustomerServiceInterface#searchCustomers(java.lang.String, java.lang.String)
	 */
	@Override
	public ResponseEntity<Response> searchCustomers(String filterOption, String filterText) {

		// Fetching Customer For verification..
		ArrayList<Customer> customers;
		if (filterOption.equalsIgnoreCase("SSN_ID"))
			customers = custRepo.searchCustomersBySSN("%" + filterText + "%");
		else if (filterOption.equalsIgnoreCase("NAME"))
			customers = custRepo.searchCustomersByName("%" + filterText + "%");
		else if (filterOption.equalsIgnoreCase("CONTACT"))
			customers = custRepo.searchCustomersByContact("%" + filterText + "%");
		else if (filterOption.equalsIgnoreCase("EMAIL"))
			customers = custRepo.searchCustomersByEmail("%" + filterText + "%");
		else if (filterOption.equalsIgnoreCase("STATUS"))
			customers = custRepo.searchCustomersByStatus(filterText.toUpperCase());
		else
			customers = custRepo.searchAllCustomer();

		if (customers == null || customers.isEmpty())
			return new ResponseEntity<Response>(
					ConstantFunction.createObject(false, Constants.CUSTOMER_NOT_FOUND, null), HttpStatus.OK);

		return new ResponseEntity<Response>(ConstantFunction.createObject(true, Constants.SUCCESS_MSG, customers),
				HttpStatus.OK);

	}

	/* (non-Javadoc)
	 * @see com.service.impl.CustomerServiceInterface#getCustomerBySSNID(java.lang.String)
	 */
	@Override
	public ResponseEntity<Response> getCustomerBySSNID(String sSNID) {

		// Fetching Customer For verification..
		if (sSNID == null)
			return new ResponseEntity<Response>(ConstantFunction.createObject(false, Constants.INVALID_REQUEST, null),
					HttpStatus.BAD_REQUEST);

		Customer c = custRepo.getCustomerBySsnId(sSNID);

		if (c == null)
			return new ResponseEntity<Response>(
					ConstantFunction.createObject(false, Constants.CUSTOMER_NOT_FOUND, null), HttpStatus.OK);

		return new ResponseEntity<Response>(ConstantFunction.createObject(true, Constants.SUCCESS_MSG, c),
				HttpStatus.OK);

	}

	/* (non-Javadoc)
	 * @see com.service.impl.CustomerServiceInterface#getCustomerByCustomerId(java.lang.Long)
	 */
	@Override
	public ResponseEntity<Response> getCustomerByCustomerId(Long customerId) {

		if (customerId == null)
			return new ResponseEntity<Response>(ConstantFunction.createObject(false, Constants.INVALID_REQUEST, null),
					HttpStatus.BAD_REQUEST);

		Customer c = custRepo.getCustomerByCustomerId(customerId);
		if (c == null)
			return new ResponseEntity<Response>(
					ConstantFunction.createObject(false, Constants.CUSTOMER_NOT_FOUND, null), HttpStatus.OK);

		return new ResponseEntity<Response>(ConstantFunction.createObject(true, Constants.SUCCESS_MSG, c),
				HttpStatus.OK);
	}

	/* (non-Javadoc)
	 * @see com.service.impl.CustomerServiceInterface#deleteCustomer(long)
	 */
	@Override
	public ResponseEntity<Response> deleteCustomer(long customerId) {

		// need account module for account validation of customers;
		if (customerId == 0) 
			return new ResponseEntity<Response>(ConstantFunction.createObject(false, Constants.INVALID_REQUEST, null),
					HttpStatus.BAD_REQUEST);
		


		Customer c = custRepo.getCustomerByCustomerId(customerId);
		if (c == null)
			return new ResponseEntity<Response>(
					ConstantFunction.createObject(false, Constants.CUSTOMER_NOT_FOUND, null), HttpStatus.OK);
		ArrayList<Account> account=repoAccount.viewAccountByCustomerId(customerId);
		for(Account acc:account)
		{
			if(acc.getAccountStatus().equals("Active".toUpperCase()))
				return new ResponseEntity<Response>(
						ConstantFunction.createObject(false, Constants.DELETE_CUSTOMER_FAILED, null), HttpStatus.OK);
		}
		
		c.setCurrentStatus("inactive".toUpperCase());
		c.setLastUpdated(new Timestamp(System.currentTimeMillis()));
		Customer cust=custRepo.save(c);
		return new ResponseEntity<Response>(
				ConstantFunction.createObject(true, Constants.SUCCESS_MSG, cust), HttpStatus.OK);

	}

	/* (non-Javadoc)
	 * @see com.service.impl.CustomerServiceInterface#updateCustomer(com.bean.Customer)
	 */
	@Override
	public ResponseEntity<Response> updateCustomer(Customer customer) {

		// Checking if customer Exist
		if (custRepo.getCustomerBySsnId(customer.getSsnId()) == null)
			return new ResponseEntity<Response>(
					ConstantFunction.createObject(false, Constants.CUSTOMER_NOT_FOUND, null), HttpStatus.BAD_REQUEST);
		// Updating user...
		Customer c = custRepo.save(customer);
		if (c == null)
			return new ResponseEntity<Response>(
					ConstantFunction.createObject(false, Constants.CUSTOMER_NOT_FOUND, null), HttpStatus.OK);

		return new ResponseEntity<Response>(ConstantFunction.createObject(true, Constants.SUCCESS_MSG, c),
				HttpStatus.OK);

	}

}