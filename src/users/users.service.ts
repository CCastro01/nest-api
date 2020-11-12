import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dtos/create-user.dto'
import { User } from './user.entity'
import { UserRole } from './user-roles.enum'
import { create } from 'domain';
 
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private UserRepository: UserRepository,
    ){}

    async createAdminUser(createUserDto: CreateUserDto): Promise<User>{
        if(createUserDto.password != createUserDto.passwordConfirmation){
            throw new UnprocessableEntityException('As senhas não conferem')
        }else{
            return this.UserRepository.createUser(createUserDto, UserRole.ADMIN)
        }
    }
}
