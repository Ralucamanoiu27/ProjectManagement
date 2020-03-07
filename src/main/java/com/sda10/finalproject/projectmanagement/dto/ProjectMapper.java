package com.sda10.finalproject.projectmanagement.dto;


import com.sda10.finalproject.projectmanagement.model.Project;
import com.sda10.finalproject.projectmanagement.model.User;
import org.springframework.stereotype.Component;

@Component
public class ProjectMapper {

    private final UserMapper userMapper;

    public ProjectMapper(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public Project toEntity(ProjectDto projectDto) {
        User user = userMapper.toEntity(projectDto.administrator);

        Project project = new Project();
        project.setAdministrator(user);
        project.setId(projectDto.id);
        project.setName(projectDto.name);
        project.setDescription(projectDto.description);

        return project;
    }

    public ProjectDto toDto(Project project) {
        UserDto userDto = userMapper.toDto(project.getAdministrator());
        return ProjectDto.projectDto()
                .setId(project.getId())
                .setName(project.getName())
                .setDescription(project.getDescription())
                .setAdministrator(userDto);
    }

}
