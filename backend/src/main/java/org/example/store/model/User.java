package org.example.store.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.Set;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {
    @MongoId
    String id;

    @NotBlank(message = "email cannot be empty")
    @Email(message = "invalid phone number format")
    String login;

    @NotBlank(message = "password cannot be empty")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$", message = "Password must contain at least one uppercase letter and one digit, and be at least 6 characters long")
    String password;

    @DBRef
    @NotBlank(message = "role cannot be empty")
    Set<Role> roles;
}
