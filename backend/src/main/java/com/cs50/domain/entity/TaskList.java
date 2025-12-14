package com.cs50.domain.entity;

import com.cs50.domain.exception.InvalidParameterException;
import com.cs50.domain.model.TaskListCreateDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "task_list")
@Getter
@Setter
@NoArgsConstructor
public class TaskList {

    @Id
    @Column(name = "id", nullable = false, length = 36)
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "active")
    private Boolean active;

    public TaskList(TaskListCreateDTO dto) {
        if (invalidName(dto.getName())) {
            throw new InvalidParameterException("Invalid parameter", "Invalid parameter was provided in request");
        }
        this.id = UUID.randomUUID().toString();
        this.name = dto.getName();
        this.active = true;
    }

    public static boolean invalidName(String name) {
        return name == null || name.isEmpty();
    }

}
