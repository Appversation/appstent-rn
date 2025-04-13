import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ViewContent } from '../../ViewContent';
import { AppstentView } from '../AppstentView';

interface NavigationContentViewProps {
    viewContent: ViewContent;
}

const Stack = createNativeStackNavigator();

export const NavigationContentView: React.FC<NavigationContentViewProps> = ({ viewContent }) => {
    const views = viewContent.get<Array<any>>('views') || [];
    const isBarHidden = viewContent.get<boolean>('isBarHidden') || false;
    const barTitle = viewContent.get<string>('barTitle') || '';
    const ignoreSafeAreas = viewContent.get<boolean>('ignoreSafeAreas') || false;
    const toolbarViews = viewContent.get<Array<any>>('toolbarViews') || [];

    if (views.length === 0) {
        return null;
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: !isBarHidden,
                headerTitle: barTitle,
                headerRight: () => (
                    <View style={styles.toolbar}>
                        {toolbarViews.map((view, index) => (
                            <AppstentView key={index} viewContent={view} />
                        ))}
                    </View>
                ),
            }}
        >
            {views.map((view, index) => (
                <Stack.Screen
                    key={index}
                    name={view.title || `Screen${index}`}
                    component={() => (
                        <View style={[
                            styles.container,
                            ignoreSafeAreas && styles.ignoreSafeAreas
                        ]}>
                            <AppstentView viewContent={view} />
                        </View>
                    )}
                />
            ))}
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ignoreSafeAreas: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});