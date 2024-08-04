package org.example.store.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "cars")
public class Car {
     @MongoId
     String id;

     @NotBlank(message = "image cannot be empty")
     String image;

     @NotBlank(message = "title cannot be empty")
     String title;

     @NotBlank(message = "title cannot be empty")
     String color;

     @Min(value = 30, message = "power cannot be smaller then 30")
     @NotBlank(message = "power cannot be empty")
     int power;

     @Positive(message = "price cannot be positive")
     @NotBlank(message = "price cannot be empty")
     int price;
}
