package com.eklavya.infrasync.repository;

import com.eklavya.infrasync.model.WorkRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WorkRequestRepository extends JpaRepository<WorkRequest, Long> {
    List<WorkRequest> findByLocation(String location);
}