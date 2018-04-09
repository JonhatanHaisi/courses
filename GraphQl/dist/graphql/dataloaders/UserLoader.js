"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserLoader {
    static batchUser(user, params, requestedeFields) {
        const ids = params.map(param => param.key);
        return Promise.resolve(user.findAll({
            where: { id: { $in: ids } },
            attributes: requestedeFields.getFields(params[0].info, { keep: ['id'], exclude: ['posts'] })
        }));
    }
}
exports.UserLoader = UserLoader;
