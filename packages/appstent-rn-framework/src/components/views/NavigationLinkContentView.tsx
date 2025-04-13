import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ViewContent } from '../../ViewContent';
import { AppstentView } from '../AppstentView';

interface NavigationLinkContentViewProps {
    viewContent: ViewContent;
}

export const NavigationLinkContentView: React.FC<NavigationLinkContentViewProps> = ({ viewContent }) => {
    const navigation = useNavigation();
    const triggerView = viewContent.get<any>('triggerView');
    const routeType = viewContent.get<string>('routeType');
    const route = viewContent.get<string>('route');

    if (!triggerView) {
        return null;
    }

    const handlePress = () => {
        if (routeType === 'custom') {
            // Handle custom navigation
            const customView = viewContent.get<any>('customView');
            if (customView) {
                navigation.navigate('CustomView', { viewContent: customView });
            }
        } else if (route) {
            navigation.navigate(route);
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.container}>
            <AppstentView viewContent={triggerView} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});