package com.sda10.finalproject.projectmanagement.dto;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class ProjectDtoTest {

    // TODO: use assertJ syntax: assertThat(actual).isEqualTo(expected)
    @Test
    public void givenTwoEqualProjects_whenCompared_theResultIsTrue() {
        ProjectDto projectDto1 = ProjectDto.projectDto()
                .setId(123L)
                .setName("proiect1")
                .setDescription("aaaa")
                .setAdministrator(UserDto.userDto());

        ProjectDto projectDto2 = ProjectDto.projectDto()
                .setId(123L)
                .setName("proiect1")
                .setDescription("aaaa")
                .setAdministrator(UserDto.userDto());

        boolean comparisionResult = projectDto1.equals(projectDto2);
        assertTrue(comparisionResult);
    }

    @Test
    public void givenTwoProjectsWithDifferentIds_whenComparedTheResultIsFalse() {
        ProjectDto projectDto1 = ProjectDto.projectDto()
                .setId(1234L);


        ProjectDto projectDto2 = ProjectDto.projectDto()
                .setId(123L);


        boolean comparisionResult = projectDto1.equals(projectDto2);
        assertFalse(comparisionResult);
    }

    @Test
    public void givenTwoProjectsWithDifferentNames_whenComparedTheResultIsFalse() {
        ProjectDto projectDto1 = ProjectDto.projectDto()
                .setName("proiect1");


        ProjectDto projectDto2 = ProjectDto.projectDto()
                .setName("proiect2");


        boolean comparisionResult = projectDto1.equals(projectDto2);
        assertFalse(comparisionResult);
    }

    @Test
    public void givenTwoProjectsWithDifferentDescription_whenComparedTheResultIsFalse() {
        ProjectDto projectDto1 = ProjectDto.projectDto()
                .setDescription("ppppp");


        ProjectDto projectDto2 = ProjectDto.projectDto()
                .setDescription("pppppp");


        boolean comparisionResult = projectDto1.equals(projectDto2);
        assertFalse(comparisionResult);
    }

    @Test
    public void givenTwoProjectsWithDifferentAdministrator_whenComparedTheResultIsFalse() {
        ProjectDto projectDto1 = ProjectDto.projectDto()
                .setAdministrator(UserDto.userDto().setId(1l));

        ProjectDto projectDto2 = ProjectDto.projectDto()
                .setAdministrator(UserDto.userDto().setId(2l));


        boolean comparisionResult = projectDto1.equals(projectDto2);
        Assertions.assertFalse(comparisionResult);
    }

}
