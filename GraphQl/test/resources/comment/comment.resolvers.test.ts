import * as jwt from 'jsonwebtoken';

import { db, chai, expect, handleError, app } from "../../test-utils";
import { UserInstance } from "../../../src/models/UserModel";
import { JWT_SECRET } from "../../../src/utils/utils";
import { PostInstance } from "../../../src/models/PostModel";
import { CommentInstance } from '../../../src/models/CommentModel';

describe('Comment', () => {

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
                    const payload = { sub: userId };
                    token = jwt.sign(payload, JWT_SECRET);

                    return db.Post.create(
                        {
                            title: 'First post',
                            content: 'First post',
                            author: userId,
                            photo: "some_photo"
                        });
                })
                .then((posts: PostInstance) => {
                    postId = posts.get('id')

                    return db.Comment.bulkCreate([
                        {
                            comment: 'First comment',
                            user: userId,
                            post: postId
                        },
                        {
                            comment: 'Second comment',
                            user: userId,
                            post: postId
                        },
                        {
                            comment: 'Third comment',
                            user: userId,
                            post: postId
                        }
                    ]);
                }).then((comments: CommentInstance[]) => {
                    commentId = comments[0].get('id');
                });
                 
    });

    describe('Queries', () => {

        describe('application/json', () => {

            describe('commentsByPost', () => {

                it('Should return a list of Comments', () => {

                    const body = {
                        query: `
                            query getCommentsByPostList($postId: ID!, $first: Int, $offset: Int) {
                                commentsByPost(postId: $postId, first: $first, offset: $offset) {
                                    comment
                                    user {
                                        id
                                    }
                                    post {
                                        id
                                    }
                                }
                            }
                        `,
                        variables: {
                            postId: postId,
                            first: 2,
                            offset: 1
                        }
                    };

                    return chai.request(app)
                               .post('/graphql')
                               .set('content-type', 'application/json')
                               .send(JSON.stringify(body))
                               .then(res => {

                                const comments = res.body.data.commentsByPost;
                                expect(res.body.data).to.be.an('object');
                                expect(comments).to.be.an('array');
                                expect(comments[0]).to.not.have.keys(['id', 'createdAt', 'updatedAt']);
                                expect(comments[0]).to.have.keys(['comment', 'user', 'post']);
                                expect(parseInt(comments[0].user.id)).to.be.equal(userId);
                                expect(parseInt(comments[0].post.id)).to.be.equal(postId);

                               }).catch(handleError);

                })

            });

        });

    });

    describe('mutations', () => {

        describe('application/json', () => {

            describe('createComment', () => {

                it('Should create a new Comment', () => {

                    const body = {
                        query: `
                            mutation createNewComment($input: CommentInput!) {
                                createComment(input: $input) {
                                    comment
                                    user {
                                        id
                                        name
                                    }
                                    post {
                                        id
                                        title
                                    }
                                }
                            }
                        `,
                        variables: {
                            input: {
                                comment: 'new comment',
                                post: postId
                            }
                        }
                    };

                    return chai.request(app)
                               .post('/graphql')
                               .set('content-type', 'application/json')
                               .set('authorization', `Bearer ${token}`)
                               .send(JSON.stringify(body))
                               .then(res => {
                                
                                const comment = res.body.data.createComment;
                                expect(res.body.data).to.be.an('object');
                                expect(comment).to.be.an('object');
                                expect(comment).to.have.keys(['comment', 'user', 'post']);
                                expect(parseInt(comment.user.id)).to.be.equal(userId);
                                expect(comment.user.name).to.be.equal('Peter Quill');
                                expect(parseInt(comment.post.id)).to.be.equal(postId);
                                expect(comment.post.title).to.be.equal('First post');

                               }).catch(handleError);

                });

            });

            describe('updateComment', () => {

                it('Should update an existing Comment', () => {

                    const body = {
                        query: `
                            mutation updateExistingComment($id: ID!, $input: CommentInput!) {
                                updateComment(id: $id, input: $input) {
                                    id
                                    comment
                                }
                            }
                        `,
                        variables: {
                            id: commentId,
                            input: {
                                comment: 'Changed comment',
                                post: postId
                            }
                        }
                    };

                    return chai.request(app)
                               .post('/graphql')
                               .set('content-type', 'application/json')
                               .set('authorization', `Bearer ${token}`)
                               .send(JSON.stringify(body))
                               .then(res => {
                                
                                const comment = res.body.data.updateComment;
                                expect(res.body.data).to.be.an('object');
                                expect(comment).to.be.an('object');
                                expect(comment).to.have.keys(['id', 'comment']);
                                expect(comment.comment).to.be.equal('Changed comment');

                               }).catch(handleError);

                });

            });

            describe('deleteComment', () => {

                it('Should delete an existing Comment', () => {

                    const body = {
                        query: `
                            mutation deleteExistingComment($id: ID!) {
                                deleteComment(id: $id)
                            }
                        `,
                        variables: {
                            id: commentId
                        }
                    };

                    return chai.request(app)
                               .post('/graphql')
                               .set('content-type', 'application/json')
                               .set('authorization', `Bearer ${token}`)
                               .send(JSON.stringify(body))
                               .then(res => {

                                expect(res.body.data.deleteComment).to.be.true;

                               }).catch(handleError);

                });

            });

        });

    });

});