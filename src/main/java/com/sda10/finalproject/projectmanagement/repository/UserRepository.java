package com.sda10.finalproject.projectmanagement.repository;

import com.sda10.finalproject.projectmanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    List<User> findByUsernameContaining(String username);

    Optional<User> findByEmail(String email);
}
