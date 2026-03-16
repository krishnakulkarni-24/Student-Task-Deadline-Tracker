package jar.services;

import org.springframework.stereotype.Service;
import jar.repository.TaskRepository;
import jar.dto.TaskRequestDTO;
import jar.dto.TaskResponseDTO;
import jar.exception.ResourceNotFoundException;
import jar.model.Task;
import jar.model.User;

import java.time.LocalDate;
import java.util.List;

@Service
public class TaskServices {
    private final TaskRepository taskRepository;
    public TaskServices(TaskRepository taskRepository){
        this.taskRepository=taskRepository;
    }

    //Creating task
    public TaskResponseDTO createTask(TaskRequestDTO dto, User user) {

        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setSubject(dto.getSubject());
        task.setDescription(dto.getDescription());
        task.setDeadline(dto.getDeadline());
        task.setStatus("PENDING");
        task.setCreatedAt(LocalDate.now());
        task.setUser(user);

        Task saved = taskRepository.save(task);

        return new TaskResponseDTO(
                saved.getId(),
                saved.getTitle(),
                saved.getSubject(),
                saved.getDescription(),
                saved.getDeadline(),
                saved.getStatus(),
                saved.getCreatedAt()
            );
    }

    //Getting all tasks of a user
    public List<TaskResponseDTO> getTasksByUser(User user) {

        List<Task> tasks = taskRepository.findByUser(user);

        for (Task task : tasks) {
            if (task.getDeadline().isBefore(LocalDate.now())
                    && !task.getStatus().equals("COMPLETED")) {
                task.setStatus("OVERDUE");
                taskRepository.save(task);
            }
        }

        return tasks.stream()
                .map(task -> new TaskResponseDTO(
                        task.getId(),
                        task.getTitle(),
                        task.getSubject(),
                        task.getDescription(),
                        task.getDeadline(),
                        task.getStatus(),
                        task.getCreatedAt()
                ))
                .toList();
    }

    //Updating task
    public Task updateTask(Long id,Task updatedTask){
        Task task=taskRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Task  not found"));
        task.setTitle(updatedTask.getTitle());
        task.setSubject(updatedTask.getSubject());
        task.setDescription(updatedTask.getDescription());
        task.setDeadline(updatedTask.getDeadline());
        task.setStatus(updatedTask.getStatus());
        return taskRepository.save(task);
    }

    //Deleting task
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
