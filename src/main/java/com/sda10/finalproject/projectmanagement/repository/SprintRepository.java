package com.sda10.finalproject.projectmanagement.repository;

import com.sda10.finalproject.projectmanagement.model.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SprintRepository extends JpaRepository<Sprint,Long> {

}