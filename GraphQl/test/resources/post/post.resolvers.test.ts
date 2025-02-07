import * as jwt from 'jsonwebtoken';

import { db, app, handleError, expect, chai } from "../../test-utils";
import { UserInstance } from "../../../src/models/UserModel";
import { JWT_SECRET } from "../../../src/utils/utils";
import { PostInstance } from '../../../src/models/PostModel';

describe('Post', () => {

    let userId: number;
    let token: string;
    let postId: number;

    beforeEach(() => {
        return db.Comment.destroy({where: {}})
                 .then(() => db.Post.destroy({where: {}}))
                 .then(() => db.User.destroy({where: {}}))
                 .then(() => db.User.create(
                    {
                        name: 'Rocket',
                        email: 'rocket@guardians.com',
                        password: '1234'
                    }
                )).then((users: UserInstance) => {
                    userId = users.get('id');                   
                    const payload = { sub: userId };
                    token = jwt.sign(payload, JWT_SECRET);

                    return db.Post.bulkCreate([
                        {
                            title: 'First post',
                            content: 'First post',
                            author: userId,
                            photo: "some_photo"
                        },
                        {
                            title: 'Second post',
                            content: 'Second post',
                            author: userId,
                            photo: "some_photo"
                        },
                        {
                            title: 'Third post',
                            content: 'Third post',
                            author: userId,
                            photo: "some_photo"
                        }
                    ]);
                })
                .then((posts: PostInstance[]) => {
                    postId = posts[0].get('id')
                });
                 
    });

    describe('Queries', () => {

        describe('application/json', () => {

            describe('posts', () => {

                it('Should return a list of Posts', () => {

                    const body = {
                        query: `
                            query {
                                posts {
                                    title
                                    content
                                    photo
                                }
                            }
                        `
                    };

                    return chai.request(app)
                               .post('/graphql')
                               .set('content-type', 'application/json')
                               .send(JSON.stringify(body))
                               .then(res => {

                                const postsList = res.body.data.posts;
                                expect(res.body.data).to.be.an('object');
                                expect(postsList).to.be.an('array');
                                expect(postsList[0]).to.not.have.keys(['id', 'createdAt', 'updatedAt', 'author', 'comments']);
                                expect(postsList[0]).to.have.keys(['title', 'content', 'photo']);
                                expect(postsList[0].title).to.be.equal('First post');


                               }).catch(handleError);                 
                    
                });

            });

            describe('post', () => {

                it('Should return a single Post', () => {

                    const body = {
                        query: `
                            query getPost($id: ID!) {
                                post(id: $id) {
                                    title
                                    author {
                                        name
                                        email
                                    }
                                    comments {
                                        comment
                                    }
                                }
                            }
                        `,
                        variables: {
                            id: postId
                        }
                    };

                    return chai.request(app)
                                .post('/graphql')
                               .set('content-type', 'application/json')
                               .send(JSON.stringify(body))
                               .then(res => {

                                const post = res.body.data.post;
                                expect(post).to.be.an('object');
                                expect(post).to.have.keys(['title', 'author', 'comments']);
                                expect(post).to.not.have.keys(['id', 'createdAt', 'updatedAt', 'content']);
                                expect(post.title).to.be.equal('First post');
                                expect(post.author).to.be.an('object').with.keys(['name', 'email']);
                                expect(post.author).to.be.an('object').with.not.keys(['id', 'createdAt', 'updatedAt', 'photo']);

                               }).catch(handleError);                 
                    
                });

            });

        });

        describe('appication/graphql', () => {

            describe('posts', () => {

                it('Should return a list of Posts', () => {

                    const query = `
                        query {
                            posts {
                                title
                                content
                                photo
                            }
                        }
                    `;

                    return chai.request(app)
                               .post('/graphql')
                               .set('content-type', 'application/graphql')
                               .send(query)
                               .then(res => {

                                const postsList = res.body.data.posts;
                                expect(res.body.data).to.be.an('object');
                                expect(postsList).to.be.an('array');
                                expect(postsList[0]).to.not.have.keys(['id', 'createdAt', 'updatedAt', 'author', 'comments']);
                                expect(postsList[0]).to.have.keys(['title', 'content', 'photo']);
                                expect(postsList[0].title).to.be.equal('First post');


                               }).catch(handleError);                 
                    
                });

                it('Should paginate list of Posts', () => {

                    const query = `
                        query getPostsList($first: Int, $offset: Int) {
                            posts(first: $first, offset: $offset) {
                                title
                                content
                                photo
                            }
                        }
                    `;

                    return chai.request(app)
                               .post('/graphql')
                               .set('content-type', 'application/graphql')
                               .send(query)
                               .query({ variables: JSON.stringify({ first: 2, offset: 1 }) })
                               .then(res => {

                                const postsList = res.body.data.posts;
                                expect(res.body.data).to.be.an('object');
                                expect(postsList).to.be.an('array').with.length(2);
                                expect(postsList[0]).to.not.have.keys(['id', 'createdAt', 'updatedAt', 'author', 'comments']);
                                expect(postsList[0]).to.have.keys(['title', 'content', 'photo']);
                                expect(postsList[0].title).to.be.equal('Second post');


                               }).catch(handleError);                 
                    
                });

            });

        });

    });

    describe('Mutations', () => {

        describe('application/json', () => {

            describe('createPost', () => {

                it('Should create a new Post', () => {

                    const body = {
                        query: `
                            mutation createNewPost($input: PostInput!) {
                                createPost(input: $input) {
                                    id
                                    title
                                    content

                                    author {
                                        id
                                        name
                                        email
                                    }
                                }
                            }
                        `,
                        variables: {
                            input: {
                                title: 'Fourth post',
                                content: 'Fourth content',
                                photo: 'some_photo'
                            }
                        }
                    };

                    return chai.request(app)
                               .post('/graphql')
                               .set('content-type', 'application/json')
                               .set('authorization', `Bearer ${token}`)
                               .send(JSON.stringify(body))
                               .then(res => {

                                const post = res.body.data.createPost;
                                expect(post).to.be.an('object');
                                expect(post).to.have.keys(['id', 'title', 'author', 'content']);
                                expect(post.title).to.be.equal('Fourth post');
                                expect(post.content).to.be.equal('Fourth content');
                                expect(parseInt(post.author.id)).to.be.equal(userId);

                               }).catch(handleError);                 
                    
                });

            });

            describe('updatePost', () => {

                it('Should update an existing Post', () => {

                    const body = {
                        query: `
                            mutation updatePost($id: ID!, $input: PostInput!) {
                                updatePost(id: $id,  input: $input) {
                                    title
                                    content
                                    photo
                                }
                            }
                        `,
                        variables: {
                            id: postId,
                            input: {
                                title: 'Post changed',
                                content: 'Content changed',
                                photo: 'changed_photo'
                            }
                        }
                    };

                    return chai.request(app)
                               .post('/graphql')
                               .set('content-type', 'application/json')
                               .set('authorization', `Bearer ${token}`)
                               .send(JSON.stringify(body))
                               .then(res => {

                                const post = res.body.data.updatePost;
                                expect(post).to.be.an('object');
                                expect(post).to.have.keys(['title', 'content', 'photo']);
                                expect(post.title).to.be.equal('Post changed');
                                expect(post.content).to.be.equal('Content changed');
                                expect(post.photo).to.be.equal('changed_photo');

                               }).catch(handleError);                 
                    
                });

            });

            describe('deletePost', () => {

                it('Should delete an existing Post', () => {

                    const body = {
                        query: `
                            mutation deletePost($id: ID!) {
                                deletePost(id: $id)
                            }
                        `,
                        variables: {
                            id: postId
                        }
                    };

                    return chai.request(app)
                               .post('/graphql')
                               .set('content-type', 'application/json')
                               .set('authorization', `Bearer ${token}`)
                               .send(JSON.stringify(body))
                               .then(res => {

                                const deleted = res.body.data.deletePost;
                                expect(deleted).to.be.true;

                               }).catch(handleError);                 
                    
                });

            });

        });

    })

});

