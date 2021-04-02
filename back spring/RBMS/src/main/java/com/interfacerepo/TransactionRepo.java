package com.interfacerepo;


import java.sql.Timestamp;
import java.util.ArrayList;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bean.Transaction;
import com.util.Queries;
@Repository
public interface TransactionRepo extends CrudRepository<Transaction, Long> {
	
	@Query(value = Queries.TRANSACTIONNVALUE, nativeQuery = true)
	public ArrayList<Transaction> getNTransactions(long sourceAccountNo,long targetAccountNo, int noOfTransactions);
	@Query(value = Queries.TRANSACTIONGETBETWEENDATE, nativeQuery = true)
	public ArrayList<Transaction> getDateTransaction(Timestamp startDateTimeStamp, Timestamp endDateTimeStamp ,long sourceAccountNo,long targetAccountNo);
}
