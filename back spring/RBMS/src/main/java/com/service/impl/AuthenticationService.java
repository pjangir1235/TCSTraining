package com.service.impl;

import com.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.bean.Authentication;
import com.bean.Response;
import com.interfacerepo.AuthenticationRepo;
import com.service.interf.AuthenticationServiceInterface;

@Service
public class AuthenticationService implements AuthenticationServiceInterface {

	@Autowired
	AuthenticationRepo repo;

	/* (non-Javadoc)
	 * @see com.service.impl.AuthenticationServiceInterface#authenticate(com.bean.Authentication)
	 */
	@Override
	public ResponseEntity<Response> authenticate(Authentication user) {

		if (user.getUserName() == null || user.getUserName().isEmpty() || user.getPassword() == null
				|| user.getPassword().isEmpty()) {

			return new ResponseEntity<Response>(ConstantFunction.createObject(false, Constants.INVALID_REQUEST, null),
					HttpStatus.BAD_REQUEST);

		}
		String passWord = Utility.getMd5(user.getPassword());
		user.setPassword(passWord);

		Authentication auth = repo.checkUser(user.getUserName(), user.getPassword());
		if (auth == null) {
			return new ResponseEntity<Response>(ConstantFunction.createObject(false, Constants.USER_FAIL, null),
					HttpStatus.OK);

		}
		
		auth.setTimestamp(Utility.getCurrentTime());
		Authentication auth1=auth;
		repo.save(auth);
		
		return new ResponseEntity<Response>(ConstantFunction.createObject(true, Constants.SUCCESS_MSG, auth1),
				HttpStatus.OK);

	}

}
