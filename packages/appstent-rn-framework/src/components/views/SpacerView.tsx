import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ViewContent } from '../../ViewContent';

interface SpacerViewProps {
    viewContent: ViewContent;
}

export const SpacerView: React.FC<SpacerViewProps> = ({ viewContent }) => {
    const height = viewContent.get<number>('height') || 0;
    const width = viewContent.get<number>('width') || 0;

    return <View style={[styles.spacer, { height, width }]} />;
};

const styles = StyleSheet.create({
    spacer: {
        flex: 0,
    },
}); 