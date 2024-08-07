import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

export interface Movie {
  id: string;
  title: string;
  titleEN: string;
  titleES: string;
  directedBy?: string[];
  screenplayBy?: string[];
  producedBy?: string[];
  starring?: string[];
  cinematography?: string[];
  editedBy?: string[];
  musicBy?: string[];
  productionCompany?: string[];
  releaseDate: string;
  genres: string[];
  subgenres?: string[];
  runningTime: number;
  countries: string[];
  languages: string[];
  personalRating?: {
    screenplay: number;
    acting: number;
    photography: number;
    entertainment: number;
    recommended: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = 'http://localhost:8080/movies'

  constructor(private http: HttpClient) {
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}`);
  }

  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/${id}`);
  }

  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.baseUrl, movie);
  }

  updateMovie(id: string, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.baseUrl}/${id}`, movie);
  }

  deleteMovie(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
