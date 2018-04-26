import * as jwt from 'jsonwebtoken';

import {app, db, chai, handleError, expect} from './../../test-utils';
import { UserInstance } from '../../../src/models/UserModel';
import { JWT_SECRET } from '../../../src/utils/utils';

describe('User', () => {

    let userId: number;
    let token: string;

    beforeEach(() => {
        return db.Comment.destroy({where: {}})
                 .then(() => db.Post.destroy({where: {}}))
                 .then(() => db.User.destroy({where: {}}))
                 .then(() => 
                    db.User.bulkCreate([{
                        name: 'Peter Quill',
                        email: 'peter@guardians.com',
                        password: '1234'
                    },
                    {
                        name: 'Gamora',
                        email: 'gamora@guardians.com',
                        password: '1234'
                    },
                    {
                        name: 'Groot',
                        email: 'groot@guardians.com',
                        password: '1234'
                    }]).then((users: UserInstance[]) => {
                        userId = users[0].get('id');                   

                        const payload = { sub: userId };
                        token = jwt.sign(payload, JWT_SECRET);
                    })
                 );
                 
    });

    describe('Queries', () => {

        describe('application/json', () => {

            describe('users', () => {

                it('should return a list of Users', () => {
                    let body = {
                        query: `
                            query {
                                users {
                                    name
                                    email
                                }
                            }
                        `
                    };

                    return chai.request(app)
                               .post('/graphql')
                               .set('content-type', 'application/json')
                               .send(JSON.stringify(body))
                               .then(res =>  {
                                    expect(res.body.data).to.be.an('object');
                                    const userList = res.body.data.users;
                                    expect(userList[0]).to.not.have.keys(['id', 'photo', 'createdAt', 'updatedAt', 'posts']);
                                    expect(userList[0]).to.have.keys(['name', 'email']);
                               }).catch(handleError);
                });

                it('should paginate a list of Users', () => {
                    let body = {
                        query: `
                            query getUserList($first: Int, $offset: Int) {
                                users(first: $first, offset: $offset) {
                                    name
                                    email
                                    createdAt
                                }
                            }
                        `,
                        variables: {
                            first: 2,
                            offset: 1
                        }
                    };

                    return chai.request(app)
                               .post('/graphql')
                               .set('content-type', 'application/json')
                               .send(JSON.stringify(body))
                               .then(res =>  {
                                   const userList = res.body.data.users;
                                    expect(res.body.data).to.be.an('object');
                                    expect(userList).to.be.an('array').of.length(2);
                                    expect(userList[0]).to.not.have.keys(['id', 'photo', 'updatedAt', 'posts']);
                                    expect(userList[0]).to.have.keys(['name', 'email', 'createdAt']);
                               }).catch(handleError);
                });

            });


            describe('user', () => {

                it('should return a single User', () => {
                    let body = {
                        query: `
                            query getSingleUser($id: ID!) {
                                user(id: $id) {
                                    id
                                    name
                                    email
                                    posts {
                                        title
                                    }
                                }
                            }
                        `,
                        variables: {
                            id: userId
                        }
                    };
                    
                    return chai.request(app)
                               .post('/graphql')
                               .set('content-type', 'application/json')
                               .send(JSON.stringify(body))
                               .then(res =>  {
                                   const user = res.body.data.user;
                                    expect(res.body.data).to.be.an('object');
                                    expect(user).to.be.an('object');
                                    expect(user).to.have.keys(['id', 'name', 'email', 'posts']);
                                    expect(user).to.not.have.keys(['photo', 'updatedAt', 'createdAt']);
                                    expect(user.name).to.equal('Peter Quill')
                                    expect(user.email).to.equal('peter@guardians.com')
                               }).catch(handleError);
                });

                it('should return only "name" attribute', () => {
                    let body = {
                        query: `
                            query getSingleUser($id: ID!) {
                                user(id: $id) {
                                    name
                                }
                            }
                        `,
                        variables: {
                            id: userId
                        }
                    };
                    
                    return chai.request(app)
                               .post('/graphql')
                               .set('content-type', 'application/json')
                               .send(JSON.stringify(body))
                               .then(res =>  {
                                   const user = res.body.data.user;
                                    expect(res.body.data).to.be.an('object');
                                    expect(user).to.be.an('object');
                                    expect(user).to.have.keys(['name']);
                                    expect(user).to.not.have.keys(['id', 'email', 'posts', 'photo', 'updatedAt', 'createdAt']);
                                    expect(user.name).to.equal('Peter Quill')
                               }).catch(handleError);
                });

                it("should return an error if User don't exists", () => {
                    let body = {
                        query: `
                            query getSingleUser($id: ID!) {
                                user(id: $id) {
                                    name
                                    email
                                }
                            }
                        `,
                        variables: {
                            id: -1
                        }
                    };
                    
                    return chai.request(app)
                               .post('/graphql')
                               .set('content-type', 'application/json')
                               .send(JSON.stringify(body))
                               .then(res =>  {
                                    expect(res.body.data.user).to.be.null;
                                    expect(res.body.errors).to.be.an('array');
                                    expect(res.body).to.have.keys(['data', 'errors']);
                                    expect(res.body.errors[0].message).to.equal('Error: User with id -1 not found.');
                                    
                               }).catch(handleError);
                });

            });

        });

    });

    describe('Mutations', () => {

        describe('application/json', () => {

            describe('createUser', () => {

                it('Should create new User', () => {

                    let body = {
                        query: `
                            mutation createNewUser($input: UserCreateInput!) {
                                createUser(input: $input) {
                                    id
                                    name
                                    email
                                }
                            }
                        `,
                        variables: {
                            input: {
                                name: 'Drax',
                                email: 'drax@guardians.com',
                                password: '1234'
                            }
                        }
                    };

                    return chai.request(app)
                               .post('/graphql')
                               .set('content-type', 'application/json')
                               .send(JSON.stringify(body))
                               .then(res => {
                                  const createdUser = res.body.data.createUser;
                                  expect(createdUser).to.be.an('object');
                                  expect(createdUser.name).to.be.equal('Drax');
                                  expect(createdUser.email).to.be.equal('drax@guardians.com');
                                  expect(parseInt(createdUser.id)).to.be.a('number');
                               })
                               .catch(handleError);

                });

            });

            describe('updateUser', () => {

                it('Should update an existing User', () => {

                    let body = {
                        query: `
                            mutation updateExistingUser($input: UserUpdateInput!) {
                                updateUser(input: $input) {
                                    name
                                    email
                                    photo
                                }
                            }
                        `,
                        variables: {
                            input: {
                                name: 'Star Lord',
                                email: 'peter@guardians.com',
                                photo: 'some_photo'
                            }
                        }
                    };

                    return chai.request(app)
                               .post('/graphql')
                               .set('authorization', `Bearer ${token}`)
                               .set('content-type', 'application/json')
                               .send(JSON.stringify(body))
                               .then(res => {
                                  const updatedUser = res.body.data.updateUser;
                                  expect(updatedUser).to.be.an('object');
                                  expect(updatedUser.name).to.be.equal('Star Lord');
                                  expect(updatedUser.email).to.be.equal('peter@guardians.com');
                                  expect(updatedUser.photo).to.not.be.null;
                                  expect(updatedUser.id).to.be.undefined;
                               })
                               .catch(handleError);

                });

                it('Should block the operation if token is invalid', () => {

                    let body = {
                        query: `
                            mutation updateExistingUser($input: UserUpdateInput!) {
                                updateUser(input: $input) {
                                    name
                                    email
                                    photo
                                }
                            }
                        `,
                        variables: {
                            input: {
                                name: 'Star Lord',
                                email: 'peter@guardians.com',
                                photo: 'some_photo'
                            }
                        }
                    };

                    return chai.request(app)
                               .post('/graphql')
                               .set('authorization', `Bearer INVALID_TOKEN`)
                               .set('content-type', 'application/json')
                               .send(JSON.stringify(body))
                               .then(res => {
                                  expect(res.body.data.updateUser).to.be.null;
                                  expect(res.body).to.have.keys(['data', 'errors']);
                                  expect(res.body.errors).to.be.an('array');
                                  expect(res.body.errors[0].message).to.be.equal('JsonWebTokenError: jwt malformed');
                               })
                               .catch(handleError);

                });

            });

            describe('updateUserPassword', () => {

                it('Should update the password of an existing User', () => {

                    let body = {
                        query: `
                            mutation updateUserPassword($input: UserUpdatePasswordInput!) {
                                updateUserPassword(input: $input)
                            }
                        `,
                        variables: {
                            input: {
                                password: 'peter123'
                            }
                        }
                    };

                    return chai.request(app)
                               .post('/graphql')
                               .set('authorization', `Bearer ${token}`)
                               .set('content-type', 'application/json')
                               .send(JSON.stringify(body))
                               .then(res => {
                                  expect(res.body.data.updateUserPassword).to.be.true;
                                  
                               })
                               .catch(handleError);

                });

            });

            describe('deleteUser', () => {

                it('Should delete existing User', () => {

                    let body = {
                        query: `
                            mutation {
                                deleteUser
                            }
                        `
                    };

                    return chai.request(app)
                               .post('/graphql')
                               .set('authorization', `Bearer ${token}`)
                               .set('content-type', 'application/json')
                               .send(JSON.stringify(body))
                               .then(res => {
                                  expect(res.body.data.deleteUser).to.be.true;
                                  
                               })
                               .catch(handleError);

                });

            });

        });

    });

});