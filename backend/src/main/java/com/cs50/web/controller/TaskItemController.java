package com.cs50.web.controller;

import com.cs50.domain.model.TaskItemCreateDTO;
import com.cs50.domain.model.TaskItemFindDTO;
import com.cs50.domain.model.TaskItemUpdateDTO;
import com.cs50.service.TaskItemService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import java.util.List;

import static jakarta.ws.rs.core.Response.Status.CREATED;
import static jakarta.ws.rs.core.Response.Status.OK;


@Path("/item")
public class TaskItemController {

    private final TaskItemService service;

    public TaskItemController(TaskItemService service) {
        this.service = service;
    }

    @POST
    public Response create(TaskItemCreateDTO dto) {
        this.service.create(dto);
        return Response.status(CREATED).build();
    }

    @GET()
    @Path("/{id}")
    public Response findByTaskListId(@PathParam("id") String listId) {
        List<TaskItemFindDTO> result = this.service.findByTaskListId(listId);
        return Response.status(OK).entity(result).build();
    }

    @PATCH()
    @Path("/complete/{id}")
    public Response completeTaskItem(@PathParam("id") String id) {
        this.service.completeTask(id);
        return Response.status(OK).build();
    }

    @PATCH()
    @Path("/{id}")
    public Response update(@PathParam("id") String id, TaskItemUpdateDTO dto) {
        this.service.update(id, dto);
        return Response.status(OK).build();
    }

    @DELETE()
    @Path("/{id}")
    public Response delete(@PathParam("id") String id) {
        this.service.delete(id);
        return Response.status(OK).build();
    }
}
