package com.sda10.finalproject.projectmanagement.config;

import com.sda10.finalproject.projectmanagement.model.Project;
import com.sda10.finalproject.projectmanagement.model.Role;
import com.sda10.finalproject.projectmanagement.model.Sprint;
import com.sda10.finalproject.projectmanagement.model.User;
import com.sda10.finalproject.projectmanagement.repository.ProjectRepository;
import com.sda10.finalproject.projectmanagement.repository.SprintRepository;
import com.sda10.finalproject.projectmanagement.repository.UserRepository;
import com.sda10.finalproject.projectmanagement.service.SprintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
public class MockDataConfig {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private SprintRepository sprintRepository;

    @Autowired
    private SprintService sprintService;

    @Bean
    public CommandLineRunner mockData() {
        return args -> {
            User savedUser = userRepository.save(createUser());

            Project savedProject = projectRepository.save(createProject(savedUser));

            sprintRepository.save(createSprint(savedProject));
        };
    }

    private User createUser() {
        User user = new User();
        user.setUsername("jon");
        user.setPassword("pass");
        user.setEmail("jonsnow@gmail.com");
        user.setDisplayName("jon snow");
        user.setRole(Role.ADMIN);
        return user;
    }

    private Project createProject(User user) {
        Project project = new Project();
        project.setName("project1");
        project.setDescription("test project");
        project.setAdministrator(user);
        return project;
    }

    private Sprint createSprint(Project project) {
        Sprint sprint = new Sprint();
        sprint.setDateFrom(LocalDate.now());
        sprint.setDateTo(LocalDate.now().plusDays(1));
        sprint.setPlannedStoryPoint("1");
        sprint.setProject(project);
        return sprint;
    }
}
