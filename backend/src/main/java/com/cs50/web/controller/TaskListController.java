package com.cs50.web.controller;

import com.cs50.domain.model.TaskListCreateDTO;
import com.cs50.domain.model.TaskListFindDTO;
import com.cs50.domain.model.TaskListUpdateDTO;
import com.cs50.service.TaskListService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import java.util.List;

import static jakarta.ws.rs.core.Response.Status.CREATED;
import static jakarta.ws.rs.core.Response.Status.OK;

@Path("/list")
public class TaskListController {

    private final TaskListService service;

    public TaskListController(TaskListService service) {
        this.service = service;
    }

    @GET()
    public Response list() {
        List<TaskListFindDTO> results = this.service.list();
        return Response.status(OK).entity(results).build();
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") String id) {
        this.service.delete(id);
        return Response.status(OK).build();
    }

    @POST
    public Response create(TaskListCreateDTO taskList) {
        this.service.create(taskList);
        return Response.status(CREATED).build();
    }

    @PATCH
    @Path("{id}")
    public Response update(@PathParam("id") String id, TaskListUpdateDTO taskList) {
        this.service.update(id, taskList);
        return Response.status(OK).build();
    }

}
