import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    //Create user 
    @Post()
    async create(@Body() user: User): Promise<{ message: string, user: User }> {
        const newUser = await this.usersService.create(user);
        return { message: 'User created successfully', user: newUser };
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
    //Get all users
    @Get()
    async findAll(): Promise<User[]> {
        return await this.usersService.findall()
    }
    // Update user 
    @Put(":id")
    async update(@Param('id') id: number, @Body() user: User): Promise<{ message: string, user: User }> {
        const updatedUser = await this.usersService.update(id, user);
        return { message: 'User updated successfully', user: updatedUser };
    }
    // Delete user 
    @Delete(":id")
    async delete(@Param('id') id: number): Promise<{ message: string }> {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new Error('User not found');
        }
        await this.usersService.delete(id);
        return { message: 'User deleted successfully' };
    }
}
