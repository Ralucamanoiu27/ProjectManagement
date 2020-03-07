package com.sda10.finalproject.projectmanagement.dto;

import com.sda10.finalproject.projectmanagement.model.Role;

import java.util.Objects;

public class UserDto {

    public Long id;
    public String username;
    public String password;
    public String email;
    public String displayName;
    public Role role;

    private UserDto() {
    }

    public static UserDto userDto() {
        return new UserDto();
    }

    public UserDto setId(Long id) {
        this.id = id;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public UserDto setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public UserDto setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public UserDto setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getDisplayName() {
        return displayName;
    }

    public UserDto setDisplayName(String displayName) {
        this.displayName = displayName;
        return this;
    }

    public Role getRole() {
        return role;
    }

    public UserDto setRole(Role role) {
        this.role = role;
        return this;
    }

    public Long getId() {
        return id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserDto userDto = (UserDto) o;
        return Objects.equals(username, userDto.username) &&
                Objects.equals(password, userDto.password) &&
                Objects.equals(email, userDto.email) &&
                Objects.equals(displayName, userDto.displayName) &&
                role == userDto.role &&
                Objects.equals(id, userDto.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, password, email, displayName, role, id);
    }

}
