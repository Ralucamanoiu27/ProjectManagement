package com.sda10.finalproject.projectmanagement.controller;

import com.sda10.finalproject.projectmanagement.dto.UserDto;
import com.sda10.finalproject.projectmanagement.dto.UserMapper;
import com.sda10.finalproject.projectmanagement.exception.NotFoundException;
import com.sda10.finalproject.projectmanagement.model.User;
import com.sda10.finalproject.projectmanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.sda10.finalproject.projectmanagement.controller.UserController.API_USERS;

@RestController
@RequestMapping(API_USERS)
public class UserController {

    public static final String API_USERS = "/api/users";
    private final UserService userService;

    // TODO: move mapper to service and perform transformation there
    private final UserMapper userMapper;

    @Autowired
    public UserController(UserMapper userMapper, UserService userService) {
        this.userMapper = userMapper;
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> findById(@PathVariable Long id) {
        User user = userService.findById(id)
                .orElseThrow(() -> new NotFoundException("user with id " + id + " not found"));
        UserDto response = userMapper.toDto(user);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<UserDto> create(@RequestBody UserDto details) {
        User user = userMapper.toEntity(details);
        user = userService.create(user);
        UserDto response = userMapper.toDto(user);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody UserDto newDetails) {
        User user = userMapper.toEntity(newDetails);
        userService.update(id, user);
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        userService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // TODO: create a different mapping in case you need findAll()
    @GetMapping
    public ResponseEntity<UserDto> findByNameOrEmail(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email) {
        User user = userService.findByNameOrEmail(name, email)
                .orElseThrow(() -> new NotFoundException("user with name " + name +
                        "and email" + email + " not found"));

        UserDto response = userMapper.toDto(user);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // TODO: convert to response entity of list of user dto
    @GetMapping("/search")
    public List<UserDto> findByName(@RequestParam(required = false) String name) {
        return userService.findByUserName(name)
                .stream()
                .map(userMapper::toDto)
                .collect(Collectors.toList());
    }

}
