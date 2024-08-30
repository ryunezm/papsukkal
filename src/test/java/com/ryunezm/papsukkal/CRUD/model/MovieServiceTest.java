package com.ryunezm.papsukkal.CRUD.model;

import com.ryunezm.papsukkal.CRUD.enums.Country;
import com.ryunezm.papsukkal.CRUD.enums.Genre;
import com.ryunezm.papsukkal.CRUD.enums.Language;
import com.ryunezm.papsukkal.global.exceptions.AttributeException;
import com.ryunezm.papsukkal.global.exceptions.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

public class MovieServiceTest {
    @Mock
    private MovieRepository movieRepository;

    @InjectMocks
    private MovieService movieService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAll() {
        List<Movie> movies = Arrays.asList(
                new Movie("1", "Movie 1", "Movie 1 EN", "Movie 1 ES", Arrays.asList("Director 1", "Director 2"), null, null, null, null, null, null, null, LocalDate.now(), Arrays.asList(Genre.ACTION, Genre.DRAMA), Arrays.asList(Genre.SubGenre.ACTION_DISASTER, Genre.SubGenre.DRAMA_MELODRAMA), 120, Arrays.asList(Country.UNITED_STATES, Country.COLOMBIA), Arrays.asList(Language.ENGLISH, Language.NAIJA), null),
                new Movie("2", "Movie 2", "Movie 2 EN", "Movie 2 ES", Arrays.asList("Director 2", "Director 3"), null, null, null, null, null, null, null, LocalDate.now(), Arrays.asList(Genre.COMEDY, Genre.SCI_FI), null, 110, Arrays.asList(Country.UNITED_KINGDOM, Country.ALBANIA), Arrays.asList(Language.ENGLISH, Language.HAUSA), null)
        );

        when(movieRepository.findAll()).thenReturn(movies);

        List<Movie> result = movieService.findAll();
        assertEquals(2, result.size());
        assertEquals("Movie 1", result.get(0).getTitle());
        assertEquals("Movie 2", result.get(1).getTitle());
    }

    @Test
    void testFindByIdNotFound() {
        String id = "99";
        when(movieRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> movieService.findById(id));
    }

    @Test
    void testSave() throws AttributeException {
        MovieDTO movieDTO = new MovieDTO();
        movieDTO.setTitle("New movie");
        movieDTO.setDirectedBy(Arrays.asList("Director 1", "Director 2"));
        movieDTO.setReleaseDate(LocalDate.now());

        when(movieRepository.existsByTitleAndDirectedByAndReleaseDate(anyString(), anyList(), any(LocalDate.class)))
                .thenReturn(false);

        when(movieRepository.save(any(Movie.class))).thenAnswer(invocation -> invocation.getArgument(0));
        Movie result = movieService.save(movieDTO);
        assertNotNull(result.getId());
        assertEquals("New movie", result.getTitle());
    }

    @Test
    void testSaveDuplicate() {
        MovieDTO movieDTO = new MovieDTO();
        movieDTO.setTitle("Duplicate Movie");
        movieDTO.setDirectedBy(Arrays.asList("Duplicate Director #1", "Duplicate Director #2"));
        movieDTO.setReleaseDate(LocalDate.now());
        when(movieRepository.existsByTitleAndDirectedByAndReleaseDate(anyString(), anyList(), any(LocalDate.class)))
                .thenReturn(true);

        assertThrows(AttributeException.class, () -> movieService.save(movieDTO));
    }

    @Test
    void testUpdate() throws ResourceNotFoundException, AttributeException {
        String id = "1";
        MovieDTO movieDTO = new MovieDTO();
        movieDTO.setTitle("Updated Movie");
        movieDTO.setDirectedBy(Arrays.asList("Updated Director #1", "Updated Director #2"));
        movieDTO.setReleaseDate(LocalDate.now());

        Movie existingMovie = new Movie(id, "Old Movie", "Old Movie EN", "Old Movie ES", Arrays.asList("Old Director #1", "Old Director #2", "Old Director #3"), null, null, null, null, null, null, null, LocalDate.now(), Arrays.asList(Genre.ACTION, Genre.DRAMA), null, 120, Arrays.asList(Country.UNITED_STATES, Country.ALBANIA), Arrays.asList(Language.ENGLISH, Language.BOSNIAN), null);

        when(movieRepository.findById(id)).thenReturn(Optional.of(existingMovie));
        when(movieRepository.existsByTitleAndDirectedByAndReleaseDate(anyString(), anyList(), any(LocalDate.class)))
                .thenReturn(false);
        when(movieRepository.save(any(Movie.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Movie result = movieService.update(id, movieDTO);
        assertEquals("Updated Movie", result.getTitle());
        assertEquals(Arrays.asList("Updated Director #1", "Updated Director #2"), result.getDirectedBy());
    }

    @Test
    void testDeleteById() throws ResourceNotFoundException {
        String id = "1";
        Movie movie = new Movie(id, "To Delete", "To Delete EN", "To Delete ES", Arrays.asList("Delete Director #1", "Delete Director #2"), null, null, null, null, null, null, null, LocalDate.now(), Arrays.asList(Genre.ACTION, Genre.DRAMA), null, 120, Arrays.asList(Country.UNITED_STATES, Country.ALBANIA), Arrays.asList(Language.ENGLISH, Language.BOSNIAN), null);

        when(movieRepository.findById(id)).thenReturn(Optional.of(movie));
        doNothing().when(movieRepository).delete(movie);

        Movie result = movieService.deleteById(id);
        assertEquals("To Delete", result.getTitle());
        verify(movieRepository, times(1)).delete(movie);
    }

    @Test
    void testFindMovieByAnyTitle() {
        String title = "Test";
        List<Movie> movies = Arrays.asList(
                new Movie("1", "Test Movie", "Test Movie EN", "Test Movie ES", Arrays.asList("Director #1", "Director #2"), null, null, null, null, null, null, null, LocalDate.now(), Arrays.asList(Genre.ACTION, Genre.EDUCATIONAL_FILM), null, 120, Arrays.asList(Country.UNITED_STATES, Country.CROATIA), Arrays.asList(Language.ENGLISH, Language.JAPANESE), null),
                new Movie("2", "Another Test", "Another Test EN", "Another Test ES", Arrays.asList("Director #1", "Director #3"), null, null, null, null, null, null, null, LocalDate.now(), Arrays.asList(Genre.COMEDY, Genre.ANIMAL_FILM), null, 110, Arrays.asList(Country.UNITED_KINGDOM, Country.GAMBIA), Arrays.asList(Language.ENGLISH, Language.CHINESE), null)
        );
        when(movieRepository.findMovieByAnyTitle(title)).thenReturn(movies);

        List<Movie> result = movieService.findMovieByAnyTitle(title);
        assertEquals(2, result.size());
        assertTrue(result.stream().allMatch(movie -> movie.getTitle().contains("Test") || movie.getTitleEN().contains("Test") || movie.getTitleES().contains("Test")));
    }

    @Test
    void testFindMovieByAnyPerson() {
        String person = "Director";
        List<Movie> movies = Arrays.asList(
                new Movie("1", "Movie 1", "Movie 1 EN", "Movie 1 ES", Arrays.asList("Director #1", "Director #2"), null, null, null, null, null, null, null, LocalDate.now(), Arrays.asList(Genre.ACTION, Genre.ANIMAL_FILM), null, 120, Arrays.asList(Country.UNITED_STATES, Country.INDIA), Arrays.asList(Language.ENGLISH, Language.JAPANESE), null),
                new Movie("2", "Movie 2", "Movie 2 EN", "Movie 2 ES", Arrays.asList("Other Director", "Director #3"), null, null, null, null, null, null, null, LocalDate.now(), Arrays.asList(Genre.COMEDY, Genre.DEATH_GAME), null, 110, Arrays.asList(Country.UNITED_KINGDOM, Country.BOLIVIA), Arrays.asList(Language.ENGLISH, Language.JAPANESE), null)
        );
        when(movieRepository.findMovieByAnyPerson(person)).thenReturn(movies);

        List<Movie> result = movieService.findMovieByAnyPerson(person);
        assertEquals(2, result.size());
        assertTrue(result.stream().allMatch(movie -> movie.getDirectedBy().stream().anyMatch(d -> d.contains(person))));
    }
}
