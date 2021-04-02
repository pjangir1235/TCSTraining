package com.interfacerepo;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bean.Customer;
import com.util.Queries;

@Repository
public interface CustomerRepo extends CrudRepository<Customer, Long> {

	@Query
	public Customer getCustomerBySsnId(String SSNID);

	@Query
	public Customer getCustomerByCustomerId(Long customerId);

	@Query(value = Queries.CUSTOMERSEARCHBYSSN, nativeQuery = true)
	public ArrayList<Customer> searchCustomersBySSN(String filterText);

	@Query(value = Queries.CUSTOMERSEARCHBYNAME, nativeQuery = true)
	public ArrayList<Customer> searchCustomersByName(String filterText);

	@Query(value = Queries.CUSTOMERSEARCHBYCONTACT, nativeQuery = true)
	public ArrayList<Customer> searchCustomersByContact(String filterText);

	@Query(value = Queries.CUSTOMERSEARCHBYEMAIL, nativeQuery = true)
	public ArrayList<Customer> searchCustomersByEmail(String filterText);

	@Query(value = Queries.CUSTOMERSEARCHBYSTATUS, nativeQuery = true)
	public ArrayList<Customer> searchCustomersByStatus(String filterText);

	@Query(value = Queries.CUSTOMERSEARCHALL, nativeQuery = true)
	public ArrayList<Customer> searchAllCustomer();



}
