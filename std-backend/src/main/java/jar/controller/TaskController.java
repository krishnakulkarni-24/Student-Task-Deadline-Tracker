package jar.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.*;

import jar.dto.TaskRequestDTO;
import jar.dto.TaskResponseDTO;
import jar.model.Task;
import jar.model.User;
import jar.repository.UserRepository;
import jar.services.TaskServices;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskServices taskServices;
    private final UserRepository userRepository;
    public TaskController(TaskServices taskServices, UserRepository userRepository){
        this.taskServices=taskServices;
        this.userRepository=userRepository;
    }
    private User getLoggedInUser(Authentication authentication){
        String email=authentication.getName();
        return userRepository.findByEmail(email).orElseThrow(()->new RuntimeException("User not found"));
    }
    
    //Create task
    @PostMapping
    public TaskResponseDTO createTask(@Valid @RequestBody TaskRequestDTO dto, Authentication authentication){
        User user=getLoggedInUser(authentication);
        return taskServices.createTask(dto,user);
    }

    //Get all tasks
    @GetMapping
    public List<TaskResponseDTO>getTasks(Authentication authentication){
        User user=getLoggedInUser(authentication);
        return taskServices.getTasksByUser(user);
    }

    //update task
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id,@RequestBody Task task, Authentication authentication){
        return taskServices.updateTask(id,task);
    }

    //delete task
    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id){
        taskServices.deleteTask(id);
        return "Task deleted successfully";
    }
}
