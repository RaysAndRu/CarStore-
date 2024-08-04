package org.example.store.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "orders")
public class Order {
     @MongoId
     String id;

     @NotBlank(message = "name cannot be empty")
     String name;

     @NotBlank(message = "last Name cannot be empty")
     String lastName;

     @NotBlank(message = "phone cannot be empty")
     @Pattern(regexp = "^\\+\\d{10}$", message = "Invalid phone number format")
     String phone;

     @NotBlank(message =  "date cannot be empty")
     String date;

     @NotBlank(message = "car cannot be empty")
     String car;

     @Positive(message = "cost cannot be positive")
     @NotBlank(message = "cost cannot be empty")
     int cost;
}
