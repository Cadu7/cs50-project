package com.cs50.repository;

import com.cs50.domain.entity.TaskList;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class TaskListRepository implements PanacheRepositoryBase<TaskList, String> {

    public List<TaskList> listActive() {
        return this.list("active", true);
    }

    public boolean inactive(String id) {
        int matched = this.update("active = false WHERE id = ?1 AND active = true", id);
        return matched != 0;
    }

    public boolean updateName(String id, String name) {
        int matched = this.update("name = ?1 WHERE id = ?2 AND active = true", name, id);
        return matched != 0;
    }

    public Optional<TaskList> findByActiveIdOptional(String id) {
        return this.find("id = ?1 AND active = true", id).firstResultOptional();
    }
}
