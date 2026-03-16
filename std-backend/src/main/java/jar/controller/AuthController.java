package jar.controller;

import jar.dto.LoginRequestDto;
import jar.dto.RegisterRequestDto;
import jar.model.User;
import jar.services.UserService;
import jar.security.*;
import java.util.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequestDto request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        return userService.register(user);
    }

    @PostMapping("/login")
    public Map<String,String> login(@RequestBody LoginRequestDto request) {
        User user=userService.login(request.getEmail(), request.getPassword());
        String token = jwtUtil.generateToken(user.getEmail());
        return Map.of("token", token,"name",user.getName());
    }
}