package com.ryunezm.papsukkal.CRUD.model;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ryunezm.papsukkal.CRUD.enums.Country;
import com.ryunezm.papsukkal.CRUD.enums.Genre;
import com.ryunezm.papsukkal.CRUD.enums.Language;
import com.ryunezm.papsukkal.CRUD.utils.SubgenreValidator;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Data
@Document(collection = "movies")
public class Movie {
    @Id
    @NotNull
    private String id;
    @NotNull
    @Size(max = 100, message = "The original title cannot exceed 100 characters.")
    private String title;
    @NotNull
    @Size(max = 100, message = "The English title cannot exceed 100 characters.")
    private String titleEN;
    @NotNull
    @Size(max = 100, message = "The Spanish title cannot exceed 100 characters.")
    private String titleES;
    @NotNull
    @Size(max = 10, message = "The list of directors cannot exceed 10.")
    private List<String> directedBy;
    @Size(max = 10, message = "The list of screenwriters cannot exceed 10.")
    private List<String> screenplayBy;
    @Size(max = 10, message = "The list of producers cannot exceed 10.")
    private List<String> producedBy;
    @Size(max = 150, message = "The list of starring actors cannot exceed 150.")
    private List<String> starring;
    @Size(max = 20, message = "The list of cinematographers cannot exceed 20.")
    private List<String> cinematography;
    @Size(max = 20, message = "The list of editors cannot exceed 20.")
    private List<String> editedBy;
    @Size(max = 20, message = "The list of music composers cannot exceed 20.")
    private List<String> musicBy;
    @Size(max = 20, message = "The list of music composers cannot exceed 20.")
    private List<String> productionCompany;
    @NotNull
    private LocalDate releaseDate;
    @NotNull
    private List<Genre> genres;
    @JsonProperty("subgenres")
    private List<Genre.SubGenre> subgenres;
    @NotNull
    private int runningTime;
    @NotNull
    private List<Country> countries;
    @NotNull
    private List<Language> languages;
    private PersonalRating personalRating;

    @JsonCreator
    public Movie(@JsonProperty("id") String id,
                 @JsonProperty("title") String title,
                 @JsonProperty("titleEN") String titleEN,
                 @JsonProperty("titleES") String titleES,
                 @JsonProperty("directedBy") List<String> directedBy,
                 @JsonProperty("screenplayBy") List<String> screenplayBy,
                 @JsonProperty("producedBy") List<String> producedBy,
                 @JsonProperty("starring") List<String> starring,
                 @JsonProperty("cinematography") List<String> cinematography,
                 @JsonProperty("editedBy") List<String> editedBy,
                 @JsonProperty("musicBy") List<String> musicBy,
                 @JsonProperty("productionCompany") List<String> productionCompany,
                 @JsonProperty("releaseDate") LocalDate releaseDate,
                 @JsonProperty("genres") List<Genre> genres,
                 @JsonProperty("subgenres") List<Genre.SubGenre> subgenres,
                 @JsonProperty("runningTime") int runningTime,
                 @JsonProperty("countries") List<Country> countries,
                 @JsonProperty("languages") List<Language> languages,
                 @JsonProperty("personalRating") PersonalRating personalRating) {
        this.id = id;
        this.title = title;
        this.titleEN = titleEN;
        this.titleES = titleES;
        this.directedBy = directedBy;
        this.screenplayBy = screenplayBy;
        this.producedBy = producedBy;
        this.starring = starring;
        this.cinematography = cinematography;
        this.editedBy = editedBy;
        this.musicBy = musicBy;
        this.productionCompany = productionCompany;
        this.releaseDate = releaseDate;
        this.genres = genres;
        this.runningTime = runningTime;
        this.countries = countries;
        this.languages = languages;
        this.personalRating = personalRating;

        SubgenreValidator.validateSubgenres(subgenres, genres);
        this.subgenres = subgenres;
    }

    @JsonProperty("subgenres")
    public List<Genre.SubGenre> getSubgenres() {
        return subgenres;
    }

    @Data
    public static class PersonalRating {
        @DecimalMin(value = "0.0", message = "The rating should be between 0 and 10.")
        @DecimalMax(value = "10.0", message = "The rating should be between 0 and 10.")
        private double screenplay;

        @DecimalMin(value = "0.0", message = "The rating should be between 0 and 10.")
        @DecimalMax(value = "10.0", message = "The rating should be between 0 and 10.")
        private double acting;

        @DecimalMin(value = "0.0", message = "The rating should be between 0 and 10.")
        @DecimalMax(value = "10.0", message = "The rating should be between 0 and 10.")
        private double photography;

        @DecimalMin(value = "0.0", message = "The rating should be between 0 and 10.")
        @DecimalMax(value = "10.0", message = "The rating should be between 0 and 10.")
        private double entertainment;

        @DecimalMin(value = "0.0", message = "The rating should be between 0 and 10.")
        @DecimalMax(value = "10.0", message = "The rating should be between 0 and 10.")
        private double recommended;
    }

}
