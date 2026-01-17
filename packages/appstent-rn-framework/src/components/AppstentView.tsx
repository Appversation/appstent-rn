import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ViewContent } from '../ViewContent';
import { Divider } from './views/Divider';
import { SpacerView } from './views/SpacerView';
import { TextView } from './views/TextView';
import { LinkView } from './views/LinkView';
import { ImageView } from './views/ImageView';
import { VideoView } from './views/VideoView';
import { WebContentView } from './views/WebContentView';
import { TabBarContentView } from './views/TabBarContentView';
import { NavigationContentView } from './views/NavigationContentView';
import { NavigationLinkContentView } from './views/NavigationLinkContentView';
import { ListContentView } from './views/ListContentView';
import { GridContentView } from './views/GridContentView';
import { StackContentView, StackDirection } from './views/StackContentView';
import { DisclosureGroupContentView } from './views/DisclosureGroupContentView';
import { MenuContentView } from './views/MenuContentView';
import { GradientView } from './views/GradientView';
import { IncludedView } from './views/IncludedView';

interface AppstentViewProps {
    viewContent: ViewContent;
    customDataProvider?: any;
    tapHandler?: (data: any) => void;
}

export const AppstentView: React.FC<AppstentViewProps> = ({ 
    viewContent, 
    customDataProvider,
    tapHandler 
}) => {
    if (!viewContent.isLoaded) {
        return null;
    }

    const objectTypeStr = viewContent.type;
    if (!objectTypeStr || !isVisible(viewContent)) {
        return null;
    }

    const handlePress = () => {
        if (tapHandler) {
            tapHandler(viewContent.get<any>('tapHandlerData'));
        }
    };

    const renderView = () => {
        switch (objectTypeStr) {
            case 'divider':
                return <Divider />;
            case 'spacer':
                return <SpacerView viewContent={viewContent} />;
            case 'text':
                return <Text>Test content for TextView</Text>;
                return <TextView viewContent={viewContent} />;
            case 'link':
                return <LinkView viewContent={viewContent} />;
            case 'image':
                return <ImageView viewContent={viewContent} />;
            case 'video':
                return <VideoView viewContent={viewContent} />;
            case 'webView':
                return <WebContentView viewContent={viewContent} />;
            case 'tabbedView':
                return <TabBarContentView viewContent={viewContent} />;
            case 'navigationView':
                return <NavigationContentView viewContent={viewContent} />;
            case 'navigationLink':
                return <NavigationLinkContentView viewContent={viewContent} />;
            case 'list':
                return <ListContentView viewContent={viewContent} />;
            case 'grid':
                return <GridContentView viewContent={viewContent} />;
            case 'hStack':
                return <StackContentView 
                    viewContent={viewContent} 
                    direction={StackDirection.X} 
                    dataProvider={customDataProvider} 
                />;
            case 'vStack':
                return <Text>Test content for vStack</Text>;
                return <StackContentView 
                    viewContent={viewContent} 
                    direction={StackDirection.Y} 
                    dataProvider={customDataProvider} 
                />;
            case 'zStack':
                return <StackContentView 
                    viewContent={viewContent} 
                    direction={StackDirection.Z} 
                    dataProvider={customDataProvider} 
                />;
            case 'disclosureGroup':
                return <DisclosureGroupContentView viewContent={viewContent} />;
            case 'menu':
                return <MenuContentView viewContent={viewContent} />;
            case 'custom':
                return customView(viewContent);
            case 'included':
                return <IncludedView viewContent={viewContent} />;
            case 'gradientView':
                return <GradientView viewContent={viewContent} />;
            default:
                return null;
        }
    };

    const view = renderView();
    if (!view) {
        return null;
    }

    return (
        <View 
            style={styles.container}
            onTouchEnd={viewContent.get<string>('tapHandlerName') ? handlePress : undefined}
        >
            
            {view}
        </View>
    );
};

const isVisible = (viewContent: ViewContent): boolean => {
    const visibilityRules = viewContent.get<any[]>('visibility') || [];

    let visibility = true;
    const now = new Date();

    for (const rule of visibilityRules) {
        const ruleName = rule.ruleName;
        const ruleValue = rule.ruleValue;

        // Handle custom visibility rules
        if (customVisibilityProvider) {
            visibility = visibility && customVisibilityProvider.visibility(ruleName, ruleValue);
        }

        switch (ruleName) {
            case 'schedule':
                const scheduleStartString = rule.starts;
                const scheduleDuration = rule.duration;

                const scheduledStart = new Date(scheduleStartString);
                visibility = visibility && now >= scheduledStart;

                if (scheduleDuration) {
                    const scheduledEnd = new Date(scheduledStart.getTime() + scheduleDuration * 60 * 1000);
                    visibility = visibility && now < scheduledEnd;
                }
                break;

            case 'daily':
                const startTimeOfDayString = rule.starts;
                const endTimeOfDayString = rule.end;

                const [startHour, startMinute] = startTimeOfDayString.split(':').map(Number);
                const [endHour, endMinute] = endTimeOfDayString.split(':').map(Number);

                const currentHour = now.getHours();
                const currentMinute = now.getMinutes();

                const currentTimeInMinutes = currentHour * 60 + currentMinute;
                const startTimeInMinutes = startHour * 60 + startMinute;
                const endTimeInMinutes = endHour * 60 + endMinute;

                visibility = visibility && 
                    currentTimeInMinutes >= startTimeInMinutes && 
                    currentTimeInMinutes <= endTimeInMinutes;
                break;

            default:
                break;
        }

        if (!visibility) {
            break;
        }
    }

    return visibility;
};

const customView = (viewContent: ViewContent) => {
    if (customViewProvider) {
        return customViewProvider.viewForContent(viewContent);
    }
    return null;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

// Custom providers
let customViewProvider: CustomViewProvider | null = null;
let customVisibilityProvider: CustomVisibilityProvider | null = null;

export interface CustomViewProvider {
    viewForContent(viewContent: ViewContent): React.ReactNode;
}

export interface CustomVisibilityProvider {
    visibility(ruleName: string, ruleValue: string): boolean;
}

export const setCustomViewProvider = (provider: CustomViewProvider) => {
    customViewProvider = provider;
};

export const setCustomVisibilityProvider = (provider: CustomVisibilityProvider) => {
    customVisibilityProvider = provider;
}; 