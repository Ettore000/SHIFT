package com.unisannio.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.unisannio.entities.User;
import com.unisannio.repositories.UsersRepository;

@Service
public class UsersService {
    
    @Autowired // facilitates access to repositories
    private UsersRepository usersRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public void addUser(User user) {
        // will encrypt the password before save the user
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        usersRepository.save(user);
    }

    public User getUserByUsername(String username) {
        return usersRepository.findByUsername(username);
    }

}
