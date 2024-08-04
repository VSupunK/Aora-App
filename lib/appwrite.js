import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

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

    //Register User
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
            );

            if (!newAccount) throw Error;

            const avatarUrl = avatars.getInitials(username);

            await signIn(email, password);

            const newUser = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.userCollectionId,
                ID.unique(),{
                    accountId: newAccount.$id,
                    email: email,
                    username: username,
                    avatar: avatarUrl
                }
            )

            return newUser;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    //User sign in
    export const signIn = async (email, password) => {
        try {
            const session = await account.createEmailPasswordSession (email, password)
            return session;
        
        } catch (error) {
            throw new Error(error);
        }
    }

    // Get Account
    export const getAccount = async () => {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      throw new Error(error);
    }
  }

    export const getCurrentUser = async () => {
        try {
            const currentAccount = await account.get();

            if(!currentAccount) throw Error;

            const currentUser = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.userCollectionId,
                [Query.equal('accountId', currentAccount.$id)]

            )
            if(!currentUser) throw Error;

            return currentUser.documents[0];
        } catch (error) {
            console.log(error)
        }
    }