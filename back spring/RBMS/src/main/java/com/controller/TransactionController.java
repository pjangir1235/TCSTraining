package com.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bean.Response;
import com.bean.Transaction;
import com.service.interf.TransactionServiceInterface;
import com.util.Constants;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class TransactionController {

	@Autowired
	TransactionServiceInterface serviceTrans;

	@GetMapping(Constants.GET_STATEMENT_BY_DATE+"/{accountNo}/{startDate}/{endDate}")
	public ResponseEntity<Response> getTransactionByDate(@PathVariable("accountNo") long accountNo,@PathVariable("startDate") String startDate,@PathVariable("endDate") String endDate) {
		return serviceTrans.getTransactionsBetweenDate(accountNo, startDate, endDate);
	}

	@GetMapping(Constants.GET_STATEMENT+"/{accountNo}/{noOfTransactions}")
	public ResponseEntity<Response> getTransactionByNo(@PathVariable("accountNo") long accountNo,@PathVariable("noOfTransactions") int noOfTransactions) {
		return serviceTrans.getNTransactions(accountNo, noOfTransactions);
	}
	
	
	
	
	@PostMapping(Constants.PROCESS_TRANSACTION_ENDPOINT)
	public ResponseEntity<Response> addTransaction(@RequestBody Transaction trans) {
		return serviceTrans.processTransaction(trans);
	}


}
