package com.service.interf;

import org.springframework.http.ResponseEntity;

import com.bean.Authentication;
import com.bean.Response;

public interface AuthenticationServiceInterface {

	ResponseEntity<Response> authenticate(Authentication user);

}