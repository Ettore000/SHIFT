package com.unisannio.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
    
    // will only respond to GET requests on the '/' URL
    @RequestMapping("/")
    public String index() {
        return "index";
    }    

}
