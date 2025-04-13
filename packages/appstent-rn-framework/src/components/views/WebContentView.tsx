import React, { useRef, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { ViewContent } from '../../ViewContent';

interface WebContentViewProps {
    viewContent: ViewContent;
}

export const WebContentView: React.FC<WebContentViewProps> = ({ viewContent }) => {
    const webViewRef = useRef<WebView>(null);
    const url = viewContent.get<string>('url');

    useEffect(() => {
        if (url && webViewRef.current) {
            webViewRef.current.reload();
        }
    }, [url]);

    if (!url) {
        return null;
    }

    return (
        <WebView
            ref={webViewRef}
            source={{ uri: url }}
            style={{ flex: 1 }}
            onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.warn('WebView error: ', nativeEvent);
            }}
            onHttpError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.warn('WebView HTTP error: ', nativeEvent);
            }}
        />
    );
};