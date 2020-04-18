package com.sda10.finalproject.projectmanagement.controller;
/**
 * Copyright (c) 2017 CoySoft, All Rights Reserved
 * Contains proprietary and confidential information owned by CoySoft.
 */
/**
 * Copyright (c) 2017 CoySoft, All Rights Reserved
 * Contains proprietary and confidential information owned by CoySoft.
 */


import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.ws.rs.core.Response;

import com.sda10.finalproject.projectmanagement.model.EmailModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;



/**
 * Service to send emails.
 *
 * @author kcoy - Kevin Coy
 * @version 1.0
 */
@RestController
@RequestMapping("/email")
public class EmailController {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmailController.class);

    @Autowired
    private JavaMailSender javaMailSender;

    @RequestMapping(value = "/", method = RequestMethod.POST, consumes = "application/json")
    public Response sendEmail(@RequestBody EmailModel emailModel) {
        LOGGER.info("Sending email");

        MimeMessage mail = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mail, true);
            helper.setTo(emailModel.getEmailTo());
            helper.setReplyTo(emailModel.getEmailFrom());
            helper.setFrom(emailModel.getEmailFrom());
            helper.setSubject(emailModel.getSubject());
            helper.setText("From: " + emailModel.getUsername() + "\n" + emailModel.getMessage());
        } catch (MessagingException e) {
            LOGGER.error("Failed to send email: " + emailModel.toString(), e);
        } finally {}
        javaMailSender.send(mail);

        return Response.accepted().build();
    }
}
