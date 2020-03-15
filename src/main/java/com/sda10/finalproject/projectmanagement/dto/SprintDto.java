package com.sda10.finalproject.projectmanagement.dto;

import java.time.LocalDate;
import java.util.Objects;

public class SprintDto {

    public Long id;

    // public ProjectDto projectDto;
    public String name;
    public LocalDate dateFrom;
    public LocalDate dateTo;
    public String plannedStoryPoint;
    public ProjectDto project;


    private SprintDto() {
    }

    public static SprintDto sprintDto() {
        return new SprintDto();
    }

    public SprintDto setId(Long id) {
        this.id = id;
        return this;
    }

    public SprintDto setName(String name) {
        this.name = name;
        return this;
    }

    public SprintDto setDateFrom(LocalDate dateFrom) {
        this.dateFrom = dateFrom;
        return this;
    }

    public SprintDto setDateTo(LocalDate dateTo) {
        this.dateTo = dateTo;
        return this;
    }

    public SprintDto setPlannedStoryPoint(String plannedStoryPoint) {
        this.plannedStoryPoint = plannedStoryPoint;
        return this;
    }


    public SprintDto setProjectDto(ProjectDto project) {
        this.project = project;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SprintDto sprintDto = (SprintDto) o;
        return Objects.equals(id, sprintDto.id) &&
                Objects.equals(name, sprintDto.name)&&
                Objects.equals(project, sprintDto.project) &&
                Objects.equals(dateFrom, sprintDto.dateFrom) &&
                Objects.equals(dateTo, sprintDto.dateTo) &&
                Objects.equals(plannedStoryPoint, sprintDto.plannedStoryPoint);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, project, dateFrom, dateTo, plannedStoryPoint);
    }
}
