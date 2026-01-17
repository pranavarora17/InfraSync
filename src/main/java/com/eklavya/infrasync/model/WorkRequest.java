package com.eklavya.infrasync.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "work_requests")
public class WorkRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String department;
    private String location;

    @Column(length = 1000)
    private String description;

    // --- DETAILED FIELDS (Kept from your version) ---
    private String contractorName;
    private String methodology;
    private int progress;
    private String currentStage;
    // -----------------------------------------

    private LocalDate startDate;
    private LocalDate endDate;

    private String status;
    private String conflictReason;

    // --- NEW: CHAT LOG (Kept from your version) ---
    // ... other fields ...

    // CHANGE THIS: Use 'columnDefinition' to allow unlimited text
    @Column(columnDefinition = "TEXT")
    private String collaborationLog;

    // ... getters and setters ...


    // ==================================================================================
    // NEW FIELDS FOR APPROVAL SYSTEM & DEADLINES
    // ==================================================================================

    // 1. Tracks when the request was officially created (For 5-Day Rule)
    private LocalDate createdDate;

    // 2. Stores approval status for EACH department separately
    // Example Data: { "Gas Dept": "PENDING", "Roads Dept": "APPROVED" }
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "project_approvals", joinColumns = @JoinColumn(name = "work_id"))
    @MapKeyColumn(name = "department_name")
    @Column(name = "approval_status")
    private Map<String, String> departmentApprovals = new HashMap<>();

    // ==================================================================================
    // GETTERS & SETTERS
    // ==================================================================================

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getConflictReason() { return conflictReason; }
    public void setConflictReason(String conflictReason) { this.conflictReason = conflictReason; }

    public String getContractorName() { return contractorName; }
    public void setContractorName(String contractorName) { this.contractorName = contractorName; }
    public String getMethodology() { return methodology; }
    public void setMethodology(String methodology) { this.methodology = methodology; }
    public int getProgress() { return progress; }
    public void setProgress(int progress) { this.progress = progress; }
    public String getCurrentStage() { return currentStage; }
    public void setCurrentStage(String currentStage) { this.currentStage = currentStage; }

    public String getCollaborationLog() { return collaborationLog; }
    public void setCollaborationLog(String collaborationLog) { this.collaborationLog = collaborationLog; }

    // New Getters for Approvals
    public LocalDate getCreatedDate() { return createdDate; }
    public void setCreatedDate(LocalDate createdDate) { this.createdDate = createdDate; }

    public Map<String, String> getDepartmentApprovals() { return departmentApprovals; }
    public void setDepartmentApprovals(Map<String, String> departmentApprovals) { this.departmentApprovals = departmentApprovals; }
}