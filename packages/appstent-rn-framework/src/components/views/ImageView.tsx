import React from 'react';
import { StyleSheet } from 'react-native';
import { ViewContent } from '../../ViewContent';
import { RemoteImage } from './RemoteImage';
import { Image } from 'react-native';

interface ImageViewProps {
    viewContent: ViewContent;
}

export const ImageView: React.FC<ImageViewProps> = ({ viewContent }) => {
    const url = viewContent.get<string>('source');
    const contentMode = (viewContent.get<string>('contentMode') || 'aspectFit') as 'aspectFit' | 'aspectFill' | 'scaleToFill';
    const width = viewContent.get<number>('width');
    const height = viewContent.get<number>('height');

    if (!url) {
        return null;
    }

    const resizeMode = contentMode === 'aspectFit' ? 'contain' : 
                      contentMode === 'aspectFill' ? 'cover' : 
                      'stretch';
                      
    return (
        <Image
            source={{ uri: url }}
            style={styles.image}
            resizeMode={resizeMode}
        />
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