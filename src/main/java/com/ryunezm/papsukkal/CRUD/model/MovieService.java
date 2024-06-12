package com.ryunezm.papsukkal.CRUD.model;

import com.ryunezm.papsukkal.global.exceptions.AttributeException;
import com.ryunezm.papsukkal.global.exceptions.ResourceNotFoundException;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class MovieService {

    private final MovieRepository movieRepository;
    private final AtomicInteger idCounter;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
        this.idCounter = new AtomicInteger((int) movieRepository.count());
    }

    public List<Movie> findAll() {
        return movieRepository.findAll();
    }

    public Movie findById(String id) throws ResourceNotFoundException {
        return movieRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not found"));
    }

    public Movie save(@NotNull MovieDTO movieDTO) throws AttributeException {
        if (movieRepository.existsByTitleAndDirectedByAndReleaseDate(
                movieDTO.getTitle(),
                movieDTO.getDirectedBy(),
                movieDTO.getReleaseDate())) {
            throw new AttributeException("Movie already in database");
        }
        Movie movie = new Movie(
                generateId(),
                movieDTO.getTitle(),
                movieDTO.getTitleEN(),
                movieDTO.getTitleES(),
                movieDTO.getDirectedBy(),
                movieDTO.getScreenplayBy(),
                movieDTO.getProducedBy(),
                movieDTO.getStarring(),
                movieDTO.getCinematography(),
                movieDTO.getEditedBy(),
                movieDTO.getMusicBy(),
                movieDTO.getProductionCompany(),
                movieDTO.getReleaseDate(),
                movieDTO.getGenre(),
                movieDTO.getSubgenres(),
                movieDTO.getRunningTime(),
                movieDTO.getCountry(),
                movieDTO.getLanguage(),
                movieDTO.getPersonalRating());

        return movieRepository.save(movie);
    }

    public Movie update(String id, @NotNull MovieDTO movieDTO) throws ResourceNotFoundException, AttributeException {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not found"));


        if (movieRepository.existsByTitleAndDirectedByAndReleaseDate(
                movieDTO.getTitle(),
                movieDTO.getDirectedBy(),
                movieDTO.getReleaseDate())
                &&
                !movie.getId().equals(id)) {
            throw new AttributeException("Movie is already in database");
        }

        movie.setTitle(movieDTO.getTitle());
        movie.setTitleEN(movieDTO.getTitleEN());
        movie.setTitleES(movieDTO.getTitleES());
        movie.setDirectedBy(movieDTO.getDirectedBy());
        movie.setScreenplayBy(movieDTO.getScreenplayBy());
        movie.setProducedBy(movieDTO.getProducedBy());
        movie.setStarring(movieDTO.getStarring());
        movie.setCinematography(movieDTO.getCinematography());
        movie.setEditedBy(movieDTO.getEditedBy());
        movie.setMusicBy(movieDTO.getMusicBy());
        movie.setProductionCompany(movieDTO.getProductionCompany());
        movie.setReleaseDate(movieDTO.getReleaseDate());
        movie.setGenre(movieDTO.getGenre());
        movie.setSubgenres(movieDTO.getSubgenres());
        movie.setRunningTime(movieDTO.getRunningTime());
        movie.setCountry(movieDTO.getCountry());
        movie.setLanguage(movieDTO.getLanguage());
        movie.setPersonalRating(movieDTO.getPersonalRating());

        return movieRepository.save(movie);
    }

    @NotNull
    private String generateId() {
        return String.valueOf(idCounter.incrementAndGet());
    }

    public Movie deleteById(String id) throws ResourceNotFoundException {
        Movie movie = movieRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Not found"));
        movieRepository.delete(movie);
        return movie;
    }

    public List<Movie> findMovieByAnyTitle(String title) {
        return movieRepository.findMovieByAnyTitle(title);
    }

    public List<Movie> findMovieByAnyPerson(String keyword) {
        return movieRepository.findMovieByAnyPerson(keyword);
    }

}
