import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { ViewContent } from '../../ViewContent';
import { AppstentView } from '../AppstentView';

interface MenuContentViewProps {
    viewContent: ViewContent;
}

export const MenuContentView: React.FC<MenuContentViewProps> = ({ viewContent }) => {
    const [isVisible, setIsVisible] = useState(false);
    const views = viewContent.get<Array<any>>('views') || [];
    const title = viewContent.get<string>('title') || '';

    if (views.length === 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.button}>
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
            <Modal
                visible={isVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setIsVisible(false)}
                >
                    <View style={styles.menuContainer}>
                        {views.map((view, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.menuItem}
                                onPress={() => {
                                    setIsVisible(false);
                                    // Handle menu item press if needed
                                }}
                            >
                                <AppstentView viewContent={view} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        padding: 10,
    },
    title: {
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        minWidth: 200,
    },
    menuItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
});