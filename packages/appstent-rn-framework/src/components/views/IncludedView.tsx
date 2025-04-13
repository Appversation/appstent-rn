import React from 'react';
import { ViewContent } from '../../ViewContent';
import { AppstentView } from '../AppstentView';

interface IncludedViewProps {
    viewContent: ViewContent;
}

export const IncludedView: React.FC<IncludedViewProps> = ({ viewContent }) => {
    const includedContent = viewContent.get<any>('includedContent');
    
    if (!includedContent) {
        return null;
    }

    return <AppstentView viewContent={includedContent} />;
};