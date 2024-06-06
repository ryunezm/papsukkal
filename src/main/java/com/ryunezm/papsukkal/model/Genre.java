package com.ryunezm.papsukkal.model;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;

public enum Genre {
    //-----------------------------------//
    //Has subgenres//
    ACTION,
    ADVENTURE,
    ANIMAL_FILM,
    ANIMATION,
    COMEDY,
    CRIME,
    DRAMA,
    EROTIC,
    EXISTENTIAL,
    FANTASY,
    NOIR_FILM,
    HISTORICAL,
    HORROR,
    MUSIC,
    RELIGIOUS,
    ROMANCE,
    SCI_FI,
    SPORT,
    SUPERNATURAL,
    WAR,
    WESTERN,
    HOLIDAY,

    //-----------------------------------//
    //No subgenres//
    BUDDY_FILM,
    DEATH_GAME,
    DOCUMENTARY,
    EDUCATIONAL_FILM,
    INSPIRATIONAL_FILM,
    EXPERIMENTAL,
    FAMILY_FILM,
    JOURNALISM,
    MYSTERY,
    POLITICAL,
    REVENGE_FILM,
    SAMURAI_FILM,
    SATIRE,
    SPY_FILM,
    SUPERHERO,
    SUSPENSE,
    TEEN_FILM,
    TERROR,
    THRILLER,
    ZOMBIE,
}

@Getter
enum SubGenre {
    ACTION(Arrays.asList(ActionSubGenre.values())),
    ANIMAL_FILM(Arrays.asList(AnimalFilmSubgenre.values())),
    ADVENTURE(Arrays.asList(AdventureSubGenre.values())),
    ANIMATION(Arrays.asList(AnimationSubGenre.values())),
    COMEDY(Arrays.asList(ComedySubGenre.values())),
    CRIME(Arrays.asList(CrimeSubGenre.values())),
    DRAMA(Arrays.asList(DramaSubGenre.values())),
    EROTIC(Arrays.asList(EroticSubGenre.values())),
    EXISTENTIAL(Arrays.asList(ExistentialSubGenre.values())),
    FANTASY(Arrays.asList(FantasySubGenre.values())),
    HISTORICAL(Arrays.asList(HistoricalSubGenre.values())),
    HOLIDAY(Arrays.asList(HolidaySubgenre.values())),
    HORROR(Arrays.asList(HorrorSubGenre.values())),
    MUSIC(Arrays.asList(MusicSubGenre.values())),
    NOIR_FILM(Arrays.asList(Noir_FilmSubgenre.values())),
    RELIGIOUS(Arrays.asList(ReligiousSubGenre.values())),
    ROMANCE(Arrays.asList(RomanceSubGenre.values())),
    SCI_FI(Arrays.asList(Sci_FiSubGenre.values())),
    SPORT(Arrays.asList(SportSubGenre.values())),
    SUPERNATURAL(Arrays.asList(SupernaturalSubgenre.values())),
    WAR(Arrays.asList(WarSubGenre.values())),
    WESTERN(Arrays.asList(WesternSubGenre.values()));

    private final List<? extends Enum<?>> subGenres;

    SubGenre(List<? extends Enum<?>> subGenres) {
        this.subGenres = subGenres;
    }

}

enum ActionSubGenre {
    DISASTER,
    MARTIAL_ARTS,
    VIDEO_GAME
}

enum AdventureSubGenre {
    PIRATE,
    SURVIVAL,
    SWASHBUCKLER,
}

enum AnimalFilmSubgenre {
    ANIMAL_RESCUE,
    TALKING_ANIMALS,
}

enum AnimationSubGenre {
    ANIME,
    CGI_2D_ANIMATION,
    CGI_3D_ANIMATION,
    CLAYMATION,
    CUTOUT_ANIMATION,
    LIVE_ACTION_ANIMATION,
    ROTOSCOPING,
}

enum ComedySubGenre {
    BLACK_COMEDY,
    PARODY,
    SCREWBALL,
    SLAPSTICK,
}

enum CrimeSubGenre {
    DETECTIVE,
    HEIST,
    LEGAL,
    GANGSTER,
}

enum DramaSubGenre {
    MELODRAMA,
    SOCIAL_PROBLEM_FILM,
}

enum EroticSubGenre {
    BDSM,
    ERO_GURO,
    FETISH,
    HARDCORE_PORNOGRAPHY,
    LGBT,
    SOFTCORE_PORNOGRAPHY,
}

enum ExistentialSubGenre {
    ABSURDIST,
    COMING_OF_AGE,
    PHILOSOPHICAL,
    PSYCHOLOGICAL,
    SURREALIST
}

enum FantasySubGenre {
    CONTEMPORARY_FANTASY,
    DARK_FANTASY,
    FAIRY_TALE,
    HEROIC_FANTASY,
    URBAN_FANTASY,
}

enum HolidaySubgenre {
    BIRTHDAY,
    CHRISTMAS,
    DAY_OF_THE_DEAD,
    EASTER,
    HALLOWEEN,
    INDEPENDENCE_DAY,
    NEW_YEAR,
    VALENTINES_DAY
}

enum Noir_FilmSubgenre {
    NEO_NOIR,
}

enum HistoricalSubGenre {
    ALTERNATE_HISTORY,
    BIBLICAL,
    BIOGRAPHICAL,
    FICTION,
    PERIOD,
}

enum HorrorSubGenre {
    DEMONIC,
    FOUND_FOOTAGE,
    GORE,
    MONSTER,
    PARANORMAL,
    SLASHER,
    SURVIVAL_HORROR,
    WITCHCRAFT,
}

enum MusicSubGenre {
    BOLLYWOOD,
    CABARET,
    CLASSICAL_MUSIC,
    CONCERT_FILM,
    DANCE,
    DISNEY,
    HIP_HOP,
    JAZZ,
    JUKEBOX,
    MUSICAL,
    POP,
    ROCK,
}

enum ReligiousSubGenre {
    FAITH_BASED,
    SPIRITUAL,
}

enum RomanceSubGenre {
    CHICK_FLICK,
}

enum Sci_FiSubGenre {
    APOCALYPTIC,
    CYBERPUNK,
    DYSTOPIAN,
    KAIJU,
    MILITARY,
    SOLARPUNK,
    SPACE_INVASION,
    SPACE_OPERA,
    SPECULATIVE,
    STEAMPUNK,
}

enum SportSubGenre {
    COLLEGIATE_SPORTS,
    OLYMPIC_SPORTS,
    UNDERDOG,
}

enum SupernaturalSubgenre {
    GHOSTS,
    GODS,
    SPIRITS
}

enum WarSubGenre {
    ANTI_WAR,
    CIVIL_WAR,
    COLD_WAR,
    GUERRILLA_WARFARE,
    PROPAGANDA_FILM,
    VIETNAM_WAR,
    WORLD_WAR_I,
    WORLD_WAR_II,
}

enum WesternSubGenre {
    EMPIRE_WESTERN,
    MARSHAL_WESTERN,
    CONTEMPORARY_WESTERN,
    OUTLAW_WESTERN,
    SPAGHETTI_WESTERN,
}
