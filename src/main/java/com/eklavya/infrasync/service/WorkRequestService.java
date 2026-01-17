package com.eklavya.infrasync.service;

import com.eklavya.infrasync.model.WorkRequest;
import com.eklavya.infrasync.repository.WorkRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Service
public class WorkRequestService {

    @Autowired
    private WorkRequestRepository repository;

    // The 5 official departments involved in the approval chain
    private final List<String> ALL_DEPARTMENTS = Arrays.asList(
            "Water Dept", "Roads Dept", "Electricity Dept", "Gas Dept", "Telecom Dept"
    );

    public WorkRequest createWorkRequest(WorkRequest request) {
        // If this is a NEW request (id is null), initialize the approval matrix
        if (request.getId() == null) {
            request.setCreatedDate(LocalDate.now()); // Set today's date for the 5-day timer
            request.setStatus("Under Review");

            // Loop through all departments to set initial status
            for (String dept : ALL_DEPARTMENTS) {
                if (dept.equals(request.getDepartment())) {
                    // The department creating the request implicitly approves it (marked as CREATOR)
                    request.getDepartmentApprovals().put(dept, "CREATOR");
                } else {
                    // Everyone else is set to PENDING
                    request.getDepartmentApprovals().put(dept, "PENDING");
                }
            }
        }
        return repository.save(request);
    }

    public List<WorkRequest> getAllRequests() {
        return repository.findAll();
    }

    // Logic for a department to Approve/Reject a specific project
    public WorkRequest updateApproval(Long requestId, String departmentName, String status) {
        WorkRequest request = repository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        // Update the specific department's status in the map
        request.getDepartmentApprovals().put(departmentName, status);

        // (Optional) Check if everyone has approved to mark the whole project as APPROVED
        boolean allApproved = request.getDepartmentApprovals().values().stream()
                .noneMatch(s -> s.equals("PENDING") || s.equals("REJECTED"));

        if (allApproved) {
            request.setStatus("APPROVED");
        }

        return repository.save(request);
    }
}