package com.unisannio.repositories;

import org.springframework.data.repository.CrudRepository;

import com.unisannio.entities.User;

public interface UsersRepository extends CrudRepository<User, Long> {
    
    User findByUsername(String username); // is provided with functionality automatically
    
}
