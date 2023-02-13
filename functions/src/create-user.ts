// import { auth } from 'firebase-admin';

import * as functions from 'firebase-functions';
import {auth, db} from './init';
import { getUserCredentialsMiddleware } from './auth.middleware';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

export const createUserApp = express();

createUserApp.use(bodyParser.json());
createUserApp.use(cors({origin: true}));
createUserApp.use(getUserCredentialsMiddleware);

createUserApp.post('/', async (req, res) => {
    functions.logger.debug('calling create user function. req: ', req);

    try {

        if (!(req['uid'] && req['admin'])) {
            const message = 'Denied access to user creation service dude! wtf its your own service!!!';
            functions.logger.debug(message);
            res.status(403).json(message);
            return;

        }

        const email = req.body.email;
        const password = req.body.password;
        const admin = req.body.admin;

        const user = await auth.createUser({
            email,
            password,
        });

        await auth.setCustomUserClaims(user.uid, {admin});

        db.doc(`users/${user.uid}`).set({});

        res.status(200).json({message: 'OMG User created successfully dude!  Yo...'});
    }
    catch(err) {
        functions.logger.debug('Could not create user dude! err: ', err);
        res.status(500).json({message: 'Doh! couldnt create user...'});
    }

});