// tests/integration/Book.test.ts

import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import {App} from '../app';
import SequelizeTeam from '../../src/database/models/TeamsModel';
import { firstTeam } from './mocks/Team.mocks';
import { TeamType } from '../types/TeamType';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teams Test', function() {
  it('should return all teams', async function() {
    sinon.stub(SequelizeTeam, 'findAll').resolves(firstTeam as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(firstTeam);
  });
});