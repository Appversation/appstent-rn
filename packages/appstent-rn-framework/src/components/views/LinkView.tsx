import React from 'react';
import { TouchableOpacity, Text, Linking, StyleSheet } from 'react-native';
import { ViewContent } from '../../ViewContent';
import { AppstentView } from '../AppstentView';

interface LinkViewProps {
    viewContent: ViewContent;
}

export const LinkView: React.FC<LinkViewProps> = ({ viewContent }) => {
    const url = viewContent.get<string>('url');
    const title = viewContent.get<string>('title') || '';
    const content = viewContent.get<any>('content');

    const handlePress = async () => {
        if (url) {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            }
        }
    };

    if (!url && !content) {
        return null;
    }

    return (
        <TouchableOpacity onPress={handlePress} style={styles.container}>
            {content ? (
                <AppstentView viewContent={content} />
            ) : (
                <Text style={styles.text}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    text: {
        color: '#007AFF',
        textDecorationLine: 'underline',
    },
});