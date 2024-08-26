package com.example.guide.authentication.payload.response;

public class UserRoleResponse {
    private String username;
    private String role;

    private Long id;

    public UserRoleResponse(){}

    public UserRoleResponse(String username, String role) {
        this.username = username;
        this.role = role;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
}
