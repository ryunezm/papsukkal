package com.ryunezm.papsukkal.CRUD.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDate;
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
    
    boolean existsByTitleAndDirectedByAndReleaseDate(@NotNull @Size(max = 100, message = "The original title cannot exceed 100 characters.") String title, @Size(max = 5, message = "The list of directors cannot exceed 5.") List<String> directedBy, @NotNull LocalDate releaseDate);

}
