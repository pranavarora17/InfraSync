package com.eklavya.infrasync.controller;

import com.eklavya.infrasync.model.WorkRequest;
import com.eklavya.infrasync.service.WorkRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/work-requests")
@CrossOrigin(origins = "*") // Allow frontend access
public class WorkRequestController {

    @Autowired
    private WorkRequestService service;

    // Create a new request (broadcasts to all departments)
    @PostMapping
    public WorkRequest createRequest(@RequestBody WorkRequest request) {
        return service.createWorkRequest(request);
    }

    // Get all requests
    @GetMapping
    public List<WorkRequest> getAllRequests() {
        return service.getAllRequests();
    }

    // NEW: Individual Department Approval Endpoint
    // Example Call: PUT /api/work-requests/5/approve?department=Gas Dept&status=APPROVED
    @PutMapping("/{id}/approve")
    public WorkRequest approveRequest(
            @PathVariable Long id,
            @RequestParam String department,
            @RequestParam String status) { // status = APPROVED or REJECTED
        return service.updateApproval(id, department, status);
    }
}