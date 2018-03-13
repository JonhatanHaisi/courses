import { userMutations } from './resources/user/user.schema';
import { commentMutations } from './resources/comment/comment.schema';
import { postMutations } from './resources/post/post.schema';

const Mutation = `
    type Mutation {
        ${commentMutations}
        ${postMutations}
        ${userMutations}
    }
`;

export {
    Mutation
}
