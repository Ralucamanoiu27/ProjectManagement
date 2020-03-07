package com.sda10.finalproject.projectmanagement.model;

public enum Difficulty {

    ONE("UNU"), TWO("DOI"), THREE("TREI"), FOUR("PATRU"), FIVE("CINCI");

    private String value;

    Difficulty(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
