import { Injectable } from '@angular/core';
import {Genre, SubGenre} from './enums/genre.enum';

@Injectable({
  providedIn: 'root'
})
export class SubgenreValidatorService {
  private genreSubgenreMap = new Map<Genre, SubGenre[]>([
    [Genre.ACTION, [SubGenre.ACTION_DISASTER, SubGenre.ACTION_MARTIAL_ARTS, SubGenre.ACTION_VIDEO_GAME]],
    [Genre.ADVENTURE, [SubGenre.ADVENTURE_PIRATE, SubGenre.ADVENTURE_SWASHBUCKLER]],
    [Genre.ANIMAL_FILM, [SubGenre.ANIMAL_FILM_ANIMAL_RESCUE, SubGenre.ANIMAL_FILM_TALKING_ANIMALS]],
    [Genre.ANIMATION, [SubGenre.ANIMATION_ANIME, SubGenre.ANIMATION_CGI_2D, SubGenre.ANIMATION_CGI_3D, SubGenre.ANIMATION_CLAYMATION, SubGenre.ANIMATION_CUTOUT, SubGenre.ANIMATION_LIVE_ACTION, SubGenre.ANIMATION_ROTOSCOPING]],
    [Genre.COMEDY, [SubGenre.COMEDY_BLACK, SubGenre.COMEDY_PARODY, SubGenre.COMEDY_SCREWBALL, SubGenre.COMEDY_SLAPSTICK]],
    [Genre.CRIME, [SubGenre.CRIME_DETECTIVE, SubGenre.CRIME_HEIST, SubGenre.CRIME_LEGAL, SubGenre.CRIME_GANGSTER]],
    [Genre.DRAMA, [SubGenre.DRAMA_MELODRAMA, SubGenre.DRAMA_SOCIAL_PROBLEM]],
    [Genre.EROTIC, [SubGenre.EROTIC_BDSM, SubGenre.EROTIC_ERO_GURO, SubGenre.EROTIC_FETISH, SubGenre.EROTIC_HARDCORE, SubGenre.EROTIC_LGBT, SubGenre.EROTIC_SOFTCORE]],
    [Genre.EXISTENTIAL, [SubGenre.EXISTENTIAL_ABSURDIST, SubGenre.EXISTENTIAL_COMING_OF_AGE, SubGenre.EXISTENTIAL_PHILOSOPHICAL, SubGenre.EXISTENTIAL_PSYCHOLOGICAL, SubGenre.EXISTENTIAL_SURREALIST]],
    [Genre.FANTASY, [SubGenre.FANTASY_CONTEMPORARY, SubGenre.FANTASY_DARK, SubGenre.FANTASY_FAIRY_TALE, SubGenre.FANTASY_HEROIC, SubGenre.FANTASY_URBAN]],
    [Genre.HOLIDAY, [SubGenre.HOLIDAY_BIRTHDAY, SubGenre.HOLIDAY_CHRISTMAS, SubGenre.HOLIDAY_DAY_OF_THE_DEAD, SubGenre.HOLIDAY_EASTER, SubGenre.HOLIDAY_HALLOWEEN, SubGenre.HOLIDAY_INDEPENDENCE_DAY, SubGenre.HOLIDAY_NEW_YEAR, SubGenre.HOLIDAY_VALENTINES_DAY]],
    [Genre.NOIR_FILM, [SubGenre.NOIR_FILM_NEO_NOIR]],
    [Genre.HISTORICAL, [SubGenre.HISTORICAL_ALTERNATE_HISTORY, SubGenre.HISTORICAL_BIBLICAL, SubGenre.HISTORICAL_BIOGRAPHICAL, SubGenre.HISTORICAL_FICTION, SubGenre.HISTORICAL_PERIOD]],
    [Genre.HORROR, [SubGenre.HORROR_DEMONIC, SubGenre.HORROR_FOUND_FOOTAGE, SubGenre.HORROR_GORE, SubGenre.HORROR_MONSTER, SubGenre.HORROR_PARANORMAL, SubGenre.HORROR_SLASHER, SubGenre.HORROR_WITCHCRAFT]],
    [Genre.MUSIC, [SubGenre.MUSIC_BOLLYWOOD, SubGenre.MUSIC_CABARET, SubGenre.MUSIC_CLASSICAL, SubGenre.MUSIC_CONCERT, SubGenre.MUSIC_DANCE, SubGenre.MUSIC_DISNEY, SubGenre.MUSIC_HIP_HOP, SubGenre.MUSIC_JAZZ, SubGenre.MUSIC_JUKEBOX, SubGenre.MUSIC_MUSICAL, SubGenre.MUSIC_POP, SubGenre.MUSIC_ROCK]],
    [Genre.RELIGIOUS, [SubGenre.RELIGIOUS_FAITH_BASED, SubGenre.RELIGIOUS_SPIRITUAL]],
    [Genre.ROMANCE, [SubGenre.ROMANCE_CHICK_FLICK]],
    [Genre.SCI_FI, [SubGenre.SCI_FI_APOCALYPTIC, SubGenre.SCI_FI_CYBERPUNK, SubGenre.SCI_FI_DYSTOPIAN, SubGenre.SCI_FI_KAIJU, SubGenre.SCI_FI_MILITARY, SubGenre.SCI_FI_SOLARPUNK, SubGenre.SCI_FI_SPACE_INVASION, SubGenre.SCI_FI_SPACE_OPERA, SubGenre.SCI_FI_SPECULATIVE, SubGenre.SCI_FI_STEAMPUNK]],
    [Genre.SPORT, [SubGenre.SPORT_COLLEGIATE, SubGenre.SPORT_OLYMPIC, SubGenre.SPORT_UNDERDOG]],
    [Genre.SUPERNATURAL, [SubGenre.SUPERNATURAL_GHOSTS, SubGenre.SUPERNATURAL_GODS, SubGenre.SUPERNATURAL_SPIRITS]],
    [Genre.WAR, [SubGenre.WAR_ANTI_WAR, SubGenre.WAR_CIVIL_WAR, SubGenre.WAR_COLD_WAR, SubGenre.WAR_GUERRILLA_WARFARE, SubGenre.WAR_PROPAGANDA, SubGenre.WAR_VIETNAM_WAR, SubGenre.WAR_WORLD_WAR_I, SubGenre.WAR_WORLD_WAR_II]],
    [Genre.WESTERN, [SubGenre.WESTERN_EMPIRE, SubGenre.WESTERN_MARSHAL, SubGenre.WESTERN_CONTEMPORARY, SubGenre.WESTERN_OUTLAW, SubGenre.WESTERN_SPAGHETTI]],
  ]);

  validateSubgenres(subgenres: SubGenre[], genres: Genre[]): void {
    const allowedSubgenres = genres
      .flatMap(genre => this.genreSubgenreMap.get(genre) || []);

    if (!subgenres.every(subgenre => allowedSubgenres.includes(subgenre))) {
      throw new Error('The subgenres provided are not valid for the given genres.');
    }

    const subgenreGenres = subgenres.map(subgenre => this.getGenreFromSubgenre(subgenre));

    if (!genres.some(genre => subgenreGenres.includes(genre))) {
      throw new Error('The subgenres provided are not valid for the given genres.');
    }
  }

  getGenreFromSubgenre(subgenre: SubGenre): Genre {
    for (const [genre, subgenres] of this.genreSubgenreMap.entries()) {
      if (subgenres.includes(subgenre)) {
        return genre;
      }
    }
    throw new Error('A genre could not be found for the subgenre provided.');
  }

  constructor() { }
}
