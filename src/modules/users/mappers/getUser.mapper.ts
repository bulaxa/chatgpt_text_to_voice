import { Injectable } from "@nestjs/common";
import UserEntity from "../entities/user.entity";
import { GetUserDto } from "../dto/get-user.dto";

@Injectable()
class GetUserMapper {

    getUser(user: UserEntity): GetUserDto{
        const userMapped: GetUserDto = {
            id: user.id,
            username: user.username,
            isActive: user.isActive
        }

        return userMapped;
    }
}

export default GetUserMapper;