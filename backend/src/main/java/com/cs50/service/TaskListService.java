package com.cs50.service;

import com.cs50.domain.entity.TaskList;
import com.cs50.domain.exception.InvalidParameterException;
import com.cs50.domain.exception.NotFoundException;
import com.cs50.domain.model.TaskListCreateDTO;
import com.cs50.domain.model.TaskListFindDTO;
import com.cs50.domain.model.TaskListUpdateDTO;
import com.cs50.repository.TaskListRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.List;

import static com.cs50.domain.entity.TaskList.invalidName;
import static com.cs50.utils.StringUtils.isNotUUID;

@ApplicationScoped
@Transactional
public class TaskListService {

    private final TaskListRepository repository;

    public TaskListService(TaskListRepository repository) {
        this.repository = repository;
    }

    public TaskList findById(String id) {
        if (isNotUUID(id)) {
            throw new InvalidParameterException("Invalid parameter", "The information provided is invalid");
        }

        return this.repository.findByActiveIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Not found", "The list was not found"));
    }

    public List<TaskListFindDTO> list() {
        List<TaskList> result = this.repository.listActive();

        if (result.isEmpty()) {
            throw new NotFoundException("Not found", "not found any active list");
        }
        return result.stream().map(TaskListFindDTO::new).toList();
    }

    public void delete(String id) {
        if (isNotUUID(id)) {
            throw new InvalidParameterException("Invalid parameter", "The information provided is invalid");
        }
        boolean success = this.repository.inactive(id);
        if (!success) {
            throw new NotFoundException("Not found", "List not found for delete or already deleted");
        }
    }

    public void create(TaskListCreateDTO dto) {
        TaskList taskList = new TaskList(dto);
        this.repository.persist(taskList);
    }

    public void update(String id, TaskListUpdateDTO dto) {
        if (isNotUUID(id) || invalidName(dto.getName())) {
            throw new InvalidParameterException("Invalid parameter", "The information provided is invalid");
        }
        this.repository.findByActiveIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Not found", "Not found any active list"));

        boolean success = this.repository.updateName(id, dto.getName());
        if (!success) {
            throw new NotFoundException("Not found", "List not found for update");
        }
    }
}
