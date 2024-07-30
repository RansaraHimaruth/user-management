'use server'

import User from '@/models/user.modal';
import connectDB from '@/libs/database';

export async function createUser(user: any) {
    try {
        await connectDB();
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        console.log(error);
    }
}