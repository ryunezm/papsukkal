export enum Genre {
  ACTION = 'Action',
  ADVENTURE = 'Adventure',
  ANIMAL_FILM = 'Animal Film',
  ANIMATION = 'Animation',
  COMEDY = 'Comedy',
  CRIME = 'Crime',
  DRAMA = 'Drama',
  EROTIC = 'Erotic',
  EXISTENTIAL = 'Existential',
  FANTASY = 'Fantasy',
  HOLIDAY = 'Holiday',
  NOIR_FILM = 'Noir Film',
  HISTORICAL = 'Historical',
  HORROR = 'Horror',
  MUSIC = 'Music',
  RELIGIOUS = 'Religious',
  ROMANCE = 'Romance',
  SCI_FI = 'Sci-Fi',
  SPORT = 'Sport',
  SUPERNATURAL = 'Supernatural',
  WAR = 'War',
  WESTERN = 'Western',
  BUDDY_FILM = 'Buddy Film',
  DEATH_GAME = 'Death Game',
  DOCUMENTARY = 'Documentary',
  EDUCATIONAL_FILM = 'Educational Film',
  INSPIRATIONAL_FILM = 'Inspirational Film',
  EXPERIMENTAL = 'Experimental',
  FAMILY_FILM = 'Family Film',
  JOURNALISM = 'Journalism',
  MYSTERY = 'Mystery',
  POLITICAL = 'Political',
  REVENGE_FILM = 'Revenge Film',
  SAMURAI_FILM = 'Samurai Film',
  SATIRE = 'Satire',
  SPY_FILM = 'Spy Film',
  SUPERHERO = 'Superhero',
  SURVIVAL = 'Survival',
  SUSPENSE = 'Suspense',
  TEEN_FILM = 'Teen Film',
  TERROR = 'Terror',
  THRILLER = 'Thriller',
  ZOMBIE = 'Zombie'
}

export enum SubGenre {
  // ACTION subgenres
  ACTION_DISASTER = 'Disaster',
  ACTION_MARTIAL_ARTS = 'Martial Arts',
  ACTION_VIDEO_GAME = 'Video Game',

  // ADVENTURE subgenres
  ADVENTURE_PIRATE = 'Pirate',
  ADVENTURE_SWASHBUCKLER = 'Swashbuckler',

  // ANIMAL_FILM subgenres
  ANIMAL_FILM_ANIMAL_RESCUE = 'Animal Rescue',
  ANIMAL_FILM_TALKING_ANIMALS = 'Talking Animals',

  // ANIMATION subgenres
  ANIMATION_ANIME = 'Anime',
  ANIMATION_CGI_2D = 'CGI 2D',
  ANIMATION_CGI_3D = 'CGI 3D',
  ANIMATION_CLAYMATION = 'Claymation',
  ANIMATION_CUTOUT = 'Cutout',
  ANIMATION_LIVE_ACTION = 'Live Action',
  ANIMATION_ROTOSCOPING = 'Rotoscoping',

  // COMEDY subgenres
  COMEDY_BLACK = 'Black',
  COMEDY_PARODY = 'Parody',
  COMEDY_SCREWBALL = 'Screwball',
  COMEDY_SLAPSTICK = 'Slapstick',

  // CRIME subgenres
  CRIME_DETECTIVE = 'Detective',
  CRIME_HEIST = 'Heist',
  CRIME_LEGAL = 'Legal',
  CRIME_GANGSTER = 'Gangster',

  // DRAMA subgenres
  DRAMA_MELODRAMA = 'Melodrama',
  DRAMA_SOCIAL_PROBLEM = 'Social Problem',

  // EROTIC subgenres
  EROTIC_BDSM = 'BDSM',
  EROTIC_ERO_GURO = 'Ero Guro',
  EROTIC_FETISH = 'Fetish',
  EROTIC_HARDCORE = 'Hardcore',
  EROTIC_LGBT = 'LGBT',
  EROTIC_SOFTCORE = 'Softcore',

  // EXISTENTIAL subgenres
  EXISTENTIAL_ABSURDIST = 'Absurdist',
  EXISTENTIAL_COMING_OF_AGE = 'Coming of Age',
  EXISTENTIAL_PHILOSOPHICAL = 'Philosophical',
  EXISTENTIAL_PSYCHOLOGICAL = 'Psychological',
  EXISTENTIAL_SURREALIST = 'Surrealist',

  // FANTASY subgenres
  FANTASY_CONTEMPORARY = 'Contemporary',
  FANTASY_DARK = 'Dark',
  FANTASY_FAIRY_TALE = 'Fairy Tale',
  FANTASY_HEROIC = 'Heroic',
  FANTASY_URBAN = 'Urban',

  // HISTORICAL subgenres
  HISTORICAL_ALTERNATE_HISTORY = 'Alternate History',
  HISTORICAL_BIBLICAL = 'Biblical',
  HISTORICAL_BIOGRAPHICAL = 'Biographical',
  HISTORICAL_FICTION = 'Fiction',
  HISTORICAL_PERIOD = 'Period',

  // HOLIDAY subgenres
  HOLIDAY_BIRTHDAY = 'Birthday',
  HOLIDAY_CHRISTMAS = 'Christmas',
  HOLIDAY_DAY_OF_THE_DEAD = 'Day of the Dead',
  HOLIDAY_EASTER = 'Easter',
  HOLIDAY_HALLOWEEN = 'Halloween',
  HOLIDAY_INDEPENDENCE_DAY = 'Independence Day',
  HOLIDAY_NEW_YEAR = 'New Year',
  HOLIDAY_VALENTINES_DAY = 'Valentine\'s Day',

  // HORROR subgenres
  HORROR_DEMONIC = 'Demonic',
  HORROR_FOUND_FOOTAGE = 'Found Footage',
  HORROR_GORE = 'Gore',
  HORROR_MONSTER = 'Monster',
  HORROR_PARANORMAL = 'Paranormal',
  HORROR_SLASHER = 'Slasher',
  HORROR_WITCHCRAFT = 'Witchcraft',

  // MUSIC subgenres
  MUSIC_BOLLYWOOD = 'Bollywood',
  MUSIC_CABARET = 'Cabaret',
  MUSIC_CLASSICAL = 'Classical',
  MUSIC_CONCERT = 'Concert',
  MUSIC_DANCE = 'Dance',
  MUSIC_DISNEY = 'Disney',
  MUSIC_HIP_HOP = 'Hip Hop',
  MUSIC_JAZZ = 'Jazz',
  MUSIC_JUKEBOX = 'Jukebox',
  MUSIC_MUSICAL = 'Musical',
  MUSIC_POP = 'Pop',
  MUSIC_ROCK = 'Rock',

  // NOIR_FILM subgenres
  NOIR_FILM_NEO_NOIR = 'Neo-Noir',

  // RELIGIOUS subgenres
  RELIGIOUS_FAITH_BASED = 'Faith-Based',
  RELIGIOUS_SPIRITUAL = 'Spiritual',

  // ROMANCE subgenres
  ROMANCE_CHICK_FLICK = 'Chick Flick',

  // SCI_FI subgenres
  SCI_FI_APOCALYPTIC = 'Apocalyptic',
  SCI_FI_CYBERPUNK = 'Cyberpunk',
  SCI_FI_DYSTOPIAN = 'Dystopian',
  SCI_FI_KAIJU = 'Kaiju',
  SCI_FI_MILITARY = 'Military',
  SCI_FI_SOLARPUNK = 'Solarpunk',
  SCI_FI_SPACE_INVASION = 'Space Invasion',
  SCI_FI_SPACE_OPERA = 'Space Opera',
  SCI_FI_SPECULATIVE = 'Speculative',
  SCI_FI_STEAMPUNK = 'Steampunk',

  // SPORT subgenres
  SPORT_COLLEGIATE = 'Collegiate',
  SPORT_OLYMPIC = 'Olympic',
  SPORT_UNDERDOG = 'Underdog',

  // SUPERNATURAL subgenres
  SUPERNATURAL_GHOSTS = 'Ghosts',
  SUPERNATURAL_GODS = 'Gods',
  SUPERNATURAL_SPIRITS = 'Spirits',

  // WAR subgenres
  WAR_ANTI_WAR = 'Anti-War',
  WAR_CIVIL_WAR = 'Civil War',
  WAR_COLD_WAR = 'Cold War',
  WAR_GUERRILLA_WARFARE = 'Guerrilla Warfare',
  WAR_PROPAGANDA = 'Propaganda',
  WAR_VIETNAM_WAR = 'Vietnam War',
  WAR_WORLD_WAR_I = 'World War I',
  WAR_WORLD_WAR_II = 'World War II',

  // WESTERN subgenres
  WESTERN_EMPIRE = 'Empire',
  WESTERN_MARSHAL = 'Marshal',
  WESTERN_CONTEMPORARY = 'Contemporary',
  WESTERN_OUTLAW = 'Outlaw',
  WESTERN_SPAGHETTI = 'Spaghetti'
}
