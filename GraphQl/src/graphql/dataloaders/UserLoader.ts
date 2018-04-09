import { UserModel, UserInstance } from "../../models/UserModel";
import { DataLoaderParam } from "../../interfaces/DataLoaderParamInterface";
import { RequestedFields } from "../ast/RequestedFields";

export class UserLoader {

    static batchUser(user: UserModel, params: DataLoaderParam<number>[], requestedeFields: RequestedFields): Promise<UserInstance[]> {
        
        const ids: number[] = params.map(param => param.key);
        
        return Promise.resolve(
            user.findAll({
                where: { id: { $in: ids } },
                attributes: requestedeFields.getFields(params[0].info, { keep: ['id'], exclude:['posts'] })
            })
        );
    }

}