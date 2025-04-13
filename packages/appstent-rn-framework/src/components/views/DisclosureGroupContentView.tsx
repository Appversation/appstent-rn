import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { ViewContent } from '../../ViewContent';
import { AppstentView } from '../AppstentView';

interface DisclosureGroupContentViewProps {
    viewContent: ViewContent;
}

export const DisclosureGroupContentView: React.FC<DisclosureGroupContentViewProps> = ({ viewContent }) => {
    const [expanded, setExpanded] = useState(viewContent.get<boolean>('isExpanded') || false);
    const [animation] = useState(new Animated.Value(expanded ? 1 : 0));
    const labelViews = viewContent.get<Array<any>>('label') || [];
    const contentViews = viewContent.get<Array<any>>('content') || [];

    const toggleExpanded = () => {
        Animated.timing(animation, {
            toValue: expanded ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
        setExpanded(!expanded);
    };

    const contentHeight = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1000], // Adjust based on content size
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleExpanded} style={styles.labelContainer}>
                {labelViews.map((view, index) => (
                    <AppstentView key={index} viewContent={view} />
                ))}
            </TouchableOpacity>
            <Animated.View style={[styles.contentContainer, { maxHeight: contentHeight }]}>
                {contentViews.map((view, index) => (
                    <AppstentView key={index} viewContent={view} />
                ))}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    contentContainer: {
        overflow: 'hidden',
    },
});