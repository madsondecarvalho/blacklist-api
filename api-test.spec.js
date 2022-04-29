//Random documents
const faker = require('faker-br')
const document = faker.br.cpf()
const invalidDocument = "Invalid Document"

describe("GET / ", () => {
    test(`It GET main route`, async () => {
        const axios = require('axios');
        const response = await axios.get(`http://localhost:3000/`);
        expect(response.status).toEqual(200)
    });
});

describe("GET /status ", () => {
    test(`It should return API status`, async () => {
        const axios = require('axios');
        const response = await axios.get(`http://localhost:3000/status`);
        expect(response.status).toEqual(200)
        expect(response.data.uptime).toBeGreaterThan(0)
    });
});

describe("GET /blacklist ", () => {
    test(`It should '{"blacklist": "FREE"} to the document that is not in blacklist'`, async () => {
        const axios = require('axios');
        const response = await axios.get(`http://localhost:3000/blacklist?document=${document}`);
        expect(response.status).toEqual(200)
        expect(response.data).toEqual({ blacklist: "FREE" })
    });
});

describe("PUT /add ", () => {
    test("It should create a document on blacklist", async () => {
        const axios = require('axios');
        const response = await axios.put(`http://localhost:3000/add`, { document: document });
        expect(response.status).toEqual(201)
    });
});

describe("PUT /add ", () => {
    test("It should NOT create an invalid document on blacklist", async () => {
        try {
            const axios = require('axios');
            const response = await axios.put(`http://localhost:3000/add`, { document: invalidDocument });
        } catch (error) {
            expect(error.response.status).toEqual(400)
            expect(error.response.data).toHaveProperty('message')
        }
    });
});

describe("GET /blacklist ", () => {
    test(`It should '{"blacklist": "BLOCK"} to the document in blacklist'`, async () => {
        const axios = require('axios');
        const response = await axios.get(`http://localhost:3000/blacklist?document=${document}`);
        expect(response.status).toEqual(200)
        expect(response.data).toEqual({ blacklist: "BLOCK" })
    });
});

describe("DELETE /remove ", () => {
    test("It should delete a document from blacklist", async () => {
        const axios = require('axios');
        const response = await axios.delete(`http://localhost:3000/remove`, { data: { document: document } });
        expect(response.status).toEqual(200)
        expect(response.data).toEqual({ message: "Document deleted from blacklist" })
    });
});

describe("GET /blacklist ", () => {
    test(`It should '{"blacklist": "FREE"} again to the document that is not in blacklist'`, async () => {
        const axios = require('axios');
        const response = await axios.get(`http://localhost:3000/blacklist?document=${document}`);
        expect(response.status).toEqual(200)
        expect(response.data).toEqual({ blacklist: "FREE" })
    });
});