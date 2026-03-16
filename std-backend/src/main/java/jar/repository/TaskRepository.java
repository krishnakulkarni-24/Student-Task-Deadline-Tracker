package jar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import jar.model.Task;
import jar.model.User;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Long> {
    List<Task>findByUser(User user);    
}
