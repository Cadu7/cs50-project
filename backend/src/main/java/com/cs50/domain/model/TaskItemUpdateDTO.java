package com.cs50.domain.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class TaskItemUpdateDTO {

    private String content;

    private LocalDate endDate;

    private Short priority;

}
