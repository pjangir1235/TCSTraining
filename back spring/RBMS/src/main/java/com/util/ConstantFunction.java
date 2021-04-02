package com.util;

import com.bean.Response;

public class ConstantFunction {

	public static Response createObject(boolean status, String message, Object object)
	{
			return new Response(status, message, object);
	}
}
