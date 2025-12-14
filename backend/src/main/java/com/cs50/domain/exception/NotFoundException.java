package com.cs50.domain.exception;

import lombok.Getter;

import java.util.List;

@Getter
public class NotFoundException extends RuntimeException {

    private final List<ApiError> errors;

    public NotFoundException(String message, String details) {
        this.errors = List.of(new ApiError(message, details));
    }
}
