package com.sda10.finalproject.projectmanagement.controller;

import com.sda10.finalproject.projectmanagement.dto.SprintDto;
import com.sda10.finalproject.projectmanagement.dto.SprintMapper;
import com.sda10.finalproject.projectmanagement.exception.NotFoundException;
import com.sda10.finalproject.projectmanagement.model.Sprint;
import com.sda10.finalproject.projectmanagement.service.SprintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.sda10.finalproject.projectmanagement.controller.SprintController.API_SPRINT;

@RestController
@RequestMapping(API_SPRINT)
public class SprintController {

    public static final String API_SPRINT = "/api/sprints";
    private final SprintService sprintService;

    // TODO: move mapper to service and perform transformation there
    private final SprintMapper sprintMapper;

    @Autowired
    public SprintController(SprintMapper sprintMapper, SprintService sprintService) {
        this.sprintMapper = sprintMapper;
        this.sprintService = sprintService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<SprintDto> findById(@PathVariable Long id) {
        Sprint sprint = sprintService.findById(id)
                .orElseThrow(() -> new NotFoundException("sprint with id " + id + " not found"));
        SprintDto response = sprintMapper.toDto(sprint);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<SprintDto> create(@RequestBody SprintDto details) {
        Sprint sprint = sprintMapper.toEntity(details);
        sprint = sprintService.save(sprint);
        SprintDto response = sprintMapper.toDto(sprint);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody SprintDto newDetails) {
        Sprint sprint = sprintMapper.toEntity(newDetails);
        sprintService.update(id, sprint);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        sprintService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

