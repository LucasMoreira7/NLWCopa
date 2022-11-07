import {useCallback, useState} from 'react'
import { Heading, VStack, Text, Icon, useToast, FlatList } from "native-base";
import { Button } from "../components/button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import {Octicons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

import {api} from '../services/api';
import {PoolCard, PoolCardPros} from '../components/PoolCard';
import {Loading} from '../components/Loading'
import { EmptyPoolList } from "../components/EmptyPoolList";
import {useFocusEffect} from '@react-navigation/native'

export function Pools(){

    const [isLoading, setIsLoading] = useState(true);
    const [pools, setPools] = useState<PoolCardPros[]>([]);
    const Toast = useToast();

    const {navigate} = useNavigation();

    async  function fetchPools(){
    
        try{
            const response = await api.get('/pools');
            setPools(response.data.pools);


        }catch(error){
                console.log(error);

                Toast.show({
                    title: 'Não foi possível carregar os bolões',
                    placement: 'top',
                    bgColor: 'red.500',
                });
        }finally{
            setIsLoading(false);
        }
    }

    useFocusEffect(useCallback(() => {
        fetchPools();
    }, []));

    return(
        <VStack flex={1} bgColor = "gray.900">
            <Header title="Meus Bolões"/>

           <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4} >
           <Button 
           title="BUSCAR BOLÃO POR CÓDIGO"
           leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
           onPress={() => navigate('find')}
           />
            </VStack> 

            {
                isLoading? <Loading /> : 
            <FlatList
            data={pools}
            keyExtractor={item=> item.id}
            renderItem={({item}) => (
                <PoolCard 
                data={item} 
                onPress={() => navigate('details', {id: item.id})}
                />

            ) }
            px={5}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{pb: 10 }}
            ListEmptyComponent={()=> <EmptyPoolList />}
            />}
        </VStack>
    );
}
