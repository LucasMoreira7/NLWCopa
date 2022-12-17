import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as Authsession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { api } from '../services/api';

WebBrowser.maybeCompleteAuthSession();


interface UserProps {
    name: string;
    avatarUrl: string;
}

export interface AuthContextDataProps{
    user: UserProps;
    isUserLoading: boolean;
    singIn: () => Promise<void>;
}
interface AuthProviderProps{
    children:ReactNode;
}
export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider( { children }: AuthProviderProps){

    const [user, setUser] = useState<UserProps>({} as UserProps)
    
    const [isUserLoading, setIsUserLoading] = useState(false)

    const [request, response, promptAsync] =  Google.useAuthRequest({
        clientId: process.env.CLIENT_ID,
        redirectUri: Authsession.makeRedirectUri({useProxy: true }),
        scopes: ['profile', 'email']
    });

    //console.log(Authsession.makeRedirectUri({useProxy: true }));

    async function singIn(){
        //console.log('logar!')

        try {
            setIsUserLoading(true);
            await promptAsync();
        } catch(error) {
            console.log(error);
            throw error;

        } finally {
            setIsUserLoading(false);
        }
    }

    async function singInWithGoogle(access_token: string){
        //console.log('TOKEN DE AUTENTICAÇÃO ==>', access_token);
        try{
            setIsUserLoading(true);

            const tokenResponse = await api.post('/users', {access_token });
            //console.log(response.data);
            api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`;

            const userInfoResponse = await api.get('/me');
            //console.log(userInfoResponse.data)
            setUser(userInfoResponse.data.user);

        }catch(error){
        console.log(error);

        throw error;
        }finally{
            setIsUserLoading(false);
        }
    }

    useEffect(( )=> {
        if(response?.type === 'success' && response.authentication?.accessToken) {
            singInWithGoogle(response.authentication.accessToken)
        }
    },[response]);

    return (
        <AuthContext.Provider value={{
            singIn,
            isUserLoading,
            user,
            
        }}>
            { children }
        </AuthContext.Provider>
    );
}
