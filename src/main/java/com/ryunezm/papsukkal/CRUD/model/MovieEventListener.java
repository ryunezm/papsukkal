package com.ryunezm.papsukkal.CRUD.model;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.jetbrains.annotations.NotNull;
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
    public void onAfterSave(@NotNull AfterSaveEvent<Movie> event) {
        updatePeopleCollection(event.getSource(), true);
        updateProductionCompanyCollection(event.getSource(), true);
    }

    @Override
    public void onBeforeDelete(@NotNull BeforeDeleteEvent<Movie> event) {
        String movieId = event.getSource().get("_id").toString();
        movieRepository.findById(movieId).ifPresent(movie -> {
            updatePeopleCollection(movie, false);
            updateProductionCompanyCollection(movie, false);
        });
    }

    private void updatePeopleCollection(@NotNull Movie movie, boolean increment) {
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

    private void updateFieldCount(MongoCollection<Document> collection,
                                  @NotNull List<String> items,
                                  String field,
                                  boolean increment) {
        for (String item : items) {
            Document query = new Document("name", item);
            Document update = new Document("$inc", new Document(field, increment ? 1 : -1));
            collection.updateOne(query, update, new com.mongodb.client.model.UpdateOptions().upsert(true));
        }
    }

    private void updateProductionCompanyCollection(@NotNull Movie movie, boolean increment) {
        MongoDatabase database = mongoClient.getDatabase(mongoDatabaseName);
        MongoCollection<Document> productionCompanyCollection = database.getCollection("productionCompanies");

        updateFieldCount(productionCompanyCollection, movie.getProductionCompany(), "productionCompanyCount", increment);
    }
}

