package com.sda10.finalproject.projectmanagement.dto;

import com.sda10.finalproject.projectmanagement.model.Sprint;
import com.sda10.finalproject.projectmanagement.model.Task;
import com.sda10.finalproject.projectmanagement.model.User;
import org.springframework.stereotype.Component;

@Component
public class TaskMapper {

    private final UserMapper userMapper;
    private final SprintMapper sprintMapper;

    public TaskMapper(UserMapper userMapper, SprintMapper sprintMapper) {
        this.userMapper = userMapper;
        this.sprintMapper = sprintMapper;
    }

    public Task toEntity(TaskDto taskDto) {
        Task task = new Task();

        User user = userMapper.toEntity(taskDto.assignedPerson);
        Sprint sprint = sprintMapper.toEntity(taskDto.sprint);

        task.setAssignedPerson(user);
        task.setSprint(sprint);
        task.setId(taskDto.id);
        task.setDescriptionTask(taskDto.descriptionTask);
        task.setDifficulty(taskDto.difficulty);
        task.setNameTask(taskDto.nameTask);
        task.setProgress(taskDto.progress);
        task.setStoryPoints(taskDto.storyPoints);

        return task;
    }

    public TaskDto toDto(Task task) {
        UserDto userDto = userMapper.toDto(task.getAssignedPerson());
        SprintDto sprintDto = sprintMapper.toDto(task.getSprint());
        return TaskDto.taskDto()
                .setId(task.getId())
                .setNameTask(task.getNameTask())
                .setDescriptionTask(task.getDescriptionTask())
                .setDifficulty(task.getDifficulty())
                .setProgress(task.getProgress())
                .setStoryPoints(task.getStoryPoints())
                .setAssignedPerson(userDto)
                .setSprint(sprintDto);
    }

}
