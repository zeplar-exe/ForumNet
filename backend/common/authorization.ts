import { Forum } from "../models/entities/forum.js";
import { User } from "../models/entities/user.js";
import { UnauthorizedError } from "./http_error.js";
import { ForumUser } from "../models/entities/forum_user.js";
import { orm } from "../index.js";

export async function requireUserCanAccessForum(user: User, forum: Forum): Promise<ForumUser> {
    var forumUser = await orm.em.findOne(ForumUser, { associated_user: user, forum: forum })

    if (!forumUser)
        throw new UnauthorizedError("The authenticated user does not have access to the given forum.")

    return forumUser
}