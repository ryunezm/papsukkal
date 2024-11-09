package com.ryunezm.papsukkal.CRUD.model;

import com.ryunezm.papsukkal.global.dto.MessageDTO;
import com.ryunezm.papsukkal.global.exceptions.AttributeException;
import com.ryunezm.papsukkal.global.exceptions.ResourceNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @GetMapping
    public ResponseEntity<List<Movie>> findAll() {
        return ResponseEntity.ok(movieService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable("id") String id) throws ResourceNotFoundException {
        return ResponseEntity.ok(movieService.findById(id));
    }

    @GetMapping("/searchByPerson/{keyword}")
    public ResponseEntity<List<Movie>> findMovieByAnyPerson(@PathVariable String keyword) {
        return ResponseEntity.ok(movieService.findMovieByAnyPerson(keyword));
    }

    @GetMapping("/searchByTitle/{title}")
    public ResponseEntity<List<Movie>> findMovieByAnyTitle(@PathVariable String title) {
        return ResponseEntity.ok(movieService.findMovieByAnyTitle(title));
    }

    @PostMapping
    public ResponseEntity<MessageDTO> saveMovie(@Valid @RequestBody MovieDTO movieDTO) throws AttributeException {
        ResponseEntity.ok(movieService.save(movieDTO));
        String message = "Movie " + movieDTO.getTitle() + " " + movieDTO.getDirectedBy() + " have been saved";
        return ResponseEntity.ok(new MessageDTO(HttpStatus.OK, message));
    }

    @PostMapping("/batch")
    public ResponseEntity<MessageDTO> saveMovies(@Valid @RequestBody List<MovieDTO> movieDTOs) throws AttributeException {
        for (MovieDTO movieDTO : movieDTOs) {
            movieService.save(movieDTO);
        }
        String message = movieDTOs.size() + " movies have been saved.";
        return ResponseEntity.ok(new MessageDTO(HttpStatus.OK, message));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MessageDTO> updateMovie(@PathVariable("id") String id, @Valid @RequestBody MovieDTO movieDTO) throws ResourceNotFoundException, AttributeException {
        ResponseEntity.ok(movieService.update(id, movieDTO));
        String message = "Movie " + movieDTO.getTitle() + " " + movieDTO.getDirectedBy() + " have been updated";
        return ResponseEntity.ok(new MessageDTO(HttpStatus.OK, message));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageDTO> deleteMovieById(@PathVariable("id") String id) throws ResourceNotFoundException {
        String message = "Movie " + movieService.findById(id).getTitle() + " has been deleted";
        ResponseEntity.ok(movieService.deleteById(id));
        return ResponseEntity.ok(new MessageDTO(HttpStatus.OK, message));
    }
}
