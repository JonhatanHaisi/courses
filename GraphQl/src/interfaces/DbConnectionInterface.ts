import * as Sequelize from 'sequelize';

import { ModelsInterface } from './ModelsInterfaces';

export interface DbConnection extends ModelsInterface {

    sequelize: Sequelize.Sequelize;

}
