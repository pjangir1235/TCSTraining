package com.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bean.Account;
import com.bean.Response;
import com.service.interf.AccountServiceInterface;
import com.util.Constants;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class AccountController {

	@Autowired
	AccountServiceInterface serviceAccount;

	@GetMapping(Constants.GET_ACCOUNT_BY_ACCOUNTNO+"/{accountNo}")
	public ResponseEntity<Response> getCustomerByAccountNo(@PathVariable("accountNo") long accountNo) {
		return serviceAccount.getAccountByAccountNo(accountNo);
	}
	
	@GetMapping(Constants.CHECK_ACCOUNT_BY_CUSTOMERID+"/{customerId}")
	public ResponseEntity<Response> checkAccountByCustomer(@PathVariable("customerId") long customerId) {
		return serviceAccount.checkAccountByCustomer(customerId);
	}
	
	
	@GetMapping(Constants.FILTER_ACCOUNT+"/{filter_option}/{filter_text}")
	public ResponseEntity<Response> searchAccountOption(@PathVariable("filter_option") String filterOption,
			@PathVariable("filter_text") String filterText) {
		return serviceAccount.searchAccounts(filterOption, filterText);
	}
	
	@GetMapping(Constants.CHECK_ACCOUNT+"/{accountNo}")
	public ResponseEntity<Response> checkAccount(@PathVariable("accountNo") long accountNo) {
		return serviceAccount.getAccountByAccountNo(accountNo);
	}
	
	
	
	@PostMapping(Constants.CREATE_ACCOUNT)
	public ResponseEntity<Response> addAccount(@RequestBody Account account) {
		return serviceAccount.addAccount(account);
	}

	@DeleteMapping(Constants.DELETE_ACCOUNT+"/{accountNo}")
	public ResponseEntity<Response> deleteAccount(@PathVariable("accountNo") Long accountNo) {
		return serviceAccount.deleteAccount(accountNo);
	}

}
