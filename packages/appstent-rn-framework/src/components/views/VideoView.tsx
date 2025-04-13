import React from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { ViewContent } from '../../ViewContent';

interface VideoViewProps {
    viewContent: ViewContent;
}

export const VideoView: React.FC<VideoViewProps> = ({ viewContent }) => {
    const url = viewContent.get<string>('url');
    const autoPlay = viewContent.get<boolean>('autoPlay') || false;
    const loop = viewContent.get<boolean>('loop') || false;
    const muted = viewContent.get<boolean>('muted') || false;
    const controls = viewContent.get<boolean>('controls') !== false;

    if (!url) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Video
                source={{ uri: url }}
                style={styles.video}
                resizeMode="contain"
                repeat={loop}
                paused={!autoPlay}
                muted={muted}
                controls={controls}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        aspectRatio: 16/9,
    },
    video: {
        flex: 1,
    },
});