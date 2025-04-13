import React from 'react';
import { View, Text, StyleSheet, FlatList, SectionList } from 'react-native';
import { ViewContent } from '../../ViewContent';
import { AppstentView } from '../AppstentView';

interface ListContentViewProps {
    viewContent: ViewContent;
}

export const ListContentView: React.FC<ListContentViewProps> = ({ viewContent }) => {
    const sections = viewContent.get<Array<any>>('sections') || [];
    const views = viewContent.get<Array<any>>('views') || [];
    const listStyle = viewContent.get<string>('listStyle') || 'default';

    if (sections.length > 0) {
        const sectionData = sections.map(section => ({
            title: section.title,
            data: section.views || []
        }));

        return (
            <SectionList
                sections={sectionData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <AppstentView viewContent={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>{title}</Text>
                    </View>
                )}
                style={getListStyle(listStyle)}
            />
        );
    } else if (views.length > 0) {
        return (
            <FlatList
                data={views}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <AppstentView viewContent={item} />}
                style={getListStyle(listStyle)}
            />
        );
    }

    return null;
};

const getListStyle = (style: string) => {
    switch (style) {
        case 'plainListStyle':
            return styles.plainList;
        case 'groupedListStyle':
            return styles.groupedList;
        case 'insetListStyle':
            return styles.insetList;
        case 'insetGroupedListStyle':
            return styles.insetGroupedList;
        default:
            return styles.defaultList;
    }
};

const styles = StyleSheet.create({
    sectionHeader: {
        backgroundColor: '#f8f8f8',
        padding: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    plainList: {
        backgroundColor: 'transparent',
    },
    groupedList: {
        backgroundColor: '#f8f8f8',
    },
    insetList: {
        backgroundColor: 'transparent',
        margin: 10,
    },
    insetGroupedList: {
        backgroundColor: '#f8f8f8',
        margin: 10,
    },
    defaultList: {
        backgroundColor: 'transparent',
    },
});