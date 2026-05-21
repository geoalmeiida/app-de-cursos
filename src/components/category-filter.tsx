import { Pressable, StyleSheet, Text, View } from 'react-native';

type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <View style={styles.filters}>
      {categories.map((category) => {
        const isSelected = category === selectedCategory;

        return (
          <Pressable
            key={category}
            style={({ pressed }) => [
              styles.filterChip,
              isSelected && styles.filterChipSelected,
              pressed && styles.filterChipPressed,
            ]}
            onPress={() => onSelectCategory(category)}
          >
            <Text style={[styles.filterText, isSelected && styles.filterTextSelected]}>
              {category}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    marginHorizontal: -4,
  },
  filterChip: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D8E2EF',
    borderRadius: 10,
    borderWidth: 1,
    margin: 4,
    minHeight: 36,
    paddingHorizontal: 13,
    paddingVertical: 9,
  },
  filterChipSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  filterChipPressed: {
    opacity: 0.85,
  },
  filterText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '700',
  },
  filterTextSelected: {
    color: '#FFFFFF',
  },
});
