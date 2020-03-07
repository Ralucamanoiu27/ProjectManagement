package com.sda10.finalproject.projectmanagement.controller;

import com.sda10.finalproject.projectmanagement.dto.ProjectDto;
import com.sda10.finalproject.projectmanagement.dto.ProjectMapper;
import com.sda10.finalproject.projectmanagement.exception.NotFoundException;
import com.sda10.finalproject.projectmanagement.model.Project;
import com.sda10.finalproject.projectmanagement.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.sda10.finalproject.projectmanagement.controller.ProjectController.API_PROJECTS;

@RestController
@RequestMapping(API_PROJECTS)
public class ProjectController {

    public static final String API_PROJECTS = "/api/projects";

    private ProjectService projectService;

    // TODO: move mapper to service and perform transformation there
    private ProjectMapper projectMapper;

    @Autowired
    public ProjectController(ProjectService projectService, ProjectMapper projectMapper) {
        this.projectService = projectService;
        this.projectMapper = projectMapper;
    }

    @PostMapping()
    public ProjectDto createProject(@RequestBody ProjectDto projectDetails) {
        Project project = projectMapper.toEntity(projectDetails);
        project = projectService.save(project);

        return projectMapper.toDto(project);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto> getProjectById(@PathVariable Long id) {
        Project project = projectService.findById(id)
                .orElseThrow(() -> new NotFoundException("project with id " + id + " not found"));

        ProjectDto response = projectMapper.toDto(project);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateProject(@PathVariable Long id, @RequestBody ProjectDto projectDetails) {
        Project project = projectMapper.toEntity(projectDetails);
        projectService.update(id, project);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteProject(@PathVariable Long id) {
        projectService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public List<ProjectDto> searchAll() {
        return projectService.findAll()
                .stream()
                .map(projectMapper::toDto)
                .collect(Collectors.toList());
    }

//    @GetMapping
//    public ResponseEntity<ProjectDto> searchProjectByNameProject(@RequestParam(required = false) String name) {
//        Project project =projectService.searchProjectByNameProject(name).orElseThrow(NotFoundException::new);
//        ProjectDto response =projectMapper.toDto(project);
//        return new ResponseEntity<>(response,HttpStatus.OK);
//
//    }

    @GetMapping("/search")
    public List<ProjectDto> searchProjectByName(@RequestParam(required = false) String name) {
        return projectService.findByName(name)
                .stream()
                .map(projectMapper::toDto)
                .collect(Collectors.toList());
    }

}
