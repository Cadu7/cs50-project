package com.cs50.domain.model;

import com.cs50.domain.entity.TaskItem;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class TaskItemFindDTO {

    private String id;

    private String content;

    private LocalDate endDate;

    private Short priority;

    private Boolean done;

    public TaskItemFindDTO(TaskItem entity) {
        this.id = entity.getId();
        this.content = entity.getContent();
        this.endDate = entity.getEndDate();
        this.priority = entity.getPriority();
        this.done = entity.getDone();
    }
}
