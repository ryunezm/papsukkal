package com.ryunezm.papsukkal.model;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MovieRepository extends MongoRepository <Movie, String> {
}
