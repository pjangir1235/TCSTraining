package com.interfacerepo;

import java.sql.Timestamp;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bean.Authentication;
import com.util.Queries;

@Repository
public interface AuthenticationRepo extends CrudRepository<Authentication, Long> {

  @Query(value = Queries.CHECKUSER,nativeQuery=true)
  public Authentication checkUser(String userName, String password);
  @Query(value = Queries.UPDATETOLOGIN,nativeQuery=true)
  public void updateTimeStamp(Timestamp lastLogin, String userName);
}
