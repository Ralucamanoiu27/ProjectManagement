package com.sda10.finalproject.projectmanagement.dto;

import com.sda10.finalproject.projectmanagement.model.Project;
import com.sda10.finalproject.projectmanagement.model.Sprint;
import org.springframework.stereotype.Component;

@Component
public class SprintMapper {

    private final ProjectMapper projectMapper;

    public SprintMapper(ProjectMapper projectMapper) {
        this.projectMapper = projectMapper;
    }

    public Sprint toEntity(SprintDto sprintDto) {
        Sprint sprint = new Sprint();

        Project project = projectMapper.toEntity(sprintDto.project);

        sprint.setId(sprintDto.id);
        sprint.setProject(project);
        sprint.setName(sprintDto.name);
        sprint.setDateFrom(sprintDto.dateFrom);
        sprint.setDateTo(sprintDto.dateTo);
        sprint.setPlannedStoryPoint(sprintDto.plannedStoryPoint);

        return sprint;
    }

    public SprintDto toDto(Sprint sprint) {
        ProjectDto projectDto = projectMapper.toDto(sprint.getProject());
        return SprintDto.sprintDto()
                .setId(sprint.getId())
                .setName(sprint.getName())
                .setProjectDto(projectDto)
                .setDateFrom(sprint.getDateFrom())
                .setDateTo(sprint.getDateTo())
                .setPlannedStoryPoint(sprint.getPlannedStoryPoint());

    }
}



