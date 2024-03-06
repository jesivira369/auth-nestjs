import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';

@Schema()
export class User {

    @Prop({ required: true, unique: true, type: String, trim: true, lowercase: true})
    email: string;

    @Prop({ required: true, type: String})
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
});