
const { test, expect } = require('@playwright/test');
const axios = require('axios');
const config = require('../petfinder.config');

let token;

test.describe('Petfinder API Tests', () => {

    test.beforeAll(async () => {
        const response = await axios.post(config.endpoints.token, {
            grant_type: 'client_credentials',
            client_id: config.auth.clientId,
            client_secret: config.auth.clientSecret,
        });

        token = response.data.access_token;
        expect(token).toBeTruthy();
        console.log(token)
    });

    test.only('Verify "Dog" is in the list of animal types', async () => {
        const response = await axios.get(config.endpoints.animalTypes, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const types = response.data.types.map(type => type.name);
        expect(types).toContain('Dog');
    });

    test('Retrieve all dog breeds', async () => {
        const response = await axios.get(config.endpoints.dogBreeds, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const breeds = response.data.breeds.map(breed => breed.name);
        console.log(`Found ${breeds.length} dog breeds.`);
        expect(breeds.length).toBeGreaterThan(0);
    });

    test('Search for Golden Retriever dogs', async () => {
        const response = await axios.get(config.endpoints.searchDogs, {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                type: 'dog',
                breed: 'Golden Retriever',
            },
        });

        const results = response.data.animals;
        console.log(`Found ${results.length} Golden Retrievers.`);
        expect(results.length).toBeGreaterThan(0);
    });

});
