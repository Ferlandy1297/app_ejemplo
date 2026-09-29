import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Wrench } from 'lucide-react-native';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  rightComponent?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Ferretería Express',
  subtitle = 'Materiales y herramientas de calidad',
  rightComponent,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.left}>
          <View style={styles.iconContainer}>
            <Wrench size={20} color="#ffffff" />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
        </View>
        {rightComponent && <View style={styles.right}>{rightComponent}</View>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#4f46e5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#4f46e5',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 11,
    color: '#e0e7ff',
    marginTop: 1,
  },
  right: {
    marginLeft: 10,
  },
});
