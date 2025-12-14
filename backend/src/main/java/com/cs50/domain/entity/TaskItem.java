package com.cs50.domain.entity;

import com.cs50.domain.exception.InvalidParameterException;
import com.cs50.domain.model.TaskItemCreateDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "task_item")
@Getter
@Setter
@NoArgsConstructor
public class TaskItem {

    @Id
    @Column(name = "id", nullable = false, length = 36)
    private String id;

    @ManyToOne
    @JoinColumn(name = "list_id", nullable = false)
    private TaskList taskList;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "priority", nullable = false)
    private Short priority;

    @Column(name = "done", nullable = false)
    private Boolean done;

    public TaskItem(TaskItemCreateDTO dto, TaskList taskList) {
        if (invalidContent(dto.getContent()) || invalidPriority(dto.getPriority()) || invalidEndDate(dto.getEndDate())) {
            throw new InvalidParameterException("Invalid parameter", "Invalid parameter was provided in request");
        }

        this.id = UUID.randomUUID().toString();
        this.taskList = taskList;
        this.content = dto.getContent();
        this.endDate = dto.getEndDate();
        this.priority = dto.getPriority();
        this.done = false;
    }

    public static boolean invalidEndDate(LocalDate value) {
        return value.isBefore(LocalDate.now());
    }

    public static boolean invalidContent(String value) {
        return value == null || value.isBlank();
    }

    public static boolean invalidPriority(Short value) {
        return value == null || value < 0 || value > 5;
    }


}
