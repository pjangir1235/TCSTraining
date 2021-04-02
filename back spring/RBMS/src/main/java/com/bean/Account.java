package com.bean;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "RBMS_ACCOUNT")
public class Account {
	@Id
	@Column(name = "ACCOUNT_NO")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Account_SEQ")
	@SequenceGenerator(sequenceName = "SEQUENCE_ACCOUNT_NO", name = "Account_SEQ", allocationSize = 1)
	private long accountNumber;
	@Column(name = "BALANCE")
	private double balance;
	@Column(name = "ACCOUNT_STATUS")
	private String accountStatus;
	@Column(name = "TYPE_ID")
	private int typeId;
	@Column(name = "CUSTOMER_ID")
	private long customerID;
	@Column(name = "DOC")
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Timestamp doc;
	@Column(name = "LAST_UPDATED")
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Timestamp lastUpdated;
	@OneToOne
	@JoinColumn(name = "TYPE_ID", insertable = false, updatable = false, referencedColumnName = "TYPE_ID")
	private AccountType type;
	@ManyToOne
	@JoinColumn(name = "CUSTOMER_ID", insertable = false, updatable = false)
	private Customer customer;

	public Account() {
		super();
	}

	public Account(long accountNumber, double balance, String accountStatus, int typeId, long customerID,
			Timestamp doc, Timestamp lastUpdated, AccountType type, Customer customer) {
		super();
		this.accountNumber = accountNumber;
		this.balance = balance;
		this.accountStatus = accountStatus;
		this.typeId = typeId;
		this.customerID = customerID;
		this.doc = doc;
		this.lastUpdated = lastUpdated;
		this.type = type;
		this.customer = customer;
	}

	public Account(long accountNumber, double balance, String accountStatus, int typeId, long customerID,
			Timestamp doc, Timestamp lastUpdated, AccountType type) {
		super();
		this.accountNumber = accountNumber;
		this.balance = balance;
		this.accountStatus = accountStatus;
		this.typeId = typeId;
		this.customerID = customerID;
		this.doc = doc;
		this.lastUpdated = lastUpdated;
		this.type = type;
	}

	public Account(long accountNumber, double balance, String accountStatus, int typeId, long customerID,
			Timestamp doc, Timestamp lastUpdated) {
		super();
		this.accountNumber = accountNumber;
		this.balance = balance;
		this.accountStatus = accountStatus;
		this.typeId = typeId;
		this.customerID = customerID;
		this.doc = doc;
		this.lastUpdated = lastUpdated;
		this.type = new AccountType();
	}

	public long getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(long accountNumber) {
		this.accountNumber = accountNumber;
	}

	public double getBalance() {
		return balance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}

	public String getAccountStatus() {
		return accountStatus;
	}

	public void setAccountStatus(String accountStatus) {
		this.accountStatus = accountStatus;
	}

	public int getTypeId() {
		return typeId;
	}

	public void setTypeId(int typeId) {
		this.typeId = typeId;
	}

	public long getCustomerID() {
		return customerID;
	}

	public void setCustomerID(long customerID) {
		this.customerID = customerID;
	}

	public Timestamp getDoc() {
		return doc;
	}

	public void setDoc(Timestamp doc) {
		this.doc = doc;
	}

	public Timestamp getLastUpdated() {
		return lastUpdated;
	}

	public void setLastUpdated(Timestamp lastUpdated) {
		this.lastUpdated = lastUpdated;
	}

	public AccountType getType() {
		return type;
	}

	public void setType(AccountType type) {
		this.type = type;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

}
