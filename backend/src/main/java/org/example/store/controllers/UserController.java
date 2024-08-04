package org.example.store.controllers;

import jakarta.validation.Valid;
import org.example.store.model.User;
import org.example.store.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RequestMapping("/carStore/v1/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody User user){
        User loginUser = userService.getUserByLogin(user.getLogin())
                .get();
        return ResponseEntity.ok()
                .header("X-СarStore-API-Version", "1.0")
                .header("X-СarStore-API-Status", "Success")
                .header("Content-Language", "en-US")
                .header("X-RateLimit-Limit", "no-limit")
                .header("Accept-Language", "en-US")
                .header("Cache-Control", "max-age=1200, must-revalidate")
                .header("Access-Control-Allow-Origin", "http://localhost:5173")
                .header("ETag", String.valueOf(System.identityHashCode(loginUser.getId())))
                .header("X-Content-Type-Options", "nosniff")
                .header("Strict-Transport-Security", "max-age=31536000; includeSubdomains")
                .contentType(MediaType.APPLICATION_JSON)
                .contentLength(loginUser.getId().toString().getBytes().length)
                .body(loginUser.getId());
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid  @RequestBody User user){
        User saveUser = userService.saveUser(user);
        return ResponseEntity.ok()
                .header("X-СarStore-API-Version", "1.0")
                .header("X-СarStore-API-Status", "Success")
                .header("Content-Language", "en-US")
                .header("X-RateLimit-Limit", "no-limit")
                .header("Accept-Language", "en-US")
                .header("Cache-Control", "max-age=1200, must-revalidate")
                .header("Access-Control-Allow-Origin", "http://localhost:5173")
                .header("ETag", String.valueOf(System.identityHashCode(saveUser.getId())))
                .header("X-Content-Type-Options", "nosniff")
                .header("Strict-Transport-Security", "max-age=31536000; includeSubdomains")
                .contentType(MediaType.APPLICATION_JSON)
                .contentLength(saveUser.getId().toString().getBytes().length)
                .body(saveUser.getId());
    }
}
