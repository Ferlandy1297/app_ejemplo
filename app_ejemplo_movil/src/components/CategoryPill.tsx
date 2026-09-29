import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CategoryPillProps {
  name: string;
  isSelected: boolean;
  onPress: () => void;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({
  name,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.pill, isSelected ? styles.pillSelected : styles.pillUnselected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.text,
          isSelected ? styles.textSelected : styles.textUnselected,
        ]}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  pillSelected: {
    backgroundColor: '#4f46e5',
    borderColor: '#4f46e5',
  },
  pillUnselected: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  textSelected: {
    color: '#ffffff',
  },
  textUnselected: {
    color: '#64748b',
  },
});
