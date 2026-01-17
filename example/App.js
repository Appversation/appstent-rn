import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { AppstentView } from 'appstent-rn-framework/src/components/AppstentView';
import { ViewContent } from 'appstent-rn-framework/src/ViewContent';
import { CacheStatus } from 'appstent-rn-framework/src/types/ViewContent';

const useViewContent = (contentId) => {
  const [viewContent, setViewContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeViewContent = async () => {
      try {
        setIsLoading(true);
        console.log('Initializing ViewContent with ID:', contentId);
        
        // Configure ViewContent with your API key and deployment stage
        ViewContent.configure({
          apiKey: 'GOMBHgTGLD4tz8OzwuDY71anlPpIGIb88gvUCb60',
          deploymentStage: 'demo',
        });

        // Create a new ViewContent instance with your content ID
        const content = new ViewContent(contentId);
        console.log('ViewContent instance created');
        
        // Set up an interval to check the loading status
        const checkInterval = setInterval(() => {
          const contentData = {
            isLoaded: content.isLoaded,
            cacheStatus: content.cacheStatus,
            type: content.type,
            hasContent: !!content.get('content'),
            visibilityRules: content.get('visibility'),
            tapHandlerName: content.get('tapHandlerName'),
            tapHandlerData: content.get('tapHandlerData')
          };
          console.log('Content status:', contentData);

          if (content.isLoaded) {
            clearInterval(checkInterval);
            console.log('Content loaded successfully:', contentData);
            setViewContent(content);
            setIsLoading(false);
          }
          
          // If there's an error in the cache status, stop checking
          if (content.cacheStatus === CacheStatus.ERROR) {
            clearInterval(checkInterval);
            console.error('Content loading failed with cache status:', content.cacheStatus);
            setError(new Error('Failed to load content'));
            setIsLoading(false);
          }
        }, 100);

        // Clean up interval after 10 seconds to prevent infinite checking
        setTimeout(() => {
          clearInterval(checkInterval);
          if (!content.isLoaded) {
            console.error('Content loading timed out');
            setError(new Error('Content loading timeout'));
            setIsLoading(false);
          }
        }, 10000);

      } catch (err) {
        console.error('Error in initializeViewContent:', err);
        setError(err);
        setIsLoading(false);
      }
    };

    initializeViewContent();
  }, [contentId]);

  return { viewContent, isLoading, error };
};

export default function App() {
  console.log('App component rendering');
  const { viewContent, isLoading, error } = useViewContent('images/remote');

  const handleTap = (data) => {
    console.log('Tapped:', data);
  };

  console.log('Current state:', { isLoading, error, hasViewContent: !!viewContent });


  if (isLoading) {
    console.log('Rendering loading state');
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading content...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  if (error) {
    console.log('Rendering error state:', error.message);
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Error: {error.message}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  if (!viewContent) {
    console.log('Rendering no content state');
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No content available</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  console.log('Rendering main content');
  const contentData = {
    type: viewContent.type,
    hasContent: !!viewContent.get('content'),
    visibilityRules: viewContent.get('visibility'),
    tapHandlerName: viewContent.get('tapHandlerName'),
    tapHandlerData: viewContent.get('tapHandlerData')
  };
  console.log('Rendering AppstentView with content:', contentData);

  return (
    <View style={styles.container}>
    <Text>Test content before AppstentView</Text>
      <AppstentView 
        viewContent={viewContent}
        
      />
      <Text>Test content after AppstentView</Text>

      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 50, // Add some top margin to avoid status bar
  },
  text: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  }
});
