package com.ryunezm.papsukkal.model;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface MovieRepository extends MongoRepository<Movie, String> {

    @Query("{$or:[" +
            "{'directedBy': {$regex: ?0, $options: 'i'}}," +
            "{'screenplayBy': {$regex: ?0, $options: 'i'}}," +
            "{'producedBy': {$regex: ?0, $options: 'i'}}," +
            "{'starring': {$regex: ?0, $options: 'i'}}," +
            "{'cinematography':  {$regex: ?0, $options: 'i'}}," +
            "{'editedBy':  {$regex: ?0, $options:  'i'}}," +
            "{'musicBy':  {$regex: ?0, $options:  'i'}}," +
            "]}")
    List<Movie> findMovieByAnyPerson(String keyword);

    @Query("{$or:[" +
            "{'title': {$regex: ?0, $options: 'i'}}," +
            "{'titleEN': {$regex: ?0, $options: 'i'}}," +
            "{'titleES': {$regex: ?0, $options: 'i'}}" +
            "]}")
    List<Movie> findMovieByAnyTitle(String title);
}
