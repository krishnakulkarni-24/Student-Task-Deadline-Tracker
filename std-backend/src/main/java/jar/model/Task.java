package jar.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name ="tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String title;

    private String subject;

    @Column(length=1000)
    private String description;

    @Column(nullable=false)
    private LocalDate deadline;

    @Column(nullable=false)
    private String status;   // PENDING / COMPLETED / OVERDUE

    private LocalDate createdAt;

    // Many tasks belong to one user
    @ManyToOne
    @JoinColumn(name="user_id",nullable=false)
    private User user;
}
