package com.interfacerepo;

import java.sql.Timestamp;
import java.util.ArrayList;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bean.Account;
import com.util.Queries;

@Repository
public interface AccountRepo extends CrudRepository<Account, Long> {

	@Query
	public Account getAccountByAccountNumber(long accountNumber);

	@Query(value = Queries.UPDATEACCOUNTTIMESTAMP, nativeQuery = true)
	public boolean updateAccountTimestamp(Timestamp time, long accountNo);

	@Query(value = Queries.VIEWACCOUNTBYCUSTOMERID, nativeQuery = true)
	public ArrayList<Account> viewAccountByCustomerId(long customerID);


	@Query(value = Queries.REMOVEACCOUNT, nativeQuery = true)
	public Account removeAccount(long accountNo);
	
	@Query(value = Queries.FETCHACCOUNTBYACCOUNTNO, nativeQuery = true)
	public ArrayList<Account> searchAccountByAccountNo(String filterText);

	@Query(value = Queries.FETCHACCOUNTBYCUSTOMERID, nativeQuery = true)
	public ArrayList<Account> searchAccountByCustomerId(String filterText);

	@Query(value = Queries.FETCHACCOUNTBYSTATUS, nativeQuery = true)
	public ArrayList<Account> searchAccountByStatus(String filterText);
	
	@Query(value = Queries.FETCHACCOUNT, nativeQuery = true)
	public ArrayList<Account> searchAllAccount();

	
	
	
}
