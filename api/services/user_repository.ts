import { HashedPassword } from "common/hashed_password"

export interface UserRepository {
    getUserById(userId: string): User | undefined
    getUserByIddentifier(userIdentifier: string): User | undefined
    createUser(identifier: string, password: HashedPassword, role: UserRole): User
}

export class UserRepositoryImpl implements UserRepository {
    users: Array<User>

    constructor() {
        this.users = new Array<User>()
    }

    getUserById(userId: string) {
        return this.users.find(user => user.id == userId)
    }

    getUserByIddentifier(userIdentifier: string) {
        return this.users.find(user => user.identifier == userIdentifier)
    }

    createUser(identifier: string, password: HashedPassword, role: UserRole) {
        var id = crypto.randomUUID()
        var user = new User(id, identifier, password, role)

        this.users.push(user)

        return user
    }
}