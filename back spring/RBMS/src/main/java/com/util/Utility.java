package com.util;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;

import java.util.Calendar;



public class Utility {

	public static Timestamp getCurrentTime() {
		return new Timestamp(Calendar.getInstance().getTimeInMillis());
	}

	public static String generateTransactionId(long sourceAccountId, long targetAccountId) {
		StringBuilder builder = new StringBuilder();

		if (sourceAccountId != 0) {
			String source=sourceAccountId+"";
			builder.append(source.substring(0, 2) + source.substring(source.length() - 3));
		} else {
			builder.append("SELF");
		}

		builder.append(Calendar.getInstance().getTimeInMillis());

		if (targetAccountId != 0) {
			String target=targetAccountId+"";
			builder.append(target.substring(0, 2) + target.substring(target.length() - 3));
		} else {
			builder.append("SELF");
		}

		return builder.toString();
	}


	

	public static String getMd5(String input) {
		try {

			// Static getInstance method is called with hashing MD5
			MessageDigest md = MessageDigest.getInstance("MD5");

			// digest() method is called to calculate message digest
			// of an input digest() return array of byte
			byte[] messageDigest = md.digest(input.getBytes());

			// Convert byte array into signum representation
			BigInteger no = new BigInteger(1, messageDigest);

			// Convert message digest into hex value
			String hashtext = no.toString(16);
			while (hashtext.length() < 32) {
				hashtext = "0" + hashtext;
			}
			return hashtext;
		}

		// For specifying wrong message digest algorithms
		catch (NoSuchAlgorithmException e) {
			return null;
		}
	}

}
