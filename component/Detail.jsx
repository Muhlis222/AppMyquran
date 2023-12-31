import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';

const Detail = ({ route }) => {
    const { surahNumber } = route.params;
    const [ayatDetails, setAyatDetails] = useState(null);

    useEffect(() => {
        const fetchAyatDetails = async () => {
            try {
                const response = await fetch(`https://quran-api.santrikoding.com/api/surah/${surahNumber}`);
                const data = await response.json();
                setAyatDetails(data);
            } catch (error) {
                console.error('Error fetching ayat details:', error);
            }
        };

        fetchAyatDetails();
    }, [surahNumber]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {ayatDetails && (
                <>
                    <Text style={styles.title}>{ayatDetails.nama}</Text>
                    <Text style={styles.subtitle}>{ayatDetails.tempat_turun}, {ayatDetails.jumlah_ayat} ayat</Text>
                    <FlatList
                        data={ayatDetails.ayat}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.ayatContainer}>
                                <Text style={styles.ayatTextArabic}>{item.ar}</Text>
                                <Text style={styles.ayatTextTranslation}>{item.idn}</Text>
                            </View>
                        )}
                    />
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#2c3e50',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        color: '#ecf0f1',
        textAlign: 'left',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 12,
        color: '#bdc3c7',
        textAlign: 'left',
    },
    ayatContainer: {
        marginBottom: 24,
    },
    ayatTextArabic: {
        fontSize: 24,
        textAlign: 'right',
        marginBottom: 10,
        marginTop: 20,
        color: '#ecf0f1',
    },
    ayatTextTranslation: {
        fontSize: 18,
        textAlign: 'left',
        fontStyle: 'italic',
        color: '#bdc3c7',
    },
});

export default Detail;
