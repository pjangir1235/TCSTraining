package com.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bean.Customer;
import com.bean.Response;
import com.service.interf.CustomerServiceInterface;
import com.util.Constants;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class CustomerController {

	@Autowired
	CustomerServiceInterface serviceCustomer;

	@PostMapping(Constants.CUSTOMER_ADD_CUSTOMER)
	public ResponseEntity<Response> addCustomer(@RequestBody Customer customer) {
		return serviceCustomer.addCustomer(customer);
	}

	@GetMapping(Constants.CUSTOMER_BY_ID+"/{customerId}")
	public ResponseEntity<Response> customerById(@PathVariable("customerId") Long customerId) {
		return serviceCustomer.getCustomerByCustomerId(customerId);
	}

	@GetMapping(Constants.FILTER_CUSTOMERS+"/{filter_option}/{filter_text}")
	public ResponseEntity<Response> searchOption(@PathVariable("filter_option") String filterOption,
			@PathVariable("filter_text") String filterText) {
		return serviceCustomer.searchCustomers(filterOption, filterText);
	}

	@PutMapping(Constants.CUSTOMER_UPDATE_CUSTOMER)
	public ResponseEntity<Response> updateCustomer(@RequestBody Customer customer) {
		return serviceCustomer.updateCustomer(customer);
	}

	@DeleteMapping(Constants.CUSTOMER_DELETE_CUSTOMER+"/{customerId}")
	public ResponseEntity<Response> deleteCustomer(@PathVariable("customerId") Long customerId) {
		 return serviceCustomer.deleteCustomer(customerId);
	}
}
