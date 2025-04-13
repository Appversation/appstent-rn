import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ViewContent } from '../../ViewContent';
import { RemoteImage } from './RemoteImage';

interface ImageViewProps {
    viewContent: ViewContent;
}

export const ImageView: React.FC<ImageViewProps> = ({ viewContent }) => {
    const url = viewContent.get<string>('url');
    const contentMode = viewContent.get<string>('contentMode') || 'aspectFit';
    const width = viewContent.get<number>('width');
    const height = viewContent.get<number>('height');

    if (!url) {
        return null;
    }

    return (
        <View style={[styles.container, { width, height }]}>
            <RemoteImage
                url={url}
                contentMode={contentMode}
                style={styles.image}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});