package com.bean;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;


@Entity
@Table(name = "RBMS_TRANSACTION")
public class Transaction {

	
	@Id
	@Column(name = "TRANSACTION_ID")
	private String transactionId;
	@Column(name = "DOT")
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Timestamp date;
	@Column(name = "SOURCE")
	private long sourceAccountId;
	@Column(name = "TARGET")
	private long targetAccountId;
	@Column(name = "AMOUNT")
	private double amount;
	@Column(name = "TRANSACTION_TYPE")
	private int transactionType;

	//1  - DEPOSIT
	//2  - WITHDRAW
	//3  - TRANSFER
	
	public Transaction() {
		
	}

	public Transaction(String transactionId, Timestamp date, long sourceAccountId, long targetAccountId, double amount,
			int transactionType) {
	
		this.transactionId = transactionId;
		this.date = date;
		this.sourceAccountId = sourceAccountId;
		this.targetAccountId = targetAccountId;
		this.amount = amount;
		this.transactionType = transactionType;
	}

	public String getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	public Timestamp getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}

	public long getSourceAccountId() {
		return sourceAccountId;
	}

	public void setSourceAccountId(long sourceAccountId) {
		this.sourceAccountId = sourceAccountId;
	}

	public long getTargetAccountId() {
		return targetAccountId;
	}

	public void setTargetAccountId(long targetAccountId) {
		this.targetAccountId = targetAccountId;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public int getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(int transactionType) {
		this.transactionType = transactionType;
	}

	
	
		
}
