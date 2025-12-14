package com.cs50.domain.model;

import com.cs50.domain.entity.TaskList;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskListFindDTO {

    private final String id;
    private final String name;

    public TaskListFindDTO(TaskList entity) {
        this.id = entity.getId();
        this.name = entity.getName();
    }
}
