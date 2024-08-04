import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.vsk.aora',
    projectId: '66acbda200272efe898b',
    databaseId: '66acc0470031ab9041b2',
    userCollectionId: '66acc0670019e7151eab',
    videosCollectionId: '66acc09f001b80cb2f52',
    storageId: '66acc3c3000bdac77178',
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.

    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client);


    export const createUser = async (email, password, username) => {
        // // Register User
        // account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
        //     .then(function (response) {
        //         console.log(response);
        //     }, function (error) {
        //         console.log(error);
        //     });

        try {
            const newAccount = await account.create(
                ID.unique(),
                email,
                password,
                username
            )

            if (!newAccount) throw Error;

            const avatarUrl = avatars.getInitials(username)

            await signIn(email, password)

            const newUser = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.userCollectionId,
                ID.unique(),{
                    accountId: newAccount.$id,
                    email,
                    username,
                    avatar: avatarUrl
                }
            )

            return newUser;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    export async function signIn(email, password){
        try {
            const session = await account.createEmailPasswordSession (email, password)
            return session;
        
        } catch (error) {
            
        }
    } {
        
    }
    

