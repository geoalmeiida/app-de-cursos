import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryFilter } from '@/components/category-filter';
import { CourseCard } from '@/components/course-card';
import { Course, courses } from '@/data/courses';

const categories = ['Todos', ...Array.from(new Set(courses.map((course) => course.category)))];

export default function CoursesScreen() {
  const { category } = useLocalSearchParams<{ category?: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category ?? 'Todos');

  useEffect(() => {
    setSelectedCategory(category ?? 'Todos');
  }, [category]);

  const filteredCourses = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesCategory = selectedCategory === 'Todos' || course.category === selectedCategory;
      const matchesSearch =
        course.title.toLowerCase().includes(normalizedSearch) ||
        course.description.toLowerCase().includes(normalizedSearch) ||
        course.category.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const renderCourse = ({ item }: { item: Course }) => (
    <CourseCard course={item} />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <Text style={styles.title}>Explore os Cursos</Text>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#64748B" />
          <TextInput
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="Buscar por curso ou categoria"
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />
        </View>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <FlatList
          data={filteredCourses}
          keyExtractor={(item) => item.id}
          renderItem={renderCourse}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="search-circle-outline" size={42} color="#94A3B8" />
              <Text style={styles.emptyTitle}>Nenhum curso encontrado</Text>
              <Text style={styles.emptyText}>Tente outra busca ou selecione uma categoria diferente.</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF4F8',
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 960,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: {
    color: '#0F3761',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 16,
  },
  searchBox: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D8E2EF',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 12,
    minHeight: 48,
  },
  searchInput: {
    color: '#0F172A',
    flex: 1,
    fontSize: 15,
    marginLeft: 8,
  },
  listContent: {
    paddingBottom: 96,
  },
  emptyState: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 28,
  },
  emptyTitle: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 6,
  },
  emptyText: {
    color: '#64748B',
    fontSize: 14,
    textAlign: 'center',
  },
});
