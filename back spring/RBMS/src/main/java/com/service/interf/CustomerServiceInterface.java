package com.service.interf;

import org.springframework.http.ResponseEntity;

import com.bean.Customer;
import com.bean.Response;

public interface CustomerServiceInterface {

	ResponseEntity<Response> addCustomer(Customer customer);

	ResponseEntity<Response> searchCustomers(String filterOption, String filterText);

	ResponseEntity<Response> getCustomerBySSNID(String sSNID);

	ResponseEntity<Response> getCustomerByCustomerId(Long customerId);

	ResponseEntity<Response> deleteCustomer(long customerId);

	ResponseEntity<Response> updateCustomer(Customer customer);

}