package com.example.busreservation.dto;

import java.util.List;

public class AuthResponse {
    private String token;
    private Long id;
    private String name;
    private String email;
    private String mobile;
    private List<String> roles;

    public AuthResponse() {}

    public AuthResponse(String token, Long id, String name, String email, String mobile, List<String> roles) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.roles = roles;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public List<String> getRoles() { return roles; }
    public void setRoles(List<String> roles) { this.roles = roles; }
}
