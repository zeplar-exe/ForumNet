import { Forum } from "../models/forum";

export interface ForumRepository {
    search(page: number, count: number, nameParts: Array<string>, descriptionParts: Array<string>): void;
    createForum(name: string): Forum
    getForumById(id: string): Forum | undefined
}

export class ForumRepositoryImpl implements ForumRepository {
    forums: Array<Forum>

    constructor() {
        this.forums = new Array<Forum>()
    }

    createForum(name: string): Forum {
        var forum = new Forum(name)

        this.forums.push(forum)

        return forum
    }

    getForumById(id: string): Forum | undefined {
        return this.forums.find(forum => forum.id == id)
    }

    search(page: number, count: number, nameParts: string[], descriptionParts: string[]): Map<number, string> {
        var map = new Map<number, string>()

        this.forums.forEach(forum => {
            var nameCount = 0
            var descriptionCount = 0;

            nameParts.forEach(namePart => {
                if (forum.name.includes(namePart))
                    nameCount += 1
            });

            descriptionParts.forEach(descriptionPart => {
                if (forum.description.includes(descriptionPart))
                    descriptionCount += 1
            });

            map[nameCount + descriptionCount] = forum.id
        });

        return map
    }
}