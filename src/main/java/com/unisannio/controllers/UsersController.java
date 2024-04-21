package com.unisannio.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.unisannio.entities.User;
import com.unisannio.services.*;
import com.unisannio.validators.SignUpFormValidator;

@Controller
public class UsersController {

    @Autowired
    private UsersService usersService;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private SignUpFormValidator signUpFormValidator;

    @Autowired
    private RolesService rolesService;

    // post method is what performs fields validation 
    @RequestMapping(value="/signup", method=RequestMethod.POST)
    public String signup(@Validated User user, BindingResult result) {
        signUpFormValidator.validate(user, result);
        if (result.hasErrors())
            return "signup";
        user.setRole(rolesService.getRoles()[0]); // CLIENT
        usersService.addUser(user);
        securityService.autoLogin(user.getUsername(), user.getPasswordConfirm());
        return "redirect:home";
    }

    @RequestMapping(value="/signup", method=RequestMethod.GET)
    public String signup(Model model) {
        model.addAttribute("user", new User());
        return "signup";
    }
    
    @RequestMapping(value="/login", method=RequestMethod.GET)
    public String login() {
        return "login";
    }
    
}
