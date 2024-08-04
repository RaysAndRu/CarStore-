package org.example.store.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "employees")
public class Employee {
     @MongoId
     String id;

     @NotBlank(message = "last name cannot be empty")
     String lastName;

     @NotBlank(message = "first name cannot be empty")
     String firstName;

     String patronymic;

     @NotBlank(message = "position cannot be empty")
     String position;

     @NotBlank(message = "salary cannot be empty")
     @Positive(message = "salary cannot be positive"  )
     int salary;
}
