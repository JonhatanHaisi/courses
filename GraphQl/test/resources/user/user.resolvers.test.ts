import {app, db, chai, handleError, expect} from './../../test-utils';

describe('User', () => {

    beforeEach(() => {
        return db.Comment.destroy({where: {}})
                 .then(() => db.Post.destroy({where: {}}))
                 .then(() => db.User.destroy({where: {}}))
                 .then(() => 
                    db.User.create({
                        name: 'Peter Quill',
                        email: 'peter@guardians.com',
                        password: '1234'
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
                                    expect(userList).to.be.an('array').of.length(1);
                                    expect(userList[0]).to.not.have.keys(['id', 'photo', 'createdAt', 'updatedAt', 'posts']);
                                    expect(userList[0]).to.have.keys(['name', 'email']);
                               }).catch(handleError);
                });

            });

        });

    });

});