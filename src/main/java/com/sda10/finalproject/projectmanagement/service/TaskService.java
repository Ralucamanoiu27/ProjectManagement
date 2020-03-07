package com.sda10.finalproject.projectmanagement.service;

import com.sda10.finalproject.projectmanagement.exception.NotFoundException;
import com.sda10.finalproject.projectmanagement.model.Task;
import com.sda10.finalproject.projectmanagement.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task create(Task task) {
        return taskRepository.save(task);
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
