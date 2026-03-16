package jar.dto;

import java.time.LocalDate;
import jakarta.validation.constraints.*;

public class TaskRequestDTO {
    
    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Subject is required")
    private String subject;

    private String description;

    @NotNull(message = "Deadline is required")
    @Future(message = "Deadline must be a future date")
    private LocalDate deadline;

    public String getTitle(){ return title; }
    public void setTitle(String title){this.title=title;}

    public String getSubject(){return subject;}
    public void setSubject(String subject){this.subject=subject;}

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getDeadline() { return deadline; }
    public void setDeadline(LocalDate deadline) { this.deadline = deadline; }
}
