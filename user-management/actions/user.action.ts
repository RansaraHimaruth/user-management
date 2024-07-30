'use server'

import User from '@/models/user.modal';
import connectDB from '@/libs/database';

export async function createUser(user: any) {
    try {
        await connectDB();
        const newUser = new User(user);
        return JSON.parse(JSON.stringify(newUser));
        await newUser.save();
    } catch (error) {
        console.log(error);
    }
}