import { UserInstance } from "../../../src/models/UserModel";
import { db, handleError, chai, expect, app } from "../../test-utils";

describe('Token', () => {

    let userId: number;
    let token: string;
    let postId: number;
    let commentId: number;

    beforeEach(() => {
        return db.Comment.destroy({where: {}})
                 .then(() => db.Post.destroy({where: {}}))
                 .then(() => db.User.destroy({where: {}}))
                 .then(() => db.User.create(
                    {
                        name: 'Peter Quill',
                        email: 'peter@guardians.com',
                        password: '1234'
                    }
                )).then((users: UserInstance) => {
                    userId = users.get('id');                   
                });
                 
    });

    describe('mutations', () => {

        describe('application/json', () => {

            describe('createToken', () => {

                it('should return a vew valid token', () => {

                    const body = {

                        query: `
                            mutation createNewToken($email: String!, $password: String!) {
                                createToken(email: $email, password: $password) {
                                    token
                                }
                            }
                        `,
                        variables: {
                            email: 'peter@guardians.com',
                            password: '1234'
                        }
                    };

                    return chai.request(app)
                        .post('/graphql')
                        .set('Content-Type', 'application/json')
                        .send(JSON.stringify(body))
                        .then(res => {
                            expect(res.body.data).to.have.key('createToken');
                            expect(res.body.data.createToken).to.have.key('token');
                            expect(res.body.data.createToken.token).to.be.a('string');
                            expect(res.body.errors).to.be.undefined;

                        });

                });

                it('should return an error when password is incorrect', () => {

                    const body = {

                        query: `
                            mutation createNewToken($email: String!, $password: String!) {
                                createToken(email: $email, password: $password) {
                                    token
                                }
                            }
                        `,
                        variables: {
                            email: 'peter@guardians.com',
                            password: 'INVALID'
                        }
                    };

                    return chai.request(app)
                        .post('/graphql')
                        .set('Content-Type', 'application/json')
                        .send(JSON.stringify(body))
                        .then(res => {

                            expect(res.body).to.have.keys(['data', 'errors']);
                            expect(res.body.data).to.have.key('createToken');
                            expect(res.body.data.createToken).to.be.null;
                            expect(res.body.errors).to.be.an('array').with.length(1);
                            expect(res.body.errors[0].message).to.equal('Unauthorized, wrong email or password');

                        });

                });

                it('should return an error when the email not exists', () => {

                    const body = {

                        query: `
                            mutation createNewToken($email: String!, $password: String!) {
                                createToken(email: $email, password: $password) {
                                    token
                                }
                            }
                        `,
                        variables: {
                            email: 'ronan@guardians.com',
                            password: '1234'
                        }
                    };

                    return chai.request(app)
                        .post('/graphql')
                        .set('Content-Type', 'application/json')
                        .send(JSON.stringify(body))
                        .then(res => {

                            expect(res.body).to.have.keys(['data', 'errors']);
                            expect(res.body.data).to.have.key('createToken');
                            expect(res.body.data.createToken).to.be.null;
                            expect(res.body.errors).to.be.an('array').with.length(1);
                            expect(res.body.errors[0].message).to.equal('Unauthorized, wrong email or password');

                        });

                });

            });

        });

    });

});