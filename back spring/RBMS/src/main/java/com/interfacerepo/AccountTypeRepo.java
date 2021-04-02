package com.interfacerepo;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bean.AccountType;
@Repository
public interface AccountTypeRepo extends CrudRepository<AccountType, Long> {
	
}
