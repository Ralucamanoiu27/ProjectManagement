package com.sda10.finalproject.projectmanagement.service;

import com.sda10.finalproject.projectmanagement.exception.NotFoundException;
import com.sda10.finalproject.projectmanagement.model.Project;
import com.sda10.finalproject.projectmanagement.model.Sprint;
import com.sda10.finalproject.projectmanagement.model.User;
import com.sda10.finalproject.projectmanagement.repository.SprintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SprintService {

    private final SprintRepository sprintRepository;

    @Autowired
    public SprintService(SprintRepository sprintRepository) {
        this.sprintRepository = sprintRepository;
    }

    public List<Sprint> findAll() {
        return sprintRepository.findAll();
    }

    public Optional<Sprint> findById(Long id) {
        return sprintRepository.findById(id);
    }

    public List<Sprint> findByName(String name) {
        return sprintRepository.findByNameContaining(name);
    }

    public Sprint save(Sprint sprint) {
        if (!sprint.getDateFrom().isBefore(sprint.getDateTo())) {
            throw new IllegalArgumentException("Sprint interval is not valid");
        }
        if (sprintOverLapsWithExistingSprint(sprint)) {
            throw new IllegalArgumentException("Sprint interval overlaps with existing sprints");
        }
        return sprintRepository.save(sprint);
    }

    private boolean sprintOverLapsWithExistingSprint(Sprint sprint) {
        List<Sprint> existingSprints = sprintRepository.findByProject(sprint.getProject());
        for (Sprint existingSprint : existingSprints) {
            if (sprint.getDateFrom().isAfter(existingSprint.getDateFrom())
                    && sprint.getDateFrom().isBefore(existingSprint.getDateTo())) {
                return true;
            }
            if (sprint.getDateTo().isAfter(existingSprint.getDateFrom()) &&
                    sprint.getDateTo().isBefore(existingSprint.getDateTo())) {
                return true;
            }
        }
        return false;
    }

    // TODO: investigate this
    public Sprint update(Long id, Sprint sprint) {
        Optional<Sprint> sprintOptional = sprintRepository.findById(id);

        if (sprintOptional.isPresent()) {
            sprint.setId(id);
            return sprintRepository.save(sprint);
        } else {
            throw new NotFoundException("Sprint with id does not exist: " + id);
        }
    }

    public void delete(Long id) {
        Sprint existingSprint = sprintRepository
                .findById(id)
                .orElseThrow(RuntimeException::new);
        sprintRepository.delete(existingSprint);
    }

}
