package com.ryunezm.papsukkal.config;


import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MongoConfig {
    @Value("${MONGO_URI}")
    private String mongoUri;

    @Value("${MONGO_DATABASE}")
    private String mongoDatabase;

    @Bean
    public MongoClient mongoClient() {
        return MongoClients.create(mongoUri);
    }

    @Bean
    public String mongoDatabase() {
        return mongoDatabase;
    }
}
