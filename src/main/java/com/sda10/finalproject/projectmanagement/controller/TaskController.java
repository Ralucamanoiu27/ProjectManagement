package com.sda10.finalproject.projectmanagement.controller;

import com.sda10.finalproject.projectmanagement.dto.TaskDto;
import com.sda10.finalproject.projectmanagement.dto.TaskMapper;
import com.sda10.finalproject.projectmanagement.exception.NotFoundException;
import com.sda10.finalproject.projectmanagement.model.Task;
import com.sda10.finalproject.projectmanagement.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.sda10.finalproject.projectmanagement.controller.TaskController.API_TASKS;

@RestController
@RequestMapping(API_TASKS)
public class TaskController {

    public static final String API_TASKS = "/api/tasks";
    private final TaskService taskService;

    // TODO: move mapper to service and perform transformation there
    private final TaskMapper taskMapper;

    @Autowired
    public TaskController(TaskMapper taskMapper, TaskService taskService) {
        this.taskMapper = taskMapper;
        this.taskService = taskService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDto> findById(@PathVariable Long id) {
        Task task = taskService.findById(id)
                .orElseThrow(() -> new NotFoundException("task with id " + id + " not found"));
        TaskDto response = taskMapper.toDto(task);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<TaskDto> create(@RequestBody TaskDto details) {
        Task task = taskMapper.toEntity(details);
        task = taskService.create(task);
        TaskDto response = taskMapper.toDto(task);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody TaskDto newDetails) {
        Task task = taskMapper.toEntity(newDetails);
        taskService.update(id, task);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        taskService.deleteTask(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

