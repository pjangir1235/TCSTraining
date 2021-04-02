package com.service.impl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.bean.Account;
import com.bean.AccountType;
import com.bean.Customer;
import com.bean.Response;
import com.bean.Transaction;
import com.interfacerepo.AccountRepo;
import com.interfacerepo.AccountTypeRepo;
import com.interfacerepo.CustomerRepo;
import com.service.interf.AccountServiceInterface;
import com.service.interf.TransactionServiceInterface;
import com.util.ConstantFunction;
import com.util.Constants;
import com.util.Utility;

@Service
public class AccountService implements AccountServiceInterface {

	@Autowired
	AccountRepo repoAccount;
	@Autowired
	AccountTypeRepo repoType;
	@Autowired
	CustomerRepo repoCustomer;
	@Autowired
	TransactionServiceInterface serviceTransaction;

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.service.AccountServiceInterface#updateBalance(long, double,
	 * long)
	 */
	@Override
	public void updateBalance(long debited, double amount, long credited) {

		if (debited != 0) {

			Account acc = repoAccount.getAccountByAccountNumber(debited);
			acc.setBalance(acc.getBalance() - amount);
			repoAccount.save(acc);

		}

		if (credited != 0) {
			Account acc = repoAccount.getAccountByAccountNumber(credited);
			acc.setBalance(acc.getBalance() + amount);
			repoAccount.save(acc);

		}

	}

	// add account
	/*
	 * (non-Javadoc)
	 * 
	 * @see com.service.AccountServiceInterface#addAccount(com.bean.Account)
	 */
	@Override
	public ResponseEntity<Response> addAccount(Account account) {
		if (account == null)
			return new ResponseEntity<Response>(ConstantFunction.createObject(false, Constants.INVALID_REQUEST, null),
					HttpStatus.BAD_REQUEST);
		account.setLastUpdated(Utility.getCurrentTime());
		account.setAccountStatus("ACTIVE");
		account.setDoc(account.getLastUpdated());
		account.setBalance(account.getBalance() * 1.00);

		Account acc = repoAccount.save(account);
		if (acc == null) {
			return new ResponseEntity<Response>(ConstantFunction.createObject(false, Constants.ACCOUNT_EXIST, null),
					HttpStatus.OK);
		}
		serviceTransaction
				.processTransaction(new Transaction(null, null, 0, acc.getAccountNumber(), acc.getBalance(), 1));

		return new ResponseEntity<Response>(ConstantFunction.createObject(true, Constants.SUCCESS_MSG, acc),
				HttpStatus.OK);
	}

	// search account
	/*
	 * (non-Javadoc)
	 * 
	 * @see com.service.AccountServiceInterface#searchAccounts(java.lang.String,
	 * java.lang.String)
	 */
	@Override
	public ResponseEntity<Response> searchAccounts(String filterOption, String filterText) {

		// Fetching Customer For verification..
		ArrayList<Account> accounts = null;

		String filterData = "%" + filterText + "%";
		if (filterOption.equalsIgnoreCase("ACCOUNT_NUMBER"))
			accounts = repoAccount.searchAccountByAccountNo(filterData);
		else if (filterOption.equalsIgnoreCase("CUSTOMER_ID"))
			accounts = repoAccount.searchAccountByCustomerId(filterData);
		else if (filterOption.equalsIgnoreCase("STATUS"))
			accounts = repoAccount.searchAccountByStatus(filterText.toUpperCase());
		else if (filterOption.equalsIgnoreCase("ALL"))
			accounts = repoAccount.searchAllAccount();

		if (accounts == null || accounts.isEmpty())
			return new ResponseEntity<Response>(ConstantFunction.createObject(false, Constants.ACCOUNT_NOT_FOUND, null),
					HttpStatus.OK);

		return new ResponseEntity<Response>(ConstantFunction.createObject(true, Constants.SUCCESS_MSG, accounts),
				HttpStatus.OK);
	}

	// service Class of return account type based upon customer Id
	// done
	/*
	 * (non-Javadoc)
	 * 
	 * @see com.service.AccountServiceInterface#checkAccountByCustomer(long)
	 */
	@Override
	public ResponseEntity<Response> checkAccountByCustomer(long customerId) {
		Customer c = repoCustomer.getCustomerByCustomerId(customerId);
		if (c == null)
			return new ResponseEntity<Response>(
					ConstantFunction.createObject(false, Constants.CUSTOMER_NOT_FOUND, null), HttpStatus.OK);
		ArrayList<Account> account = repoAccount.viewAccountByCustomerId(c.getCustomerId());
		ArrayList<AccountType> accountType = (ArrayList<AccountType>) repoType.findAll();
		if (accountType == null)
			return new ResponseEntity<Response>(
					ConstantFunction.createObject(false, Constants.ACCOUNT_TYPE_NOT_FOUND, null), HttpStatus.OK);
		if (account != null) {
			for (Account acc : account) {
				if (accountType != null)
					for (AccountType accType : accountType) {
						if (accType.getTypeId() == acc.getTypeId()) {
							accountType.remove(accType);
							break;
						}
					}
			}
		}
		if (accountType == null || accountType.isEmpty())
			return new ResponseEntity<Response>(ConstantFunction.createObject(false, Constants.ACCOUNT_EXIST, null),
					HttpStatus.OK);
		return new ResponseEntity<Response>(ConstantFunction.createObject(true, Constants.SUCCESS_MSG, accountType),
				HttpStatus.OK);

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.service.AccountServiceInterface#deleteAccount(long)
	 */
	@Override
	public ResponseEntity<Response> deleteAccount(long accountNumber) {

		if (accountNumber == 0)
			return new ResponseEntity<Response>(ConstantFunction.createObject(false, Constants.INVALID_REQUEST, null),
					HttpStatus.BAD_REQUEST);

		Account account = repoAccount.getAccountByAccountNumber(accountNumber);
		if (account == null)
			return new ResponseEntity<Response>(ConstantFunction.createObject(false, Constants.SERVER_ERROR, null),
					HttpStatus.OK);
		if (account.getBalance() > 0)
			serviceTransaction.processTransaction(
					new Transaction(null, null, account.getAccountNumber(), 0, account.getBalance(), 2));
		account.setAccountStatus("inactive".toUpperCase());
		account.setLastUpdated(Utility.getCurrentTime());
		Account a = repoAccount.save(account);
		if (a == null)
			return new ResponseEntity<Response>(ConstantFunction.createObject(false, Constants.SERVER_ERROR, null),
					HttpStatus.OK);

		return new ResponseEntity<Response>(ConstantFunction.createObject(true, Constants.SUCCESS_MSG, account),
				HttpStatus.OK);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.service.AccountServiceInterface#getAccountByAccountNo(long)
	 */
	@Override
	public ResponseEntity<Response> getAccountByAccountNo(long accountNumber) {

		if (accountNumber == 0)
			return new ResponseEntity<Response>(ConstantFunction.createObject(false, Constants.INVALID_REQUEST, null),
					HttpStatus.BAD_REQUEST);
		Account account = repoAccount.getAccountByAccountNumber(accountNumber);
		if (account == null)
			return new ResponseEntity<Response>(ConstantFunction.createObject(false, Constants.SERVER_ERROR, null),
					HttpStatus.OK);

		return new ResponseEntity<Response>(ConstantFunction.createObject(true, Constants.SUCCESS_MSG, account),
				HttpStatus.OK);
	}

}
