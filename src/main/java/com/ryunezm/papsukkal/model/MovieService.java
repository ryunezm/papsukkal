package com.ryunezm.papsukkal.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> findAll(){
        return movieRepository.findAll();
    }

    public Optional<Movie> findById(String id){
        return movieRepository.findById(id);
    }

    public Movie save(Movie movie){
        return movieRepository.save(movie);
    }

    public void deleteById(String id){
        movieRepository.deleteById(id);
    }

}
