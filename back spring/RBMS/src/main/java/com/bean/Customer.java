package com.bean;

import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "RBMS_CUSTOMER")
public class Customer {

	@Id
	@Column(name = "CUSTOMER_ID")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CUST_SEQ")
	@SequenceGenerator(sequenceName = "Customer_Id_Generator", name = "CUST_SEQ", allocationSize = 1)
	private Long customerId;
	@Column(name = "SSN_ID", unique = true)
	private String ssnId;
	@Column(name = "NAME")
	private String name;
	@Column(name = "DOB")
	private Date dob;
	@Column(name = "EMAIL")
	private String email;
	@Column(name = "CONTACT")
	private String contact;
	@Column(name = "CURRENT_STATUS")
	private String currentStatus;
	@Column(name = "MESSAGE")
	private String message;
	@Column(name = "ADDRESS1")
	private String address1;
	@Column(name = "ADDRESS2", nullable = true)
	private String address2;
	@Column(name = "CITY")
	private String city;
	@Column(name = "PINCODE")
	private int pincode;
	@Column(name = "DOC")
	private Date doc;
	@Column(name = "LAST_UPDATED")
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Timestamp lastUpdated;

	public Customer(String ssnId, String name, Date dob, String email, String contact, String address1, String address2,
			String city, int pincode) {
		super();
		this.ssnId = ssnId;
		this.name = name;
		this.dob = dob;
		this.email = email;
		this.contact = contact;
		this.address1 = address1;
		this.address2 = address2;
		this.city = city;
		this.pincode = pincode;
	}

	public Customer() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Customer(Long customerId, String ssnId, String name, Date dob, String email, String contact,
			String currentStatus, String message, String address1, String address2, String city, int pincode, Date doc,
			Timestamp lastUpdated) {
		super();
		this.customerId = customerId;
		this.ssnId = ssnId;
		this.name = name;
		this.dob = dob;
		this.email = email;
		this.contact = contact;
		this.currentStatus = currentStatus;
		this.message = message;
		this.address1 = address1;
		this.address2 = address2;
		this.city = city;
		this.pincode = pincode;
		this.doc = doc;
		this.lastUpdated = lastUpdated;
	}

	public String getAddress1() {
		return address1;
	}

	public void setAddress1(String address1) {
		this.address1 = address1;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public String getSsnId() {
		return ssnId;
	}

	public void setSsnId(String ssnId) {
		this.ssnId = ssnId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getCurrentStatus() {
		return currentStatus;
	}

	public void setCurrentStatus(String currentStatus) {
		this.currentStatus = currentStatus;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public int getPincode() {
		return pincode;
	}

	public void setPincode(int pincode) {
		this.pincode = pincode;
	}

	public Date getDoc() {
		return doc;
	}

	public void setDoc(Date doc) {
		this.doc = doc;
	}

	public Timestamp getLastUpdated() {
		return lastUpdated;
	}

	public void setLastUpdated(Timestamp lastUpdated) {
		this.lastUpdated = lastUpdated;
	}

	@Override
	public String toString() {
		return "Customer [customerId=" + customerId + ", ssnId=" + ssnId + ", name=" + name + ", dob=" + dob
				+ ", email=" + email + ", contact=" + contact + ", currentStatus=" + currentStatus + ", message="
				+ message + ", address1=" + address1 + ", address2=" + address2 + ", city=" + city + ", pincode="
				+ pincode + ", doc=" + doc + ", lastUpdated=" + lastUpdated + "]";
	}
	

}