package com.sda10.finalproject.projectmanagement.service;

import com.sda10.finalproject.projectmanagement.model.User;
import com.sda10.finalproject.projectmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Transactional
    public User create(User user) {
        return userRepository.save(user);
    }

    @Transactional
    public User update(Long id, User user) {
        userRepository.findById(id)
                .orElseThrow(RuntimeException::new);

        user.setId(id);
        return userRepository.save(user);
    }

    @Transactional
    public void delete(Long id) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(RuntimeException::new);
        userRepository.delete(existingUser);
    }

    public Optional<User> findByNameOrEmail(String name, String email) {
        if (name != null) {
            return userRepository.findByUsername(name);
        }
        if (email != null) {
            return userRepository.findByEmail(email);
        }
        return Optional.empty();
    }

    public List<User> findByUserName(String name) {
        return userRepository.findByUsernameContaining(name);
    }
}
