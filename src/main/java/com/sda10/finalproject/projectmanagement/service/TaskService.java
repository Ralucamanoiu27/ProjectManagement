package com.sda10.finalproject.projectmanagement.service;

import com.sda10.finalproject.projectmanagement.exception.NotFoundException;
import com.sda10.finalproject.projectmanagement.model.Sprint;
import com.sda10.finalproject.projectmanagement.model.Task;
import com.sda10.finalproject.projectmanagement.model.User;
import com.sda10.finalproject.projectmanagement.repository.SprintRepository;
import com.sda10.finalproject.projectmanagement.repository.TaskRepository;
import com.sda10.finalproject.projectmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository  userRepository;
    private final SprintRepository sprintRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository, UserRepository userRepository, SprintRepository sprintRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.sprintRepository = sprintRepository;
    }

    public Task create(Task task) {
        Optional<User> user = userRepository.findById(task.getAssignedPerson().getId());
        Optional<Sprint> sprint = sprintRepository.findById(task.getSprint().getId());

        return taskRepository.save(task.setAssignedPerson(user.get()).setSprint(sprint.get()));
    }

    public Optional<Task> findById(Long id) {
        return taskRepository.findById(id);
    }

    public Task update(Long id, Task task) {
        Optional<Task> taskOptional = taskRepository.findById(id);
        if (taskOptional.isPresent()) {
            task.setId(id);
            return taskRepository.save(task);
        } else {
            throw new NotFoundException("Task with id does not exist: " + id);
        }
    }

    public void deleteTask (Long id) {
        Task existingTask = taskRepository
                .findById(id)
                .orElseThrow(RuntimeException::new);
        taskRepository.delete(existingTask);
    }
}
