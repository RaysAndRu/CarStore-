package org.example.model;

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
    private String id;
    private String name;
    private String last_name;
    private String phone;
    private String date;
    private String car;
    private String cost;
}
