import * as sinon from 'sinon';
import * as chai from 'chai';
import UserService from '../services/UserService';


// @ts-ignore
import chaiHttp = require('chai-http');

import {App} from '../app';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Users Test', function() {

  beforeEach(function() {
    sinon.restore()
  })

  it('should not login without email', async function() {

    const userService = new UserService() 
    const email = '' 
    const password = '1234567'

    const serviceResponse = await userService.login(email, password);

    expect(serviceResponse.status).to.equal(400);
    expect(serviceResponse.data).to.deep.equal({ message: "All fields must be filled" });

    const {status, body} = await chai.request(app).post('/login').send({password: '1234567'});
    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' })

  });

  it('should not login without password', async function() {

    const userService = new UserService() 
    const email = 'abcd@gmail.com' 
    const password = ''

    const serviceResponse = await userService.login(email, password);

    expect(serviceResponse.status).to.equal(400);
    expect(serviceResponse.data).to.deep.equal({ message: "All fields must be filled" });


    const {status, body} = await chai.request(app).post('/login').send({email: 'abcd@gmail.com'})
    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' })

  });

  it('should login and return a valid token', async function() {
    const userService = new UserService() 
    const email = 'abcd@gmail.com' 
    const password = '1234567'
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc'

    const serviceResponse = await userService.login(email, password);

    expect(serviceResponse.status).to.equal(200);
    expect(serviceResponse.data).to.deep.equal({ token });  

  })
    
});