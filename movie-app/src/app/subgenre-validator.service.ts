import {Injectable} from '@angular/core';
import {Genre, Subgenre} from './enums/genre.enum';

@Injectable({
  providedIn: 'root'
})
export class SubgenreValidatorService {
  private genreSubgenreMap = new Map<Genre, Subgenre[]>([
    [Genre.ACTION, [Subgenre.ACTION_DISASTER, Subgenre.ACTION_MARTIAL_ARTS, Subgenre.ACTION_VIDEO_GAME]],
    [Genre.ADVENTURE, [Subgenre.ADVENTURE_PIRATE, Subgenre.ADVENTURE_SWASHBUCKLER]],
    [Genre.ANIMAL_FILM, [Subgenre.ANIMAL_FILM_ANIMAL_RESCUE, Subgenre.ANIMAL_FILM_TALKING_ANIMALS]],
    [Genre.ANIMATION, [Subgenre.ANIMATION_ANIME, Subgenre.ANIMATION_CGI_2D, Subgenre.ANIMATION_CGI_3D, Subgenre.ANIMATION_CLAYMATION, Subgenre.ANIMATION_CUTOUT, Subgenre.ANIMATION_LIVE_ACTION, Subgenre.ANIMATION_ROTOSCOPING]],
    [Genre.COMEDY, [Subgenre.COMEDY_BLACK, Subgenre.COMEDY_PARODY, Subgenre.COMEDY_SCREWBALL, Subgenre.COMEDY_SLAPSTICK]],
    [Genre.CRIME, [Subgenre.CRIME_DETECTIVE, Subgenre.CRIME_HEIST, Subgenre.CRIME_LEGAL, Subgenre.CRIME_GANGSTER]],
    [Genre.DRAMA, [Subgenre.DRAMA_MELODRAMA, Subgenre.DRAMA_SOCIAL_PROBLEM]],
    [Genre.EROTIC, [Subgenre.EROTIC_BDSM, Subgenre.EROTIC_ERO_GURO, Subgenre.EROTIC_FETISH, Subgenre.EROTIC_HARDCORE, Subgenre.EROTIC_LGBT, Subgenre.EROTIC_SOFTCORE]],
    [Genre.EXISTENTIAL, [Subgenre.EXISTENTIAL_ABSURDIST, Subgenre.EXISTENTIAL_COMING_OF_AGE, Subgenre.EXISTENTIAL_PHILOSOPHICAL, Subgenre.EXISTENTIAL_PSYCHOLOGICAL, Subgenre.EXISTENTIAL_SURREALIST]],
    [Genre.FANTASY, [Subgenre.FANTASY_CONTEMPORARY, Subgenre.FANTASY_DARK, Subgenre.FANTASY_FAIRY_TALE, Subgenre.FANTASY_HEROIC, Subgenre.FANTASY_URBAN]],
    [Genre.HOLIDAY, [Subgenre.HOLIDAY_BIRTHDAY, Subgenre.HOLIDAY_CHRISTMAS, Subgenre.HOLIDAY_DAY_OF_THE_DEAD, Subgenre.HOLIDAY_EASTER, Subgenre.HOLIDAY_HALLOWEEN, Subgenre.HOLIDAY_INDEPENDENCE_DAY, Subgenre.HOLIDAY_NEW_YEAR, Subgenre.HOLIDAY_VALENTINES_DAY]],
    [Genre.NOIR_FILM, [Subgenre.NOIR_FILM_NEO_NOIR]],
    [Genre.HISTORICAL, [Subgenre.HISTORICAL_ALTERNATE_HISTORY, Subgenre.HISTORICAL_BIBLICAL, Subgenre.HISTORICAL_BIOGRAPHICAL, Subgenre.HISTORICAL_FICTION, Subgenre.HISTORICAL_PERIOD]],
    [Genre.HORROR, [Subgenre.HORROR_DEMONIC, Subgenre.HORROR_FOUND_FOOTAGE, Subgenre.HORROR_GORE, Subgenre.HORROR_MONSTER, Subgenre.HORROR_PARANORMAL, Subgenre.HORROR_SLASHER, Subgenre.HORROR_WITCHCRAFT]],
    [Genre.MUSIC, [Subgenre.MUSIC_BOLLYWOOD, Subgenre.MUSIC_CABARET, Subgenre.MUSIC_CLASSICAL, Subgenre.MUSIC_CONCERT, Subgenre.MUSIC_DANCE, Subgenre.MUSIC_DISNEY, Subgenre.MUSIC_HIP_HOP, Subgenre.MUSIC_JAZZ, Subgenre.MUSIC_JUKEBOX, Subgenre.MUSIC_MUSICAL, Subgenre.MUSIC_POP, Subgenre.MUSIC_ROCK]],
    [Genre.RELIGIOUS, [Subgenre.RELIGIOUS_FAITH_BASED, Subgenre.RELIGIOUS_SPIRITUAL]],
    [Genre.ROMANCE, [Subgenre.ROMANCE_CHICK_FLICK]],
    [Genre.SCI_FI, [Subgenre.SCI_FI_APOCALYPTIC, Subgenre.SCI_FI_CYBERPUNK, Subgenre.SCI_FI_DYSTOPIAN, Subgenre.SCI_FI_KAIJU, Subgenre.SCI_FI_MILITARY, Subgenre.SCI_FI_SOLARPUNK, Subgenre.SCI_FI_SPACE_INVASION, Subgenre.SCI_FI_SPACE_OPERA, Subgenre.SCI_FI_SPECULATIVE, Subgenre.SCI_FI_STEAMPUNK]],
    [Genre.SPORT, [Subgenre.SPORT_COLLEGIATE, Subgenre.SPORT_OLYMPIC, Subgenre.SPORT_UNDERDOG]],
    [Genre.SUPERNATURAL, [Subgenre.SUPERNATURAL_GHOSTS, Subgenre.SUPERNATURAL_GODS, Subgenre.SUPERNATURAL_SPIRITS]],
    [Genre.WAR, [Subgenre.WAR_ANTI_WAR, Subgenre.WAR_CIVIL_WAR, Subgenre.WAR_COLD_WAR, Subgenre.WAR_GUERRILLA_WARFARE, Subgenre.WAR_PROPAGANDA, Subgenre.WAR_VIETNAM_WAR, Subgenre.WAR_WORLD_WAR_I, Subgenre.WAR_WORLD_WAR_II]],
    [Genre.WESTERN, [Subgenre.WESTERN_EMPIRE, Subgenre.WESTERN_MARSHAL, Subgenre.WESTERN_CONTEMPORARY, Subgenre.WESTERN_OUTLAW, Subgenre.WESTERN_SPAGHETTI]],
  ]);

  constructor() {
  }

  validateSubgenres(subgenreKeysOrValues: string[], genreKeysOrValues: string[]): void {
    let subgenres: Subgenre[];
    let genres: Genre[];

    subgenres = subgenreKeysOrValues.map(keyOrValue => {
      return Subgenre[keyOrValue as keyof typeof Subgenre] ??
        Object.values(Subgenre).find(sub => sub === keyOrValue) as Subgenre;
    });

    genres = genreKeysOrValues.map(keyOrValue => {
      return Genre[keyOrValue as keyof typeof Genre] ??
        Object.values(Genre).find(genre => genre === keyOrValue) as Genre;
    });

    if (!subgenres.every(subgenre => subgenre !== undefined) ||
      !genres.every(genre => genre !== undefined)) {
      throw new Error('Invalid subgenre or genre keys/values provided.');
    }

    if (subgenres.length === 0) {
      return;
    }

    const allowedSubgenres = genres
      .flatMap(genre => this.genreSubgenreMap.get(genre) || []);

    if (!subgenres.every(Subgenre => allowedSubgenres.includes(Subgenre))) {
      throw new Error('The Subgenres provided are not valid for the given genres.');
    }

    const SubgenreGenres = subgenres.map(Subgenre => this.getGenreFromSubgenre(Subgenre));

    if (!genres.some(genre => SubgenreGenres.includes(genre))) {
      throw new Error('The genres provided are not valid for the given genres.');
    }
  }

  getGenreFromSubgenre(subgenreKeyOrValue: string): Genre {
    const subgenre = Subgenre[subgenreKeyOrValue as keyof typeof Subgenre] ??
      Object.values(Subgenre).find(sub => sub === subgenreKeyOrValue) as Subgenre;
    if (!subgenre) {
      throw new Error(`Invalid subgenre key/value provided: ${subgenreKeyOrValue}`);
    }

    for (const [genre, subgenres] of this.genreSubgenreMap.entries()) {
      if (subgenres.includes(subgenre)) {
        return genre;
      }
    }

    throw new Error(`A genre could not be found for the subgenre provided: ${subgenre}`);
  }

  getSubgenresFromGenre(genreKeyOrValue: string): Subgenre[] {
    const genre = Genre[genreKeyOrValue as keyof typeof Genre] ??
      Object.values(Genre).find(gen => gen === genreKeyOrValue) as Genre;
    if (!genre) {
      throw new Error(`Invalid genre key/value provided: ${genreKeyOrValue}`);
    }
    return this.genreSubgenreMap.get(genre) || [];
  }

  getAvailableSubgenresObject(genres: string[]): { [key: string]: Subgenre } {
    const subgenres = genres.flatMap((genreString: string) => {
      return this.getSubgenresFromGenre(genreString);
    });

    const subgenreObject: { [key: string]: Subgenre } = {};

    subgenres.forEach(subgenre => {
      const [key, value] = Object.entries(Subgenre).find(([_, val]) => val === subgenre) || [];
      if (key && value) {
        subgenreObject[key] = value as Subgenre;
      }
    });

    return subgenreObject;
  }
}
