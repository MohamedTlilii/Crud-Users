import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    //Get all users
    @Get()
    async findAll(): Promise<User[]> {
        return await this.usersService.findall()
    }
    //Get one user
    @Get(":id")
    async findOne(@Param('id') id: number): Promise<User> {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new Error('User not found')
        } else {
            return user;
        }
    }
    //Create user 
    @Post()
    async create(@Body() user: User): Promise<User> {
        return await this.usersService.create(user)
    }
    //Update user 
    @Put(":id")
    async update(@Param('id') id: number, @Body() user: User): Promise<User> {
        return this.usersService.update(id, user)
    }
    //Delete user 
    @Delete(":id")
    async delete(@Param('id') id: number): Promise<void> {
        //Handle the error if user not found
        const user = await this.usersService.findOne(id)
        if (!user) {
            throw new Error('User not found')
        }
        return this.usersService.delete(id);
    }
}
