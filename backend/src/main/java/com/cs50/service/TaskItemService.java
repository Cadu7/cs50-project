package com.cs50.service;

import com.cs50.domain.entity.TaskItem;
import com.cs50.domain.entity.TaskList;
import com.cs50.domain.exception.InvalidParameterException;
import com.cs50.domain.exception.NotFoundException;
import com.cs50.domain.model.TaskItemCreateDTO;
import com.cs50.domain.model.TaskItemFindDTO;
import com.cs50.domain.model.TaskItemUpdateDTO;
import com.cs50.repository.TaskItemRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.List;

import static com.cs50.domain.entity.TaskItem.*;
import static com.cs50.utils.StringUtils.isNotUUID;

@ApplicationScoped
@Transactional
public class TaskItemService {

    private final TaskItemRepository repository;
    private final TaskListService taskListService;

    public TaskItemService(TaskItemRepository repository, TaskListService taskListService) {
        this.repository = repository;
        this.taskListService = taskListService;
    }

    public void create(TaskItemCreateDTO dto) {
        TaskList taskList = this.taskListService.findById(dto.getTaskListId());
        TaskItem taskItem = new TaskItem(dto, taskList);
        this.repository.persist(taskItem);
    }

    public List<TaskItemFindDTO> findByTaskListId(String listId) {
        this.taskListService.findById(listId);
        return this.repository.findActiveAndSorted(listId).stream().map(TaskItemFindDTO::new).toList();
    }

    public void completeTask(String id) {
        boolean success = this.repository.completeTask(id);
        if (!success) {
            throw new NotFoundException("Not found", "Task item not found for update");
        }
    }

    public void update(String id, TaskItemUpdateDTO dto) {
        if (isNotUUID(id)) {
            throw new InvalidParameterException("Invalid parameter", "The information provided is invalid");
        }
        this.repository.findByActiveIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Not found", "The task was not found"));

        boolean allNotInformed = dto.getContent() == null && dto.getEndDate() == null && dto.getPriority() == null;
        if (allNotInformed) {
            throw new InvalidParameterException("Invalid parameter", "The information provided is invalid");
        }

        if (dto.getEndDate() != null && invalidEndDate(dto.getEndDate())) {
            throw new InvalidParameterException("Invalid parameter", "The information provided is invalid");
        }

        if (dto.getContent() != null && invalidContent(dto.getContent())) {
            throw new InvalidParameterException("Invalid parameter", "The information provided is invalid");
        }

        if (dto.getPriority() != null && invalidPriority(dto.getPriority())) {
            throw new InvalidParameterException("Invalid parameter", "The information provided is invalid");
        }

        this.repository.updateInformed(id, dto);
    }

    public void delete(String id) {
        boolean success = this.repository.deleteById(id);
        if (!success) {
            throw new NotFoundException("Not found", "Task item not found for delete");
        }
    }
}
