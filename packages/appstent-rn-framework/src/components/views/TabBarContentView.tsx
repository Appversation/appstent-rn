import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ViewContent } from '../../ViewContent';
import { AppstentView } from '../AppstentView';

interface TabBarContentViewProps {
    viewContent: ViewContent;
}

const Tab = createBottomTabNavigator();
const MaterialTopTab = createMaterialTopTabNavigator();

export const TabBarContentView: React.FC<TabBarContentViewProps> = ({ viewContent }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const tabs = viewContent.get<Array<any>>('tabs') || [];
    const tabStyle = viewContent.get<string>('tabStyle') || 'default';
    const effects = viewContent.get<string>('effects');
    const autorotate = viewContent.get<boolean>('autorotate') || false;
    const rotationAngle = viewContent.get<number>('rotationAngle') || -10;

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (autorotate && tabStyle === 'pageStyle') {
            timer = setInterval(() => {
                setSelectedTab(prev => (prev < tabs.length - 1 ? prev + 1 : 0));
            }, 3000);
        }
        return () => clearInterval(timer);
    }, [autorotate, tabStyle, tabs.length]);

    if (tabs.length === 0) {
        return null;
    }

    if (tabStyle === 'pageStyle') {
        return (
            <MaterialTopTab.Navigator
                initialRouteName={tabs[0].title}
                screenOptions={{
                    tabBarStyle: styles.tabBar,
                    tabBarIndicatorStyle: styles.indicator,
                }}
            >
                {tabs.map((tab, index) => (
                    <MaterialTopTab.Screen
                        key={index}
                        name={tab.title}
                        component={() => (
                            <View style={styles.tabContent}>
                                {effects === '3DRotate' ? (
                                    <View style={[
                                        styles.rotatedView,
                                        { transform: [{ rotateY: `${rotationAngle}deg` }] }
                                    ]}>
                                        <AppstentView viewContent={tab.tabContent} />
                                    </View>
                                ) : (
                                    <AppstentView viewContent={tab.tabContent} />
                                )}
                            </View>
                        )}
                    />
                ))}
            </MaterialTopTab.Navigator>
        );
    }

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: '#8E8E93',
            }}
        >
            {tabs.map((tab, index) => (
                <Tab.Screen
                    key={index}
                    name={tab.title}
                    component={() => (
                        <View style={styles.tabContent}>
                            <AppstentView viewContent={tab.tabContent} />
                        </View>
                    )}
                    options={{
                        tabBarIcon: () => tab.icon ? (
                            <AppstentView viewContent={tab.icon} />
                        ) : null,
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    indicator: {
        backgroundColor: '#007AFF',
    },
    tabContent: {
        flex: 1,
    },
    rotatedView: {
        flex: 1,
        transform: [{ perspective: 1000 }],
    },
});