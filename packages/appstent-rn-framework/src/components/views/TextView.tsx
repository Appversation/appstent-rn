import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ViewContent } from '../../ViewContent';

interface TextViewProps {
    viewContent: ViewContent;
}

export const TextView: React.FC<TextViewProps> = ({ viewContent }) => {
    const text = viewContent.get<string>('text');
    const fontSize = viewContent.get<number>('fontSize') || 16;
    const color = viewContent.get<string>('color') || '#000000';
    const textAlign = viewContent.get<string>('textAlign') || 'left' as 'auto' | 'center' | 'left' | 'right' | 'justify';

    if (!text) {
        return null;
    }

    return (
        <Text style={[styles.text, { fontSize, color, textAlign }]}>
            {text}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        flexWrap: 'wrap',
    },
});