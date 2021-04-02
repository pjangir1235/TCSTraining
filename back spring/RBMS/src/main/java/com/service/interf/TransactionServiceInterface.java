package com.service.interf;

import org.springframework.http.ResponseEntity;

import com.bean.Response;
import com.bean.Transaction;

public interface TransactionServiceInterface {

	ResponseEntity<Response> processTransaction(Transaction transaction);

	ResponseEntity<Response> getNTransactions(long accountNo, int noOfTransactions);

	ResponseEntity<Response> getTransactionsBetweenDate(long accountNo, String startDate, String endDate);

}