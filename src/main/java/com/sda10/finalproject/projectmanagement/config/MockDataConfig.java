package com.sda10.finalproject.projectmanagement.config;

import com.sda10.finalproject.projectmanagement.model.*;
import com.sda10.finalproject.projectmanagement.repository.ProjectRepository;
import com.sda10.finalproject.projectmanagement.repository.SprintRepository;
import com.sda10.finalproject.projectmanagement.repository.TaskRepository;
import com.sda10.finalproject.projectmanagement.repository.UserRepository;
import com.sda10.finalproject.projectmanagement.service.SprintService;
import com.sda10.finalproject.projectmanagement.service.TaskService;
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
    private TaskRepository taskRepository;

    @Bean
    public CommandLineRunner mockData() {
        return args -> {
            User savedUser = userRepository.save(createUser());

            Project savedProject = projectRepository.save(createProject(savedUser));

            Sprint savedSprint = sprintRepository.save(createSprint(savedProject));

            taskRepository.save(createTask(savedSprint, savedUser));
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
        sprint.setName("sprint1");
        sprint.setDateFrom(LocalDate.now());
        sprint.setDateTo(LocalDate.now().plusDays(1));
        sprint.setPlannedStoryPoint("1");
        sprint.setProject(project);
        return sprint;
    }
    private Task createTask(Sprint sprint, User user){
        Task task = new Task();
        task.setNameTask("task1");
        task.setDescriptionTask("test task");
        task.setSprint(sprint);
        task.setDifficulty(Difficulty.FOUR);
        task.setStoryPoints("1");
        task.setProgress(Progress.IN_PROGRESS);
        task.setAssignedPerson(user);
        return task;
    }
}
