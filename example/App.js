import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
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
        // Configure ViewContent with your API key and deployment stage
        ViewContent.configure({
          apiKey: 'GOMBHgTGLD4tz8OzwuDY71anlPpIGIb88gvUCb60',
          deploymentStage: 'demo',
        });

        // Create a new ViewContent instance with your content ID
        const content = new ViewContent(contentId);
        
        // Set up an interval to check the loading status
        const checkInterval = setInterval(() => {
          if (content.isLoaded) {
            clearInterval(checkInterval);
            setViewContent(content);
            setIsLoading(false);
          }
          
          // If there's an error in the cache status, stop checking
          if (content.cacheStatus === CacheStatus.ERROR) {
            clearInterval(checkInterval);
            setError(new Error('Failed to load content'));
            setIsLoading(false);
          }
        }, 100);

        // Clean up interval after 10 seconds to prevent infinite checking
        setTimeout(() => {
          clearInterval(checkInterval);
          if (!content.isLoaded) {
            setError(new Error('Content loading timeout'));
            setIsLoading(false);
          }
        }, 10000);

      } catch (err) {
        setError(err);
        console.error('Error initializing ViewContent:', err);
        setIsLoading(false);
      }
    };

    initializeViewContent();
  }, [contentId]);

  return { viewContent, isLoading, error };
};

export default function App() {
  const { viewContent, isLoading, error } = useViewContent('text/textWithAttributes');

  const handleTap = (data) => {
    console.log('Tapped:', data);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        {/* Add error UI here if needed */}
      </View>
    );
  }

  if (!viewContent) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppstentView 
        viewContent={viewContent}
        onTap={handleTap}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
