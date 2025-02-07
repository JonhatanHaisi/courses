import { userQueries } from './resources/user/user.schema';
import { commentQueries } from './resources/comment/comment.schema';
import { postQueries } from './resources/post/post.schema';

const Query = `
    type Query {
        ${commentQueries}
        ${postQueries}
        ${userQueries}
    }
`;

export {
    Query
}