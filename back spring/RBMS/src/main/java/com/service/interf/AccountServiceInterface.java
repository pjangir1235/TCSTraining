package com.service.interf;

import org.springframework.http.ResponseEntity;

import com.bean.Account;
import com.bean.Response;

public interface AccountServiceInterface {

	void updateBalance(long debited, double amount, long credited);

	// add account
	ResponseEntity<Response> addAccount(Account account);

	// search account
	ResponseEntity<Response> searchAccounts(String filterOption, String filterText);

	// service Class of return account type based upon customer Id
	// done
	ResponseEntity<Response> checkAccountByCustomer(long customerId);

	ResponseEntity<Response> deleteAccount(long accountNumber);

	ResponseEntity<Response> getAccountByAccountNo(long accountNumber);

}