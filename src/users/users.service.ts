import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) { }
    //Create user 
    async create(user: User): Promise<User> {
        const newUser = this.usersRepository.create(user);
        return await this.usersRepository.save(newUser)
    }
    //Get one user
    async findOne(id: number): Promise<User> {
        return await this.usersRepository.findOne({ where: { id } });
    }
    //Get all users
    async findall(): Promise<User[]> {
        return await this.usersRepository.find();
    }
    //Update user 
    async update(id: number, user: User): Promise<User> {
        await this.usersRepository.update(id, user);
        return await this.usersRepository.findOne({ where: { id } })
    }

    //Delete user 
    async delete(id: number): Promise<void> {
        await this.usersRepository.delete(id)
    }
}