import mongoose from "mongoose";
import {model, Schema, Document} from "mongoose"
import bcript from 'bcrypt'

const userSchema = new Schema({
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
});


userSchema.pre<IUser>('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    const salt = await bcript.genSalt(10);
    const hash = await bcript.hash(user.password, salt);
    user.password = hash;
    next();
});

userSchema.methods.comparePassword = async function (password: string):Promise<boolean>{
    return await bcript.compare(password, this.password);
}

export interface IUser extends Document {
    email: string,
    password: string,
    comparePassword: (email: string) => Promise<boolean>
}

export default model<IUser>("User", userSchema);

