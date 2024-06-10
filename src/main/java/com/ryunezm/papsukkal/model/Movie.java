package com.ryunezm.papsukkal.model;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ryunezm.papsukkal.enums.Genre;
import com.ryunezm.papsukkal.enums.Language;
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
    private String id;
    private String title;
    private String titleEN;
    private String titleES;
    private List<String> directedBy;
    private List<String> screenplayBy;
    private List<String> producedBy;
    private List<String> starring;
    private List<String> cinematography;
    private List<String> editedBy;
    private List<String> musicBy;
    private List<String> productionCompany;
    private LocalDate releaseDate;
    private List<Genre> genre;
    @JsonProperty("subgenres")
    private List<Genre.SubGenre> subgenres;
    private int runningTime;
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
        this.language = language;
        this.personalRating = personalRating;

        validateSubgenres(subgenres, genre);
        this.subgenres = subgenres;
    }

    public void setTitle(String title) {
        if (title != null && !title.trim().isEmpty() && title.length() <= 100) {
            this.title = title;
        } else {
            throw new IllegalArgumentException("The original title cannot be empty or exceed 100 characters.");
        }
    }

    public void setTitleEN(String titleEN) {
        if (titleEN.length() <= 100) {
            this.titleEN = titleEN;
        } else {
            throw new IllegalArgumentException("The English title cannot exceed 100 characters.");
        }
    }

    public void setTitleES(String titleES) {
        if (titleES.length() <= 100) {
            this.titleES = titleES;
        } else {
            throw new IllegalArgumentException("The Spanish title cannot exceed 100 characters.");
        }
    }

    public void setDirectedBy(List<String> directedBy) {
        if (directedBy.size() <= 5) {
            this.directedBy = directedBy;
        } else {
            throw new IllegalArgumentException("The list of directors cannot exceed 5.");
        }
    }

    public void setScreenplayBy(List<String> screenplayBy) {
        if (screenplayBy.size() <= 5) {
            this.screenplayBy = screenplayBy;
        } else {
            throw new IllegalArgumentException("The list of screenwriters cannot exceed 5.");
        }
    }

    public void setProducedBy(List<String> producedBy) {
        if (producedBy.size() <= 5) {
            this.producedBy = producedBy;
        } else {
            throw new IllegalArgumentException("The list of producers cannot exceed 5.");
        }
    }

    public void setStarring(List<String> starring) {
        if (starring.size() <= 50) {
            this.starring = starring;
        } else {
            throw new IllegalArgumentException("The list of starring actors cannot exceed 50.");
        }
    }

    public void setCinematography(List<String> cinematography) {
        if (cinematography.size() <= 10) {
            this.cinematography = cinematography;
        } else {
            throw new IllegalArgumentException("The list of cinematographers cannot exceed 10.");
        }
    }

    public void setEditedBy(List<String> editedBy) {
        if (editedBy.size() <= 10) {
            this.editedBy = editedBy;
        } else {
            throw new IllegalArgumentException("The list of editors cannot exceed 10.");
        }
    }

    public void setMusicBy(List<String> musicBy) {
        if (musicBy.size() <= 10) {
            this.musicBy = musicBy;
        } else {
            throw new IllegalArgumentException("The list of music composers cannot exceed 10.");
        }
    }

    @JsonProperty("subgenres")
    public List<Genre.SubGenre> getSubgenres() {
        return subgenres;
    }


    private void validateSubgenres(List<Genre.SubGenre> subgenres, List<Genre> genres) {
        List<Genre.SubGenre> allowedSubgenres = genres.stream()
                .flatMap(g -> g.getSubGenres().stream())
                .toList();

        if (!new HashSet<>(allowedSubgenres).containsAll(subgenres)) {
            throw new IllegalArgumentException("The subgenres provided are not valid for the given genres.");
        }

        List<Genre> subgenreGenres = subgenres.stream()
                .map(this::getGenreFromSubgenre)
                .toList();

        if (Collections.disjoint(genres, subgenreGenres)) {
            throw new IllegalArgumentException("The subgenres provided are not valid for the given genres.");
        }
    }

    private Genre getGenreFromSubgenre(Genre.SubGenre subgenre) {
        for (Genre genre : Genre.values()) {
            if (genre.getSubGenres().contains(subgenre)) {
                return genre;
            }
        }
        throw new IllegalArgumentException("A genre could not be found for the subgenre provided.");
    }

    @Data
    public static class PersonalRating {
        private int screenplay;
        private int acting;
        private int photography;
        private int entertainment;
        private int recommended;

        public void setScreenplay(int screenplay) {
            if (screenplay >= 0 && screenplay <= 10) {
                this.screenplay = screenplay;
            } else {
                throw new IllegalArgumentException("The rating should be between 0 and 10.");
            }
        }

        public void setActing(int acting) {
            if (acting >= 0 && acting <= 10) {
                this.acting = acting;
            } else {
                throw new IllegalArgumentException("The rating should be between 0 and 10.");
            }
        }

        public void setPhotography(int photography) {
            if (photography >= 0 && photography <= 10) {
                this.photography = photography;
            } else {
                throw new IllegalArgumentException("The rating should be between 0 and 10.");
            }
        }

        public void setEntertainment(int entertainment) {
            if (entertainment >= 0 && entertainment <= 10) {
                this.entertainment = entertainment;
            } else {
                throw new IllegalArgumentException("The rating should be between 0 and 10.");
            }
        }

        public void setRecommended(int recommended) {
            if (recommended >= 0 && recommended <= 10) {
                this.recommended = recommended;
            } else {
                throw new IllegalArgumentException("The rating should be between 0 and 10.");
            }
        }

        public double getFinalRating() {
            return (screenplay + acting + photography + entertainment + recommended) / 5.0;
        }
    }
}
