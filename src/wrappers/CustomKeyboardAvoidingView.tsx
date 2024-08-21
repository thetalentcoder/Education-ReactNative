import React, { PropsWithChildren, ReactNode, useRef } from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  NativeScrollEvent,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const kavBehaviour = (Platform.OS === 'ios')? "padding" : "height";

interface Props extends ScrollViewProps, PropsWithChildren {
  children: ReactNode;
}

const HEADER_BORDER_THRESHOLD = 50;
const DEFAULT_SCROLL_EVENT_THROTTLE = 16;

const CustomKeyboardAvoidingView = ({ children, ...scrollViewProps }: Props) => {
  const headerHeight = useHeaderHeight();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const showBorder = useRef(false);
  const insets = useSafeAreaInsets();

  const onScroll = (event: { nativeEvent: NativeScrollEvent }) => {
    const offset = event.nativeEvent?.contentOffset?.y;
    if (!showBorder.current && offset > HEADER_BORDER_THRESHOLD) {
      showBorder.current = true;
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else if (showBorder.current && offset < HEADER_BORDER_THRESHOLD) {
      showBorder.current = false;
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={kavBehaviour}
      enabled
      keyboardVerticalOffset={headerHeight}
    >
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          height: 1,
          width: '100%',
          backgroundColor: '#70707050',
          opacity: fadeAnim,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.defaultContentContainerStyle,
          scrollViewProps.contentContainerStyle,
        ]}
        scrollEventThrottle={
          scrollViewProps.scrollEventThrottle !== undefined
            ? scrollViewProps.scrollEventThrottle
            : DEFAULT_SCROLL_EVENT_THROTTLE
        }
        bounces={scrollViewProps.bounces ?? false}
        keyboardShouldPersistTaps={
          scrollViewProps.keyboardShouldPersistTaps !== undefined
            ? scrollViewProps.keyboardShouldPersistTaps
            : 'handled'
        }
        onScroll={onScroll}
        {...scrollViewProps}
      >
        {children}
        <View style={{ paddingBottom: insets.bottom }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardAvoidingView;

const styles = StyleSheet.create({
  keyboardAvoidingView: { flex: 1, backgroundColor: "white", flexDirection: 'column', justifyContent: 'center' },
  defaultContentContainerStyle: { flex: 0 },
});
