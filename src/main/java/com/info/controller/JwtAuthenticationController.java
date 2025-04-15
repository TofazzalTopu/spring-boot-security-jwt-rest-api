package com.info.controller;

import com.info.model.RefreshTokenRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.info.service.JwtUserDetailsService;


import com.info.config.JwtTokenUtil;
import com.info.model.JwtRequest;
import com.info.model.JwtResponse;
import com.info.model.UserDTO;

import java.util.HashMap;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String accessToken = jwtTokenUtil.generateToken(userDetails, true);
        final String refresh_token = jwtTokenUtil.generateToken(userDetails, false);

        return ResponseEntity.ok(new JwtResponse(accessToken, refresh_token));
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody UserDTO user) throws Exception {
        return ResponseEntity.ok(userDetailsService.save(user));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody RefreshTokenRequest request) {
        if (!jwtTokenUtil.isTokenValid(request.getRefreshToken()))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");

        String username = jwtTokenUtil.getUsernameFromToken(request.getRefreshToken());
        String newAccessToken = jwtTokenUtil.doGenerateToken(new HashMap<>(), username, false);
        return ResponseEntity.ok(new JwtResponse(newAccessToken, request.getRefreshToken()));
    }

}