"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostLoader {
    static batchPosts(post, params, requestedFields) {
        const ids = params.map(param => param.key);
        return Promise.resolve(post.findAll({
            where: { id: { $in: ids } },
            attributes: requestedFields.getFields(params[0].info, { keep: ['id'], exclude: ['comments'] })
        }));
    }
}
exports.PostLoader = PostLoader;
