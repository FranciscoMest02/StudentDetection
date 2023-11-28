import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import Auth from '@/models/Auth';

export async function POST(req, res) {
    try {
        await connectDB();

        const data = await req.json()

        const user = await Auth.findOne({password: data.password, username: data.username});
        let info = {}
        user ? 
        info = {
            status: 'ok',
            id: user.userId,
            role: user.role
        }
        :
        info = {
            status: 'no'
        }


        return NextResponse.json(info);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error('Internal Server Error', 500);
    }
}
