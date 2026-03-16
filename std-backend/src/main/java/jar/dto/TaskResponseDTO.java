package jar.dto;

import java.time.LocalDate;

public class TaskResponseDTO{
    private Long id;
    private String title;
    private String subject;
    private String description;
    private LocalDate deadline;
    private String status;
    private LocalDate createdAt;

    public TaskResponseDTO(Long id,String title,String subject,String description,LocalDate deadline,String status,LocalDate createdAt) {
        this.id=id;
        this.title=title;
        this.subject=subject;
        this.description=description;
        this.deadline=deadline;
        this.status=status;
        this.createdAt=createdAt;
    }
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getSubject() { return subject; }
    public String getDescription() { return description; }
    public LocalDate getDeadline() { return deadline; }
    public String getStatus() { return status; }
    public LocalDate getCreatedAt() { return createdAt; }
}
