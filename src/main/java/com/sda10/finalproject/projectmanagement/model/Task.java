package com.sda10.finalproject.projectmanagement.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Entity
@Table(name = Task.TASK_TABLE)
public class Task {

    public static final String TASK_TABLE = "TASKS";

    @Id
    @GeneratedValue
    private Long id;

    @Column
    @NotNull
    private String nameTask;

    @Column
    @NotNull
    private String descriptionTask;

    @ManyToOne
    @JoinColumn(name = "sprint_id", referencedColumnName = "id")
    @NotNull
    private Sprint sprint;

    @Column
    @NotNull
    private Difficulty difficulty;

    @Column
    @NotNull
    private String storyPoints;

    @Column
    @NotNull
    private Progress progress;

    @ManyToOne
    @JoinColumn(name = "assignPerson_id", referencedColumnName = "id")
    @NotNull
    private User assignedPerson;

    public Long getId() {
        return id;
    }

    public Task setId(Long id) {
        this.id = id;
        return this;
    }

    public String getNameTask() {
        return nameTask;
    }

    public Task setNameTask(String nameTask) {
        this.nameTask = nameTask;
        return this;
    }

    public String getDescriptionTask() {
        return descriptionTask;
    }

    public Task setDescriptionTask(String descriptionTask) {
        this.descriptionTask = descriptionTask;
        return this;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public Task setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
        return this;
    }

    public String getStoryPoints() {
        return storyPoints;
    }

    public Task setStoryPoints(String storyPoints) {
        this.storyPoints = storyPoints;
        return this;
    }

    public Progress getProgress() {
        return progress;
    }

    public Task setProgress(Progress progress) {
        this.progress = progress;
        return this;
    }

    public Sprint getSprint() {
        return sprint;
    }

    public Task setSprint(Sprint sprint) {

        this.sprint = sprint;
        return this;
    }

    public User getAssignedPerson() {
        return assignedPerson;
    }

    public Task setAssignedPerson(User assignedPerson) {
        this.assignedPerson = assignedPerson;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Task task = (Task) o;
        return Objects.equals(id, task.id) &&
                Objects.equals(nameTask, task.nameTask) &&
                Objects.equals(descriptionTask, task.descriptionTask) &&
                Objects.equals(sprint, task.sprint) &&
                difficulty == task.difficulty &&
                Objects.equals(storyPoints, task.storyPoints) &&
                progress == task.progress &&
                Objects.equals(assignedPerson, task.assignedPerson);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nameTask, descriptionTask, sprint, difficulty, storyPoints, progress, assignedPerson);
    }
}
