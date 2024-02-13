import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import fetchDB from 'src/utils/fetchDB';
@Injectable()
export class LoginService {

    async findUser(username: string, password?: string) {
        const response = await fetchDB(
            {
                projection: { name: username },
                collection: "users"
            },
            "findOne");          
        const { document = null } = { ...response };
        if (document) {
            if (password) {
                if (password === document.passoword) {
                    return document;
                }
                return new GraphQLError("Wrong Password")
            }
            return document;
        }
        if (!response) {
            return new GraphQLError("Something went wrong");
        }
        return new GraphQLError("User Not Found");
    }

    async createUser(username: string, password: string) {
        const findInUsers = await this.findUser(username);
        if (findInUsers.document) {
            return new GraphQLError("Username Is Already Taken");
        }
        const response = await fetchDB(
            {
                document: { name: username, password },
                collection: "users",
            }, 
            "insertOne")
            
        const { insertedId = null } = { ...response };
        if (insertedId) {
            const data = await this.findUser(username);
            return await this.findUser(username);
        }
        return new GraphQLError("User not created");
    }
}
