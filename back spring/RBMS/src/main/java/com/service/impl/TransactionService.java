package com.service.impl;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.bean.Response;
import com.bean.Transaction;
import com.interfacerepo.TransactionRepo;
import com.service.interf.AccountServiceInterface;
import com.service.interf.TransactionServiceInterface;
import com.util.ConstantFunction;
import com.util.Constants;
import com.util.Utility;

@Service
public class TransactionService implements TransactionServiceInterface {

	@Autowired
	TransactionRepo repoTransaction;
	@Autowired
	AccountServiceInterface accService;

	/* (non-Javadoc)
	 * @see com.service.impl.TransactionServiceInterface#processTransaction(com.bean.Transaction)
	 */
	@Override
	public ResponseEntity<Response> processTransaction(Transaction transaction) {

		if (transaction == null) {
			return new ResponseEntity<Response>(ConstantFunction.createObject(false, Constants.INVALID_REQUEST, null),
					HttpStatus.BAD_REQUEST);

		}

		if (transaction.getAmount() <= 0) {
			return new ResponseEntity<Response>(ConstantFunction.createObject(false, Constants.NEGATIVE_BALANCE, null),
					HttpStatus.OK);
		}
		transaction.setDate(Utility.getCurrentTime());
		transaction.setTransactionId(
				Utility.generateTransactionId(transaction.getSourceAccountId(), transaction.getTargetAccountId()));
		Transaction t = repoTransaction.save(transaction);
		accService.updateBalance(transaction.getSourceAccountId(), transaction.getAmount(),
				transaction.getTargetAccountId());

		if (t == null) {
			return new ResponseEntity<Response>(ConstantFunction.createObject(false, Constants.SERVER_ERROR, null),
					HttpStatus.OK);
		}
		return new ResponseEntity<Response>(ConstantFunction.createObject(true, Constants.SUCCESS_MSG, t),
				HttpStatus.OK);
	}

	/* (non-Javadoc)
	 * @see com.service.impl.TransactionServiceInterface#getNTransactions(long, int)
	 */
	@Override
	public ResponseEntity<Response> getNTransactions(long accountNo, int noOfTransactions) {

		if (accountNo == 0) {
			return new ResponseEntity<Response>(ConstantFunction.createObject(false, Constants.INVALID_REQUEST, null),
					HttpStatus.BAD_REQUEST);

		}

		ArrayList<Transaction> transactions = repoTransaction.getNTransactions(accountNo, accountNo, noOfTransactions);

		if (transactions == null) {
			return new ResponseEntity<Response>(ConstantFunction.createObject(false, Constants.SERVER_ERROR, null),
					HttpStatus.OK);
		}
		return new ResponseEntity<Response>(ConstantFunction.createObject(true, Constants.SUCCESS_MSG, transactions),
				HttpStatus.OK);
	}

	/* (non-Javadoc)
	 * @see com.service.impl.TransactionServiceInterface#getTransactionsBetweenDate(long, java.lang.String, java.lang.String)
	 */
	@SuppressWarnings("deprecation")
	@Override
	public ResponseEntity<Response> getTransactionsBetweenDate(long accountNo, String startDate, String endDate) {

		if (startDate == null || endDate == null || accountNo == 0)
			return new ResponseEntity<Response>(ConstantFunction.createObject(false, Constants.INVALID_REQUEST, null),
					HttpStatus.BAD_REQUEST);
		startDate = startDate + " 00:00:00.000";
		endDate = endDate + " 00:00:00.000";
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS");

		Timestamp startDateTimeStamp = null, endDateTimeStamp = null;

		try {

			startDateTimeStamp = new Timestamp(dateFormat.parse(startDate).getTime());
			Date d = dateFormat.parse(endDate);
			d.setDate(d.getDate() + 1);
			endDateTimeStamp = new Timestamp(d.getTime());
		} catch (ParseException e) {

			e.printStackTrace();
		}
		ArrayList<Transaction> trans = repoTransaction.getDateTransaction(startDateTimeStamp, endDateTimeStamp,
				accountNo, accountNo);
		if (trans != null)
			return new ResponseEntity<Response>(ConstantFunction.createObject(true, Constants.SUCCESS_MSG, trans),
					HttpStatus.OK);
		return new ResponseEntity<Response>(
				ConstantFunction.createObject(false, Constants.TRANSACTION_NOT_AVAILABLE, null), HttpStatus.OK);

	}

}
