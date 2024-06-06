package com.ryunezm.papsukkal.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping
    public List<Movie> getAllMovies(){
        return movieService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Movie> getMovieById(@PathVariable String id){
        return movieService.findById(id);
    }

    @PostMapping
    public Movie createMovie(@RequestBody Movie movie){
        return movieService.save(movie);
    }

    @PutMapping("/{id}")
    public Movie updateMovie(@PathVariable String id, @RequestBody Movie movie){
        movie.setId(id);
        return movieService.save(movie);
    }

    @DeleteMapping("/{id}")
    public void deleteMovie(@PathVariable String id){
        movieService.deleteById(id);
    }

}
