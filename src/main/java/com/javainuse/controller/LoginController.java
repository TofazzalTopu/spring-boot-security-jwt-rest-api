package com.javainuse.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping(value = "/login")
public class LoginController {

    @RequestMapping(value = "/loginForm", method = RequestMethod.GET)
    public ModelAndView login(Model model, String error, String logout) {
        if (error != null)
            model.addAttribute("error", "Your username and password is invalid.");

        if (logout != null)
            model.addAttribute("message", "You have been logged out successfully.");

        ModelAndView view = new ModelAndView();
        view.setViewName("login/login");
        return view;
    }

    @RequestMapping(value = { "/", "/welcome" }, method = RequestMethod.GET)
    public String welcome(Model model) {
        return "index";
    }

    @RequestMapping(value = { "/view" }, method = RequestMethod.GET)
    public String view(Model model) {
        Authentication s = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Authentication== "+ s);
        return "regitration";
    }

    @RequestMapping(value = { "/loginFailed" }, method = RequestMethod.GET)
    public String loginFailed(Model model) {
        return "index";
    }
}
