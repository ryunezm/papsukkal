# Papsukkal CRUD API

## Overview
Papsukkal is a CRUD API for managing a collection of movies. It provides endpoints to create, read, update, and delete movie records stored in a MongoDB database.

## Features
- **Create** new movie records
- **Read** existing movie records
    - Find all movies
    - Find movies by ID
    - Search movies by person (director, screenwriter, producer, actor, cinematographer, editor, composer)
    - Search movies by title
- **Update** existing movie records
- **Delete** movie records by ID

## Technologies Used
- **Java** with **Spring Boot**
- **MongoDB** for database
- **Jakarta Validation** for data validation
- **Lombok** for boilerplate code reduction
- **Spring Data MongoDB** for MongoDB integration
- **Cross-Origin Resource Sharing (CORS)** enabled for frontend integration

## Getting Started

### Prerequisites
- Java 11 or higher
- MongoDB
- Maven
- Node.js and npm (for Angular front-end)

### Installation
#### Back-end
1. Clone the repository:
   ```sh
   git clone https://github.com/ryunezm/papsukkal.git
   cd papsukkal

2. Install dependencies and build the project:
    ```sh
    mvn clean install

3. Configure MongoDB connection in `application.properties`:
    ```sh   
    spring.data.mongodb.database=yourDatabaseName
    spring.data.mongodb.uri=mongodb://localhost:27017/yourDatabaseName

4. Run the application:
    ```sh
    mvn spring-boot:run

#### Front-end
1. Navigate to the `movie-app` directory:
    ```sh
    cd movie-app
   
2. Install dependencies:
   ```sh
   npm install
   
3. Run the Angular application:
    ```sh
    ng serve

The Angular application will be available at `http://localhost:4200`.
### API Endpoints
- Fetch all movies.
    ```sh
    GET /movies

- Fetch a movie by its ID.
    ```sh
    GET /movies/{id}

- Search for movies by any associated person (e.g., director, actor).
    ```sh
    GET /movies/searchByPerson/{keyword}

- Search for movies by title.
    ```sh
    GET /movies/searchByTitle/{title}

- Create a new movie.
    ```sh
    POST /movies

- Update an existing movie by its ID.
  ```sh
    PUT /movies/{id}
  
- Delete a movie by its ID.
    ```sh
    DELETE /movies/{id}


This `README.md` provides an overview of the project, installation instructions, API endpoints, model descriptions, validation rules, and additional information for contributors.
