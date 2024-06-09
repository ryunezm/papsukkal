//package com.ryunezm.papsukkal.config;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.RestControllerAdvice;
//import com.fasterxml.jackson.databind.JsonMappingException;
//
//@RestControllerAdvice
//public class GlobalExceptionHandler {
//
//    @ExceptionHandler(JsonMappingException.class)
//    public ResponseEntity<String> handleJsonMappingException(JsonMappingException ex) {
//        return new ResponseEntity<>("Error parsing JSON: " + ex.getOriginalMessage(), HttpStatus.BAD_REQUEST);
//    }
//}
