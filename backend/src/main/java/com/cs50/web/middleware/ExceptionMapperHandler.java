package com.cs50.web.middleware;

import com.cs50.domain.exception.InvalidParameterException;
import com.cs50.domain.exception.NotFoundException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;
import org.jboss.resteasy.reactive.server.ServerExceptionMapper;

import static jakarta.ws.rs.core.Response.Status.BAD_REQUEST;
import static jakarta.ws.rs.core.Response.Status.NOT_FOUND;

@Provider
public class ExceptionMapperHandler {

    @ServerExceptionMapper
    public Response InvalidParameterException(InvalidParameterException exception) {
        return Response.status(BAD_REQUEST).entity(exception.getErrors()).build();
    }

    @ServerExceptionMapper
    public Response NotFoundException(NotFoundException exception) {
        return Response.status(NOT_FOUND).entity(exception.getErrors()).build();
    }

}
