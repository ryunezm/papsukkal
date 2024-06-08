package com.ryunezm.papsukkal.model;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.AfterSaveEvent;
import org.springframework.data.mongodb.core.mapping.event.BeforeDeleteEvent;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MovieEventListener extends AbstractMongoEventListener<Movie> {
    private final MongoClient mongoClient;
    private final String mongoDatabaseName;
    private final MovieRepository movieRepository;

    @Autowired
    public MovieEventListener(MongoClient mongoClient,
                              @Value("${spring.data.mongodb.database}") String mongoDatabaseName,
                              MovieRepository movieRepository) {
        this.mongoClient = mongoClient;
        this.mongoDatabaseName = mongoDatabaseName;
        this.movieRepository = movieRepository;
    }

    @Override
    public void onAfterSave(AfterSaveEvent<Movie> event) {
        updatePeopleCollection(event.getSource(), true);
    }

    @Override
    public void onBeforeDelete(BeforeDeleteEvent<Movie> event) {
        String movieId = event.getSource().get("_id").toString();
        movieRepository.findById(movieId).ifPresent(movie -> updatePeopleCollection(movie, false));
    }

    private void updatePeopleCollection(Movie movie, boolean increment) {
        MongoDatabase database = mongoClient.getDatabase(mongoDatabaseName);
        MongoCollection<Document> peopleCollection = database.getCollection("people");

        updateFieldCount(peopleCollection, movie.getDirectedBy(), "directedByCount", increment);
        updateFieldCount(peopleCollection, movie.getScreenplayBy(), "screenplayByCount", increment);
        updateFieldCount(peopleCollection, movie.getProducedBy(), "producedByCount", increment);
        updateFieldCount(peopleCollection, movie.getStarring(), "starringCount", increment);
        updateFieldCount(peopleCollection, movie.getCinematography(), "cinematographyCount", increment);
        updateFieldCount(peopleCollection, movie.getEditedBy(), "editedByCount", increment);
        updateFieldCount(peopleCollection, movie.getMusicBy(), "musicByCount", increment);
    }

    private void updateFieldCount(MongoCollection<Document> peopleCollection,
                                  List<String> people,
                                  String field,
                                  boolean increment) {
        for (String person : people) {
            Document query = new Document("name", person);
            Document update = new Document("$inc", new Document(field, increment ? 1 : -1));
            peopleCollection.updateOne(query, update, new com.mongodb.client.model.UpdateOptions().upsert(true));
        }
    }
}
