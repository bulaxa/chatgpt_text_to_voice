import UserEntity from "../entities/user.entity";

class CreateUserMapper {
    createUser(user: UserEntity): any{
        const userMapped: any = {
            id: user.id,
            username: user.username,
            isActive: user.isActive,
            createAt: user.createAt,
            updateAt: user.updateAt
        }

        return userMapped;
    }
}

export default CreateUserMapper;