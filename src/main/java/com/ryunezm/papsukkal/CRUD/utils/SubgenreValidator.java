package com.ryunezm.papsukkal.CRUD.utils;

import com.ryunezm.papsukkal.CRUD.enums.Genre;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;

public class SubgenreValidator {
    public static void validateSubgenres(List<Genre.SubGenre> subgenres, List<Genre> genres) {
        if (subgenres == null || subgenres.isEmpty()) { return; }

        List<Genre.SubGenre> allowedSubgenres = genres.stream()
                .flatMap(g -> g.getSubGenres().stream())
                .toList();

        if (!new HashSet<>(allowedSubgenres).containsAll(subgenres)) {
            throw new IllegalArgumentException("The subgenres provided are not valid for the given genres.");
        }

        List<Genre> subgenreGenres = subgenres.stream()
                .map(SubgenreValidator::getGenreFromSubgenre)
                .toList();

        if (Collections.disjoint(genres, subgenreGenres)) {
            throw new IllegalArgumentException("The subgenres provided are not valid for the given genres.");
        }
    }

    private static Genre getGenreFromSubgenre(Genre.SubGenre subgenre) {
        for (Genre genre : Genre.values()) {
            if (genre.getSubGenres().contains(subgenre)) {
                return genre;
            }
        }
        throw new IllegalArgumentException("A genre could not be found for the subgenre provided.");
    }
}
