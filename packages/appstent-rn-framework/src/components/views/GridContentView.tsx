import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { ViewContent } from '../../ViewContent';
import { AppstentView } from '../AppstentView';

interface GridContentViewProps {
    viewContent: ViewContent;
}

export const GridContentView: React.FC<GridContentViewProps> = ({ viewContent }) => {
    const views = viewContent.get<Array<any>>('views') || [];
    const gridType = viewContent.get<string>('gridType') || 'vertical';
    const numRows = viewContent.get<number>('numRows');
    const numColumns = viewContent.get<number>('numColumns');
    const rowSpacing = viewContent.get<number>('rowSpacing');
    const colSpacing = viewContent.get<number>('colSpacing');
    const columns = viewContent.get<Array<any>>('columns') || [];
    const rows = viewContent.get<Array<any>>('rows') || [];

    if (views.length === 0) {
        return null;
    }

    const renderGrid = () => {
        if (gridType === 'vertical' || !gridType) {
            if (numColumns) {
                return (
                    <View style={[styles.verticalGrid, { 
                        gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
                        gap: rowSpacing || colSpacing || 0
                    }]}>
                        {views.map((view, index) => (
                            <View key={index} style={styles.gridItem}>
                                <AppstentView viewContent={view} />
                            </View>
                        ))}
                    </View>
                );
            } else if (columns.length > 0) {
                return (
                    <View style={[styles.verticalGrid, {
                        gap: rowSpacing || colSpacing || 0
                    }]}>
                        {views.map((view, index) => {
                            const columnConfig = columns[index % columns.length];
                            return (
                                <View key={index} style={[
                                    styles.gridItem,
                                    getColumnStyle(columnConfig)
                                ]}>
                                    <AppstentView viewContent={view} />
                                </View>
                            );
                        })}
                    </View>
                );
            }
        } else {
            if (numRows) {
                return (
                    <View style={[styles.horizontalGrid, {
                        gridTemplateRows: `repeat(${numRows}, 1fr)`,
                        gap: rowSpacing || colSpacing || 0
                    }]}>
                        {views.map((view, index) => (
                            <View key={index} style={styles.gridItem}>
                                <AppstentView viewContent={view} />
                            </View>
                        ))}
                    </View>
                );
            } else if (rows.length > 0) {
                return (
                    <View style={[styles.horizontalGrid, {
                        gap: rowSpacing || colSpacing || 0
                    }]}>
                        {views.map((view, index) => {
                            const rowConfig = rows[index % rows.length];
                            return (
                                <View key={index} style={[
                                    styles.gridItem,
                                    getRowStyle(rowConfig)
                                ]}>
                                    <AppstentView viewContent={view} />
                                </View>
                            );
                        })}
                    </View>
                );
            }
        }
        return null;
    };

    const getColumnStyle = (config: any) => {
        const itemType = config.itemType;
        const width = config.width;
        const minWidth = config.minWidth;
        const maxWidth = config.maxWidth;

        switch (itemType) {
            case 'fixed':
                return { width };
            case 'flexible':
                return { 
                    flex: 1,
                    minWidth,
                    maxWidth
                };
            default:
                return {
                    flex: 1,
                    minWidth,
                    maxWidth
                };
        }
    };

    const getRowStyle = (config: any) => {
        const itemType = config.itemType;
        const height = config.height;
        const minHeight = config.minHeight;
        const maxHeight = config.maxHeight;

        switch (itemType) {
            case 'fixed':
                return { height };
            case 'flexible':
                return {
                    flex: 1,
                    minHeight,
                    maxHeight
                };
            default:
                return {
                    flex: 1,
                    minHeight,
                    maxHeight
                };
        }
    };

    return (
        <ScrollView 
            horizontal={gridType !== 'vertical'} 
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            {renderGrid()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    verticalGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    horizontalGrid: {
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    gridItem: {
        flex: 1,
    },
});