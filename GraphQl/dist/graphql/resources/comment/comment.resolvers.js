"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
const composable_resolver_1 = require("../../composable/composable.resolver");
const auth_resolver_1 = require("../../composable/auth.resolver");
exports.commentResolvers = {
    Comment: {
        user: (comment, args, { db, dataloaders: { userLoader } }, info) => {
            return userLoader.load({ key: comment.get('user'), info: info })
                .catch(utils_1.handleError);
        },
        post: (comment, args, { db, dataloaders: { postLoader } }, info) => {
            return postLoader.load({ key: comment.get('post'), info: info })
                .catch(utils_1.handleError);
        }
    },
    Query: {
        commentsByPost: (parent, { postId, first = 10, offset = 0 }, context, info) => {
            postId = parseInt(postId);
            return context.db.Comment.findAll({
                where: { post: postId },
                limit: first,
                offset: offset,
                attributes: context.requestedFields.getFields(info)
            })
                .catch(utils_1.handleError);
        }
    },
    Mutation: {
        createComment: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { input }, { db, authUser }, info) => {
            input.user = authUser.id;
            return db.sequelize.transaction((t) => {
                return db.Comment.create(input, { transaction: t });
            }).catch(utils_1.handleError);
        }),
        updateComment: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id, input }, { db, authUser }, info) => {
            id = parseInt(id);
            input.user = authUser.id;
            return db.sequelize.transaction((t) => {
                return db.Comment.findById(id)
                    .then((comment) => {
                    utils_1.throwError(!comment, `Comment with id ${id} not found!`);
                    utils_1.throwError(comment.get('user') != authUser.id, `Unautorized. You can only update comment created by yourself.`);
                    return comment.update(input, { transaction: t });
                });
            }).catch(utils_1.handleError);
        }),
        deleteComment: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id }, { db, authUser }, info) => {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Comment.findById(id)
                    .then((comment) => {
                    utils_1.throwError(!comment, `Comment with id ${id} not found!`);
                    utils_1.throwError(comment.get('user') != authUser.id, `Unautorized. You can only delete comment created by yourself.`);
                    return comment.destroy({ transaction: t })
                        .then(comment => !!comment);
                });
            }).catch(utils_1.handleError);
        })
    }
};
