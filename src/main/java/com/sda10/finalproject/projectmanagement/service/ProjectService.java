package com.sda10.finalproject.projectmanagement.service;

import com.sda10.finalproject.projectmanagement.exception.NotFoundException;
import com.sda10.finalproject.projectmanagement.model.Project;
import com.sda10.finalproject.projectmanagement.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProjectService {

    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    // read

    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    public Optional<Project> findById(Long id) {
        return projectRepository.findById(id);
    }

    public List<Project> findByName(String name) {
        return projectRepository.findByNameContaining(name);
    }

    // create

    public Project save(Project project) {
        return projectRepository.save(project);
    }

    // update

    public Project update(Long id, Project project) {
        Optional<Project> projectOptional = projectRepository.findById(id);

        if (projectOptional.isPresent()) {
            project.setId(id);
            return projectRepository.save(project);
        } else {
            throw new NotFoundException("Project with id does not exist: " + id);
        }
    }

    // delete

    public void delete(Long id) {
        Project existingProject = projectRepository
                .findById(id)
                .orElseThrow(RuntimeException::new);
        projectRepository.delete(existingProject);
    }

}
