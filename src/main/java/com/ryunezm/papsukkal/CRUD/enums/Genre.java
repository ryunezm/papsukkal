package com.ryunezm.papsukkal.CRUD.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

import java.util.Arrays;
import java.util.List;

@Getter
public enum Genre {
    // With subgenres //
    ACTION(Arrays.asList(SubGenre.ACTION_DISASTER, SubGenre.ACTION_MARTIAL_ARTS, SubGenre.ACTION_VIDEO_GAME)),
    ADVENTURE(Arrays.asList(SubGenre.ADVENTURE_PIRATE, SubGenre.ADVENTURE_SWASHBUCKLER)),
    ANIMAL_FILM(Arrays.asList(SubGenre.ANIMAL_FILM_ANIMAL_RESCUE, SubGenre.ANIMAL_FILM_TALKING_ANIMALS)),
    ANIMATION(Arrays.asList(SubGenre.ANIMATION_ANIME, SubGenre.ANIMATION_CGI_2D, SubGenre.ANIMATION_CGI_3D, SubGenre.ANIMATION_CLAYMATION, SubGenre.ANIMATION_CUTOUT, SubGenre.ANIMATION_LIVE_ACTION, SubGenre.ANIMATION_ROTOSCOPING)),
    COMEDY(Arrays.asList(SubGenre.COMEDY_BLACK, SubGenre.COMEDY_PARODY, SubGenre.COMEDY_SCREWBALL, SubGenre.COMEDY_SLAPSTICK)),
    CRIME(Arrays.asList(SubGenre.CRIME_DETECTIVE, SubGenre.CRIME_HEIST, SubGenre.CRIME_LEGAL, SubGenre.CRIME_GANGSTER)),
    DRAMA(Arrays.asList(SubGenre.DRAMA_MELODRAMA, SubGenre.DRAMA_SOCIAL_PROBLEM)),
    EROTIC(Arrays.asList(SubGenre.EROTIC_BDSM, SubGenre.EROTIC_ERO_GURO, SubGenre.EROTIC_FETISH, SubGenre.EROTIC_HARDCORE, SubGenre.EROTIC_LGBT, SubGenre.EROTIC_SOFTCORE)),
    EXISTENTIAL(Arrays.asList(SubGenre.EXISTENTIAL_ABSURDIST, SubGenre.EXISTENTIAL_COMING_OF_AGE, SubGenre.EXISTENTIAL_PHILOSOPHICAL, SubGenre.EXISTENTIAL_PSYCHOLOGICAL, SubGenre.EXISTENTIAL_SURREALIST)),
    FANTASY(Arrays.asList(SubGenre.FANTASY_CONTEMPORARY, SubGenre.FANTASY_DARK, SubGenre.FANTASY_FAIRY_TALE, SubGenre.FANTASY_HEROIC, SubGenre.FANTASY_URBAN)),
    HOLIDAY(Arrays.asList(SubGenre.HOLIDAY_BIRTHDAY, SubGenre.HOLIDAY_CHRISTMAS, SubGenre.HOLIDAY_DAY_OF_THE_DEAD, SubGenre.HOLIDAY_EASTER, SubGenre.HOLIDAY_HALLOWEEN, SubGenre.HOLIDAY_INDEPENDENCE_DAY, SubGenre.HOLIDAY_NEW_YEAR, SubGenre.HOLIDAY_VALENTINES_DAY)),
    NOIR_FILM(List.of(SubGenre.NOIR_FILM_NEO_NOIR)),
    HISTORICAL(Arrays.asList(SubGenre.HISTORICAL_ALTERNATE_HISTORY, SubGenre.HISTORICAL_BIBLICAL, SubGenre.HISTORICAL_BIOGRAPHICAL, SubGenre.HISTORICAL_FICTION, SubGenre.HISTORICAL_PERIOD)),
    HORROR(Arrays.asList(SubGenre.HORROR_DEMONIC, SubGenre.HORROR_FOUND_FOOTAGE, SubGenre.HORROR_GORE, SubGenre.HORROR_MONSTER, SubGenre.HORROR_PARANORMAL, SubGenre.HORROR_SLASHER, SubGenre.HORROR_WITCHCRAFT)),
    MUSIC(Arrays.asList(SubGenre.MUSIC_BOLLYWOOD, SubGenre.MUSIC_CABARET, SubGenre.MUSIC_CLASSICAL, SubGenre.MUSIC_CONCERT, SubGenre.MUSIC_DANCE, SubGenre.MUSIC_DISNEY, SubGenre.MUSIC_HIP_HOP, SubGenre.MUSIC_JAZZ, SubGenre.MUSIC_JUKEBOX, SubGenre.MUSIC_MUSICAL, SubGenre.MUSIC_POP, SubGenre.MUSIC_ROCK)),
    RELIGIOUS(Arrays.asList(SubGenre.RELIGIOUS_FAITH_BASED, SubGenre.RELIGIOUS_SPIRITUAL)),
    ROMANCE(List.of(SubGenre.ROMANCE_CHICK_FLICK)),
    SCI_FI(Arrays.asList(SubGenre.SCI_FI_APOCALYPTIC, SubGenre.SCI_FI_CYBERPUNK, SubGenre.SCI_FI_DYSTOPIAN, SubGenre.SCI_FI_KAIJU, SubGenre.SCI_FI_MILITARY, SubGenre.SCI_FI_SOLARPUNK, SubGenre.SCI_FI_SPACE_INVASION, SubGenre.SCI_FI_SPACE_OPERA, SubGenre.SCI_FI_SPECULATIVE, SubGenre.SCI_FI_STEAMPUNK)),
    SPORT(Arrays.asList(SubGenre.SPORT_COLLEGIATE, SubGenre.SPORT_OLYMPIC, SubGenre.SPORT_UNDERDOG)),
    SUPERNATURAL(Arrays.asList(SubGenre.SUPERNATURAL_GHOSTS, SubGenre.SUPERNATURAL_GODS, SubGenre.SUPERNATURAL_SPIRITS)),
    WAR(Arrays.asList(SubGenre.WAR_ANTI_WAR, SubGenre.WAR_CIVIL_WAR, SubGenre.WAR_COLD_WAR, SubGenre.WAR_GUERRILLA_WARFARE, SubGenre.WAR_PROPAGANDA, SubGenre.WAR_VIETNAM_WAR, SubGenre.WAR_WORLD_WAR_I, SubGenre.WAR_WORLD_WAR_II)),
    WESTERN(Arrays.asList(SubGenre.WESTERN_EMPIRE, SubGenre.WESTERN_MARSHAL, SubGenre.WESTERN_CONTEMPORARY, SubGenre.WESTERN_OUTLAW, SubGenre.WESTERN_SPAGHETTI)),

    // Not subgenres //
    BUDDY_FILM(List.of()),
    DEATH_GAME(List.of()),
    DOCUMENTARY(List.of()),
    EDUCATIONAL_FILM(List.of()),
    INSPIRATIONAL_FILM(List.of()),
    EXPERIMENTAL(List.of()),
    FAMILY_FILM(List.of()),
    JOURNALISM(List.of()),
    MYSTERY(List.of()),
    POLITICAL(List.of()),
    REVENGE_FILM(List.of()),
    SAMURAI_FILM(List.of()),
    SATIRE(List.of()),
    SPY_FILM(List.of()),
    SUPERHERO(List.of()),
    SURVIVAL(List.of()),
    SUSPENSE(List.of()),
    TEEN_FILM(List.of()),
    TERROR(List.of()),
    THRILLER(List.of()),
    ZOMBIE(List.of());

    private final List<SubGenre> subGenres;

    Genre(List<SubGenre> subGenres) {
        this.subGenres = subGenres;
    }

    @JsonCreator
    public static Genre fromValue(String value) {
        return Genre.valueOf(value.toUpperCase());
    }

    @JsonValue
    public String toValue() {
        return name();
    }

    public enum SubGenre {
        // ACTION subgenres
        ACTION_DISASTER,
        ACTION_MARTIAL_ARTS,
        ACTION_VIDEO_GAME,

        // ADVENTURE subgenres
        ADVENTURE_PIRATE,
        ADVENTURE_SWASHBUCKLER,

        // ANIMAL_FILM subgenres
        ANIMAL_FILM_ANIMAL_RESCUE,
        ANIMAL_FILM_TALKING_ANIMALS,

        // ANIMATION subgenres
        ANIMATION_ANIME,
        ANIMATION_CGI_2D,
        ANIMATION_CGI_3D,
        ANIMATION_CLAYMATION,
        ANIMATION_CUTOUT,
        ANIMATION_LIVE_ACTION,
        ANIMATION_ROTOSCOPING,

        // COMEDY subgenres
        COMEDY_BLACK,
        COMEDY_PARODY,
        COMEDY_SCREWBALL,
        COMEDY_SLAPSTICK,

        // CRIME subgenres
        CRIME_DETECTIVE,
        CRIME_HEIST,
        CRIME_LEGAL,
        CRIME_GANGSTER,

        // DRAMA subgenres
        DRAMA_MELODRAMA,
        DRAMA_SOCIAL_PROBLEM,

        // EROTIC subgenres
        EROTIC_BDSM,
        EROTIC_ERO_GURO,
        EROTIC_FETISH,
        EROTIC_HARDCORE,
        EROTIC_LGBT,
        EROTIC_SOFTCORE,

        // EXISTENTIAL subgenres
        EXISTENTIAL_ABSURDIST,
        EXISTENTIAL_COMING_OF_AGE,
        EXISTENTIAL_PHILOSOPHICAL,
        EXISTENTIAL_PSYCHOLOGICAL,
        EXISTENTIAL_SURREALIST,

        // FANTASY subgenres
        FANTASY_CONTEMPORARY,
        FANTASY_DARK,
        FANTASY_FAIRY_TALE,
        FANTASY_HEROIC,
        FANTASY_URBAN,

        // HISTORICAL subgenres
        HISTORICAL_ALTERNATE_HISTORY,
        HISTORICAL_BIBLICAL,
        HISTORICAL_BIOGRAPHICAL,
        HISTORICAL_FICTION,
        HISTORICAL_PERIOD,

        // HOLIDAY subgenres
        HOLIDAY_BIRTHDAY,
        HOLIDAY_CHRISTMAS,
        HOLIDAY_DAY_OF_THE_DEAD,
        HOLIDAY_EASTER,
        HOLIDAY_HALLOWEEN,
        HOLIDAY_INDEPENDENCE_DAY,
        HOLIDAY_NEW_YEAR,
        HOLIDAY_VALENTINES_DAY,

        // HORROR subgenres
        HORROR_DEMONIC,
        HORROR_FOUND_FOOTAGE,
        HORROR_GORE,
        HORROR_MONSTER,
        HORROR_PARANORMAL,
        HORROR_SLASHER,
        HORROR_WITCHCRAFT,

        // MUSIC subgenres
        MUSIC_BOLLYWOOD,
        MUSIC_CABARET,
        MUSIC_CLASSICAL,
        MUSIC_CONCERT,
        MUSIC_DANCE,
        MUSIC_DISNEY,
        MUSIC_HIP_HOP,
        MUSIC_JAZZ,
        MUSIC_JUKEBOX,
        MUSIC_MUSICAL,
        MUSIC_POP,
        MUSIC_ROCK,

        // NOIR_FILM subgenres
        NOIR_FILM_NEO_NOIR,

        // RELIGIOUS subgenres
        RELIGIOUS_FAITH_BASED,
        RELIGIOUS_SPIRITUAL,

        // ROMANCE subgenres
        ROMANCE_CHICK_FLICK,

        // SCI_FI subgenres
        SCI_FI_APOCALYPTIC,
        SCI_FI_CYBERPUNK,
        SCI_FI_DYSTOPIAN,
        SCI_FI_KAIJU,
        SCI_FI_MILITARY,
        SCI_FI_SOLARPUNK,
        SCI_FI_SPACE_INVASION,
        SCI_FI_SPACE_OPERA,
        SCI_FI_SPECULATIVE,
        SCI_FI_STEAMPUNK,

        // SPORT subgenres
        SPORT_COLLEGIATE,
        SPORT_OLYMPIC,
        SPORT_UNDERDOG,

        // SUPERNATURAL subgenres
        SUPERNATURAL_GHOSTS,
        SUPERNATURAL_GODS,
        SUPERNATURAL_SPIRITS,

        // WAR subgenres
        WAR_ANTI_WAR,
        WAR_CIVIL_WAR,
        WAR_COLD_WAR,
        WAR_GUERRILLA_WARFARE,
        WAR_PROPAGANDA,
        WAR_VIETNAM_WAR,
        WAR_WORLD_WAR_I,
        WAR_WORLD_WAR_II,

        // WESTERN subgenres
        WESTERN_EMPIRE,
        WESTERN_MARSHAL,
        WESTERN_CONTEMPORARY,
        WESTERN_OUTLAW,
        WESTERN_SPAGHETTI
    }
}
