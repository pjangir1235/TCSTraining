package com.bean;

public class Response {
	
	boolean status;
	String message;
	Object object;
	public Response() {
		super();
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Object getObject() {
		return object;
	}
	public void setObject(Object object) {
		this.object = object;
	}
	public Response(boolean status, String message, Object object) {
		super();
		this.status = status;
		this.message = message;
		this.object = object;
	}

}
