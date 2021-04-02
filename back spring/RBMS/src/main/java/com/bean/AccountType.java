package com.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "RBMS_ACCOUNT_TYPE")
public class AccountType {
	@Id
	@Column(name = "TYPE_ID")
	private int typeId;
	@Column(name = "TYPE_NAME")
	private String typeName;
	@Column(name = "MIN_BALANCE")
	private double minBalance;
	public AccountType(int typeId, String typeName, double minBalance) {
		super();
		this.typeId = typeId;
		this.typeName = typeName;
		this.minBalance = minBalance;
	}
	public AccountType() {
		super();
	}
	public int getTypeId() {
		return typeId;
	}
	public void setTypeId(int typeId) {
		this.typeId = typeId;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public double getMinBalance() {
		return minBalance;
	}
	public void setMinBalance(double minBalance) {
		this.minBalance = minBalance;
	}



}
