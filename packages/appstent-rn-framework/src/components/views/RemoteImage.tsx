import React from 'react';
import { Image, StyleSheet, ImageStyle } from 'react-native';

interface RemoteImageProps {
    url: string;
    contentMode?: 'aspectFit' | 'aspectFill' | 'scaleToFill';
    style?: ImageStyle;
}

export const RemoteImage: React.FC<RemoteImageProps> = ({ 
    url, 
    contentMode = 'aspectFit',
    style 
}) => {
    const resizeMode = contentMode === 'aspectFit' ? 'contain' : 
                      contentMode === 'aspectFill' ? 'cover' : 
                      'stretch';

    return (
        <Image
            source={{ uri: url }}
            style={[styles.image, style]}
            resizeMode={resizeMode}
        />
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
    },
});