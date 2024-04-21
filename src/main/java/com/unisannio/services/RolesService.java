package com.unisannio.services;

import org.springframework.stereotype.Service;

@Service
public class RolesService {
    
    String[] roles = {"CLIENT", "ADMIN"};
    public String[] getRoles() {
        return roles;
    }

}
