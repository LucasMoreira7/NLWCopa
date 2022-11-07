import { Heading, VStack, Text, useToast } from "native-base";
import { Header } from "../components/Header";
import {useRoute} from '@react-navigation/native'
import { useState, useEffect } from "react";
import { Loading } from "../components/Loading";

import{api} from '../services/api';
import {PoolCardPros} from '../components/PoolCard'

    interface RouteParams{
        id: string;
}

export function Details(){


    const route = useRoute();
    const {id} = route.params as RouteParams;
    const [isLoading,setIsLoading] = useState(true);
    const toast = useToast();
    const [poolDetails,setPoolDetails] = useState<PoolCardPros>( {} as PoolCardPros);

    async function fetchPoolDetails(){
        try{
            setIsLoading(true);

            const response = await api.get(`/pools/${id}`);
            console.log(response.data.pool);

        }catch(error){
            console.log(error)
            toast.show({
                title: 'Não foi possível carregar os detalhes bolão',
                placement: 'top',
                bgColor: 'red.500',
            });

        }finally{
            setIsLoading(false);
        } 
    }

    useEffect(() =>{
        fetchPoolDetails();
    },[id]);
    
    if(isLoading){
        return <Loading/>
    }

    return(
        <VStack flex={1} bgColor = "gray.900">
            <Header title={id} showBackButton showShareButton></Header>
     


            
        </VStack>
    );
}

function useEfect(arg0: () => void) {
    throw new Error("Function not implemented.");
}
