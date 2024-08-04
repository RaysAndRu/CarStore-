package org.example.store.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


import java.util.stream.Collectors;

@ControllerAdvice(basePackages = "org.example.store.controllers")
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));

       return     ResponseEntity.badRequest()
                .header("X-СarStore-API-Version", "1.0")
                .header("X-СarStore-API-Status", "Error")
                .header("Content-Language", "en-US")
                .header("X-RateLimit-Limit", "no-limit")
                .header("Accept-Language", "en-US")
                .header("Cache-Control", "no-cache")
                .header("X-Error-Code", "400" )
                .header("Access-Control-Allow-Origin", "http://localhost:5173")
                .header("X-Content-Type-Options", "nosniff")
                .header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
                .contentType(MediaType.APPLICATION_JSON)
                .contentLength(errorMessage.toString().getBytes().length)
                .body(errorMessage);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleServerErrorExceptions(Exception ex) {
        String errorMessage =  "An error occurred: " + ex.getMessage();

        return     ResponseEntity.internalServerError()
                .header("X-СarStore-API-Version", "1.0")
                .header("X-СarStore-API-Status", "Error")
                .header("Content-Language", "en-US")
                .header("X-RateLimit-Limit", "no-limit")
                .header("Accept-Language", "en-US")
                .header("Cache-Control", "no-cache")
                .header("X-Error-Code", "500" )
                .header("Access-Control-Allow-Origin", "http://localhost:5173")
                .header("X-Content-Type-Options", "nosniff")
                .header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
                .contentType(MediaType.APPLICATION_JSON)
                .contentLength(errorMessage.toString().getBytes().length)
                .body(errorMessage);

    }
}