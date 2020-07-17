import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, ActivityIndicator } from 'react-native';

import { searchRegions, searchCities } from './api/fetchData';
import useDebounce from './hooks/useDebounce';
import Hints from './Hints';


export default function Index () {
    //action нужен чтобы запретить запрос после autocomplete, т.к. данные уже есть
    const [search, setSearch] = useState({str: "", action: false});
    const [region, setRegion] = useState({id: null, name: ""});
    const [dataHints, setDataHints] = useState([]);
    const [dataCities, setDataCities] = useState([]);
    const [displayHints, setDisplayHints] = useState(false);
    const [isLoadingHints, setLoadingHints] = useState(false);
    const [isLoadingCities, setLoadingCities] = useState(false);
    const debouncedSearch = useDebounce(search.str, 1000);

    const resetStates = () => {
        setDataHints([]);
        setDataCities([]);
        setDisplayHints(false);
        setLoadingHints(false);
        setLoadingCities(false);
    }

    useEffect(() => {
        if (debouncedSearch && search.action && search.str && !isLoadingHints) {
            setDisplayHints(true);
            setLoadingHints(true);
            console.log('в процессе выполнения (регионы)');

            async function fetchData() {
                const hints = await searchRegions(debouncedSearch);
                setLoadingHints(false);
                if (hints) {
                    setDataHints(hints);
                    console.log('успех (регионы)');
                } else {
                    setDisplayHints(false);
                    console.log('ошибка запроса (регионы)');
                }
            }
            fetchData();
        }

    }, [debouncedSearch]);

    useEffect(() => {
        if (search.action) {
            resetStates();
            if(search.str) {
                console.log('секундочку...');
            }
        }
    }, [search]);


    useEffect(() => {

        const { id, name } = region;
        if (id && !isLoadingCities) {
            console.log('autocomplete');
            resetStates();
            setSearch({str: name, action: false});
            console.log('в процессе выполнения (города)');
            setLoadingCities(true);

            async function fetchData() {
                const cities = await searchCities(id);
                setLoadingCities(false);
                if (cities) {
                    setDataCities(cities);
                    console.log('успех (города)');
                } else {
                    console.log('ошибка запроса (города)');
                }
            }
            fetchData();
        } else {
            console.log('запрос не выполнялся');
        }

    }, [region]);


    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Регионы России"
                placeholderTextColor="#dddddd"
                style={styles.tInput}
                onChangeText={str => setSearch({str, action: true})}
                value={search.str}
            />
            {displayHints && 
                <Hints
                    showActivityIndicator={isLoadingHints} 
                    data={dataHints}
                    handleHintOnPress={(id, name) => setRegion({id, name})}
                />
            }
            {isLoadingCities && 
                <View style={styles.wrapActivityIndicator}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            }
            {dataCities.length > 0 && 
                dataCities.map((city, index) => 
                    <Text key={index} style={styles.tCity}>{city}</Text>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        width: '90%'
    },
    tInput: {
        backgroundColor: '#2f363c',
        height: 50,
        fontSize: 25,
        paddingLeft: 10,
        justifyContent: 'center',
        color: 'white',
        borderBottomWidth: 0.5,
        borderBottomColor: '#7d90a0',
        borderRadius: 5
    },
    wrapActivityIndicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 70
    },
    tCity: {
        color: 'black', 
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 10
    }
  });