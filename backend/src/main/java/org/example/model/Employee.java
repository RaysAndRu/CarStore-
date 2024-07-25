package org.example.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "employees")
public class Employee {
    @MongoId
    private String id;
    private String last_name;
    private String first_name;
    private String patronymic;
    private String position;
    private int salary;
}
