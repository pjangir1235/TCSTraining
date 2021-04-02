package com.bean;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "RBMS_USERS")
public class Authentication {

	@Id
	@Column(name="USER_ID")
	/* @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CUST_SEQ")
    @SequenceGenerator(sequenceName = "customer_seq", allocationSize = 1, name = "CUST_SEQ")*/
	private int userID;
	@Column(name="USER_NAME")
	private String userName;
	@Column(name="PASSWORD")
	private String password;
	@Column(name="USER_TYPE")
	private String userType;
	@Column(name="LAST_LOG_IN")
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Timestamp timestamp;

	public Authentication() {
		super();
	}

	public Authentication(int userID, String userName, String password, String userType, Timestamp timestamp) {
		super();
		this.userID = userID;
		this.userName = userName;
		this.password = password;
		this.userType = userType;
		this.timestamp = timestamp;
	}

	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public Timestamp getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Timestamp timestamp) {
		this.timestamp = timestamp;
	}

	@Override
	public String toString() {
		return "Authentication [userID=" + userID + ", userName=" + userName + ", password=" + password + ", userType="
				+ userType + ", timestamp=" + timestamp + "]";
	}

	
}
