package com.sda10.finalproject.projectmanagement.dto;

import com.sda10.finalproject.projectmanagement.model.Progress;

import java.util.Objects;

public class TaskDto {

    public Long id;
    public String nameTask;
    public String descriptionTask;
    public SprintDto sprint;
    public String difficulty;
    public String storyPoints;
    public Progress progress;
    public UserDto assignedPerson;

    private TaskDto() {
    }

    public static TaskDto taskDto() {
        return new TaskDto();
    }

    public TaskDto setId(Long id) {
        this.id = id;
        return this;
    }

    public TaskDto setNameTask(String nameTask) {
        this.nameTask = nameTask;
        return this;
    }

    public TaskDto setDescriptionTask(String descriptionTask) {
        this.descriptionTask = descriptionTask;
        return this;
    }

    public TaskDto setSprint(SprintDto sprint) {
        this.sprint = sprint;
        return this;
    }

    public TaskDto setDifficulty(String difficulty) {
        this.difficulty = difficulty;
        return this;
    }

    public TaskDto setStoryPoints(String storyPoints) {
        this.storyPoints = storyPoints;
        return this;
    }

    public TaskDto setProgress(Progress progress) {
        this.progress = progress;
        return this;
    }

    public TaskDto setAssignedPerson(UserDto assignedPerson) {
        this.assignedPerson = assignedPerson;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TaskDto taskDto = (TaskDto) o;
        return Objects.equals(id, taskDto.id) &&
                Objects.equals(nameTask, taskDto.nameTask) &&
                Objects.equals(descriptionTask, taskDto.descriptionTask) &&
                Objects.equals(sprint, taskDto.sprint) &&
                Objects.equals(difficulty, taskDto.difficulty) &&
                Objects.equals(storyPoints, taskDto.storyPoints) &&
                progress == taskDto.progress &&
                Objects.equals(assignedPerson, taskDto.assignedPerson);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nameTask, descriptionTask, sprint, difficulty, storyPoints, progress, assignedPerson);
    }
}
