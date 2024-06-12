package com.ryunezm.papsukkal.global.exceptions;

import com.ryunezm.papsukkal.global.dto.MessageDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class GlobalException {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<MessageDTO> throwNotFoundException(ResourceNotFoundException e){
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new MessageDTO(HttpStatus.NOT_FOUND, e.getMessage()));
    }

    @ExceptionHandler(AttributeException.class)
    public ResponseEntity<MessageDTO> throwAttributeException(AttributeException e){
        return ResponseEntity
                .badRequest()
                .body(new MessageDTO(HttpStatus.BAD_REQUEST, e.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<MessageDTO> validationException(MethodArgumentNotValidException e){
        List<String> messages = new ArrayList<>();
        e.getBindingResult().getAllErrors().forEach((err)-> messages.add(err.getDefaultMessage()));
        return ResponseEntity
                .badRequest()
                .body(new MessageDTO(HttpStatus.BAD_REQUEST, messages.toString()));
    }
}
