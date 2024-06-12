package com.ryunezm.papsukkal.CRUD.model;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ryunezm.papsukkal.CRUD.enums.Country;
import com.ryunezm.papsukkal.CRUD.enums.Genre;
import com.ryunezm.papsukkal.CRUD.enums.Language;
import com.ryunezm.papsukkal.CRUD.utils.SubgenreValidator;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.Collections;
import java.util.HashSet;
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
    @Size(max = 50, message = "The list of starring actors cannot exceed 50.")
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
    private List<Genre> genre;
    @JsonProperty("subgenres")
    private List<Genre.SubGenre> subgenres;
    @NotNull
    private int runningTime;
    @NotNull
    private List<Country> country;
    @NotNull
    private List<Language> language;
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
                 @JsonProperty("genre") List<Genre> genre,
                 @JsonProperty("subgenres") List<Genre.SubGenre> subgenres,
                 @JsonProperty("runningTime") int runningTime,
                 @JsonProperty("country") List<Country> country,
                 @JsonProperty("language") List<Language> language,
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
        this.genre = genre;
        this.runningTime = runningTime;
        this.country = country;
        this.language = language;
        this.personalRating = personalRating;

        SubgenreValidator.validateSubgenres(subgenres, genre);
        this.subgenres = subgenres;
    }

    @JsonProperty("subgenres")
    public List<Genre.SubGenre> getSubgenres() {
        return subgenres;
    }

    @Data
    public static class PersonalRating {
        @Min(value = 0, message = "The rating should be between 0 and 10.")
        @Max(value = 10, message = "The rating should be between 0 and 10.")
        private int screenplay;
        @Min(value = 0, message = "The rating should be between 0 and 10.")
        @Max(value = 10, message = "The rating should be between 0 and 10.")
        private int acting;
        @Min(value = 0, message = "The rating should be between 0 and 10.")
        @Max(value = 10, message = "The rating should be between 0 and 10.")
        private int photography;
        @Min(value = 0, message = "The rating should be between 0 and 10.")
        @Max(value = 10, message = "The rating should be between 0 and 10.")
        private int entertainment;
        @Min(value = 0, message = "The rating should be between 0 and 10.")
        @Max(value = 10, message = "The rating should be between 0 and 10.")
        private int recommended;
    }
}
