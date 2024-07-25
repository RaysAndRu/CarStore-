package org.example.model;

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
    private String id;
    private String image;
    private String title;
    private String color;
    private String power;
    private  int price;
}
