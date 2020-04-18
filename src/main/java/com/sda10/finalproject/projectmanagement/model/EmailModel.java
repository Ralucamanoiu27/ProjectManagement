package com.sda10.finalproject.projectmanagement.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailModel {

    private String username;

    private String emailTo;

    private String emailFrom;

    private String subject;

    private String message;
}
