import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ViewContent } from '../../ViewContent';
import { AppstentView } from '../AppstentView';
import { CustomContentDataProvider } from '../../providers/CustomContentDataProvider';
import { ContentFormatUtil } from '../../utils/ContentFormatUtil';

export enum StackDirection {
    X = 'x',
    Y = 'y',
    Z = 'z'
}

interface StackContentViewProps {
    viewContent: ViewContent;
    direction: StackDirection;
    dataProvider?: CustomContentDataProvider;
}

export const StackContentView: React.FC<StackContentViewProps> = ({
    viewContent,
    direction,
    dataProvider
}) => {
    const views = viewContent.get<Array<any>>('views') || [];
    const alignment = viewContent.get<string>('alignment') || '';
    const scrollable = viewContent.get<boolean>('scrollable') || false;

    if (views.length === 0) {
        return null;
    }

    const renderViews = () => {
        return views.map((view, index) => (
            <AppstentView
                key={index}
                viewContent={view}
                customDataProvider={dataProvider}
            />
        ));
    };

    switch (direction) {
        case StackDirection.X:
            const horizontalAlignment = ContentFormatUtil.horizontalAlignmentFromString(alignment);
            const horizontalStack = (
                <View style={[styles.horizontalStack, { alignItems: horizontalAlignment }]}>
                    {renderViews()}
                </View>
            );

            return scrollable ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {horizontalStack}
                </ScrollView>
            ) : horizontalStack;

        case StackDirection.Y:
            const verticalAlignment = ContentFormatUtil.verticalAlignmentFromString(alignment);
            const verticalStack = (
                <View style={[styles.verticalStack, { alignItems: verticalAlignment }]}>
                    {renderViews()}
                </View>
            );

            return scrollable ? (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {verticalStack}
                </ScrollView>
            ) : verticalStack;

        case StackDirection.Z:
            const zStackAlignment = ContentFormatUtil.alignmentFromString(alignment);
            return (
                <View style={[styles.zStack, { alignItems: zStackAlignment }]}>
                    {renderViews()}
                </View>
            );

        default:
            return null;
    }
};

const styles = StyleSheet.create({
    horizontalStack: {
        flexDirection: 'row',
    },
    verticalStack: {
        flexDirection: 'column',
    },
    zStack: {
        position: 'relative',
    },
});