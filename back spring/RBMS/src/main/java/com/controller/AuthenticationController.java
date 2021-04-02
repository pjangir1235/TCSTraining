package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bean.Authentication;
import com.bean.Response;
import com.service.interf.AuthenticationServiceInterface;
import com.util.Constants;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class AuthenticationController {
	@Autowired
	AuthenticationServiceInterface service;

	@PostMapping(value = Constants.AUTHENTICATE_USER)
	public ResponseEntity<Response> checkAuthentication(@RequestBody Authentication user) {
		return service.authenticate(user);
	}
}
