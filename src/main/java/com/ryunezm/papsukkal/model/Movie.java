package com.ryunezm.papsukkal.model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Data
@Document(collection = "movies")
public class Movie {

    @Id
    private String id;
    private String titleOriginal;
    private String titleEN;
    private String titleES;
    private List<String> directedBy;
    private List<String> screenplayBy;
    private List<String> producedBy;
    private List<String> starring;
    private List<String> cinematography;
    private List<String> editedBy;
    private List<String> musicBy;
    private LocalDate releaseDate;
    private List<Genre> genre;
    private List<SubGenre> subgenre;
    private int runningTime;
    private List<Language> language;
}
