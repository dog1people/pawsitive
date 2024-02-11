package com.pawsitive.usergroup.repository;

import com.pawsitive.usergroup.entity.User;

import java.util.Optional;

import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface UserRepositoryCustom {

    Integer findUserNoByEmail(String email);

}
