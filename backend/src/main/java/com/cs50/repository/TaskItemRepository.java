package com.cs50.repository;

import com.cs50.domain.entity.TaskItem;
import com.cs50.domain.model.TaskItemUpdateDTO;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.*;

@ApplicationScoped
public class TaskItemRepository implements PanacheRepositoryBase<TaskItem, String> {

    public List<TaskItem> findActiveAndSorted(String listId) {
        return this.list("taskList.id = ?1 ORDER BY done ASC, endDate ASC, priority ASC", listId);
    }

    public boolean completeTask(String id) {
        int matched = this.update("done = true WHERE id = ?1 and done = false", id);
        return matched != 0;
    }

    public Optional<TaskItem> findByActiveIdOptional(String id) {
        return this.find("id = ?1 AND done = false", id).firstResultOptional();
    }

    public void updateInformed(String id, TaskItemUpdateDTO dto) {
        List<String> query = new ArrayList<>();
        Map<String, Object> params = new HashMap<>();

        if (dto.getContent() != null) {
            query.add("content = :content");
            params.put("content", dto.getContent());
        }

        if (dto.getPriority() != null) {
            query.add("priority = :priority");
            params.put("priority", dto.getPriority());
        }

        if (dto.getEndDate() != null) {
            query.add("endDate = :endDate");
            params.put("endDate", dto.getEndDate());
        }

        String queryAppended = String.join(", ", query).concat(" WHERE id = :id AND done = false");
        params.put("id", id);
        this.update(queryAppended, params);
    }
}
