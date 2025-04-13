import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ViewContent } from '../../ViewContent';
import { AppstentView } from '../AppstentView';
import { ContentFormatUtil } from '../../utils/ContentFormatUtil';

interface GradientViewProps {
    viewContent: ViewContent;
}

export const GradientView: React.FC<GradientViewProps> = ({ viewContent }) => {
    const colors = viewContent.get<Array<string>>('colors') || [];
    const startPoint = viewContent.get<string>('startPoint') || 'top';
    const endPoint = viewContent.get<string>('endPoint') || 'bottom';
    const content = viewContent.get<any>('content');

    if (colors.length === 0) {
        return null;
    }

    const start = ContentFormatUtil.unitPointFromString(startPoint) || { x: 0, y: 0 };
    const end = ContentFormatUtil.unitPointFromString(endPoint) || { x: 0, y: 1 };

    return (
        <LinearGradient
            colors={colors}
            start={start}
            end={end}
            style={styles.container}
        >
            {content && <AppstentView viewContent={content} />}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});