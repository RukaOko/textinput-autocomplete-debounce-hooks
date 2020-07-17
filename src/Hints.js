import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';

export default function Hints ({ showActivityIndicator, data, handleHintOnPress }) {

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.wrapItem}
            onPress={() => handleHintOnPress(item.id, item.name)}
        >
            <Text style={styles.textItem}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {showActivityIndicator ? (
                <View style={styles.wrapActivityIndicator}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={() => (
                        <View style={styles.wrapNotFound}>
                            <Text style={styles.textNotFound}>Ничего не найдено</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2f363c'
    },
    wrapActivityIndicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 70
    },
    wrapItem: {
        justifyContent: 'center',
        minHeight: 70, 
        borderBottomWidth: 1,
        borderBottomColor: 'white'
    },
    textItem: {
        color: 'white',
        marginLeft: 10,
        fontSize: 20
    },
    wrapNotFound: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 70
    },
    textNotFound: {
        color: 'white',
        fontSize: 20
    }
  });