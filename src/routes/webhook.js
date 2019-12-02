const express = require('express');
const JSONParseError = require('@line/bot-sdk').JSONParseError;
const SignatureValidationFailed = require('@line/bot-sdk').SignatureValidationFailed;
const Client = require('@line/bot-sdk').Client;
const router = express.Router();

// create a client
const client =  new Client({
    channelAccessToken: "fNg/EHnJE+tnjclBLAOrFHZD6V1UcgfNv6AWtK2lkM9Yjm0NmoM98RHX8OANi0IhC0n+hiPIWd+sD3jkzxN740hp8T/27PCEg7htb79fCREJBD31osvp9ikdMs1qzQKEpX61TTnN2v1j5JnrBTAJ1AdB04t89/1O/w1cDnyilFU=",
    channelSecret: "71ad20faadd686f88fff6a75e8fa971c"
});

router.post('/webhook', (req, res) => {
    Promise.all(req.body.events.map(handleEvent))
    .then(() => res.json("{}"))
    .catch((err) => {
        console.error(err);
        res.status(200).end();
    });
});

// Get data success 
const handleEvent = async (ev) => {
    console.log(ev);
    if (ev.type !== "message" || ev.message.type !== "text") {
        return null;
    }
    if(ev.source.userId && ev.source.userId != "Udeadbeefdeadbeefdeadbeefdeadbeef") {
        client.pushMessage(ev.source.userId, { type: 'text', text: 'Hello bạn!' });
    }
}

// Get data fail then error handing
router.use((err, req, res, next) => {
    if (err instanceof SignatureValidationFailed) {
        res.status(401).send(err.signature);
        return;
    } else if (err instanceof JSONParseError) {
        res.status(400).send(err.raw);
        return;
    }
    next(err);
})

export default router;