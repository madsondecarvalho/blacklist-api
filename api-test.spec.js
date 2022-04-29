//Random documents
const document1 = "405.317.600-06"

describe("GET / ", () => {
    test(`It should return API status`, async () => {
        const axios = require('axios');
        const response = await axios.get(`http://localhost:3000/status`);
        expect(response.status).toEqual(200)
        expect(response.data.uptime).toBeGreaterThan(0)
    });
});

describe("GET / ", () => {
    test(`It should '{"blacklist": "FREE"} to the document that is not in blacklist'`, async () => {
        const axios = require('axios');
        const response = await axios.get(`http://localhost:3000/blacklist?document=${document1}`);
        expect(response.status).toEqual(200)
        expect(response.data).toEqual({ blacklist: "FREE" })
    });
});

describe("PUT / ", () => {
    test("It should create a document on blacklist", async () => {
        const axios = require('axios');
        const response = await axios.put(`http://localhost:3000/add`, { document: document1 });
        expect(response.status).toEqual(201)
    });
});

describe("GET / ", () => {
    test(`It should '{"blacklist": "BLOCK"} to the document in blacklist'`, async () => {
        const axios = require('axios');
        const response = await axios.get(`http://localhost:3000/blacklist?document=${document1}`);
        expect(response.status).toEqual(200)
        expect(response.data).toEqual({ blacklist: "BLOCK" })
    });
});

describe("DELETE / ", () => {
    test("It should delete a document from blacklist", async () => {
        const axios = require('axios');
        const response = await axios.delete(`http://localhost:3000/remove`, { data: { document: document1 } });
        expect(response.status).toEqual(200)
        expect(response.data).toEqual({ message: "Document deleted from blacklist" })
    });
});

describe("GET / ", () => {
    test(`It should '{"blacklist": "FREE"} again to the document that is not in blacklist'`, async () => {
        const axios = require('axios');
        const response = await axios.get(`http://localhost:3000/blacklist?document=${document1}`);
        expect(response.status).toEqual(200)
        expect(response.data).toEqual({ blacklist: "FREE" })
    });
});