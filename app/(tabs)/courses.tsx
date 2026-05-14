import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Course, courses } from '@/data/courses';

import courseImage from '../../assets/images/react-logo.png';

const categories = ['Todos', ...Array.from(new Set(courses.map((course) => course.category)))];

export default function CoursesScreen() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

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
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: '/details',
          params: { id: item.id },
        })
      }
    >
      <View style={styles.cardHeader}>
        <View style={styles.thumbnail}>
          <Image source={courseImage} style={styles.thumbnailImage} resizeMode="contain" />
        </View>

        <View style={styles.cardTitleGroup}>
          <Text style={styles.courseTitle}>{item.title}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
      </View>

      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={16} color="#64748B" />
          <Text style={styles.metaText}>{item.duration}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="albums-outline" size={16} color="#64748B" />
          <Text style={styles.metaText}>{item.lessons} aulas</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="speedometer-outline" size={16} color="#64748B" />
          <Text style={styles.metaText}>{item.level}</Text>
        </View>
      </View>

      <View style={styles.progressHeader}>
        <Text style={styles.progressLabel}>Progresso</Text>
        <Text style={styles.progressValue}>{item.progress}%</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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

        <View style={styles.filters}>
          {categories.map((category) => {
            const isSelected = category === selectedCategory;

            return (
              <TouchableOpacity
                key={category}
                activeOpacity={0.85}
                style={[styles.filterChip, isSelected && styles.filterChipSelected]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[styles.filterText, isSelected && styles.filterTextSelected]}>
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

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
    </View>
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
    paddingTop: 20,
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
  filterText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '700',
  },
  filterTextSelected: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingBottom: 96,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#102A43',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  thumbnail: {
    width: 52,
    height: 52,
    backgroundColor: '#EEF4FF',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  thumbnailImage: {
    width: 34,
    height: 34,
  },
  cardTitleGroup: {
    flex: 1,
    paddingRight: 12,
  },
  courseTitle: {
    color: '#0F172A',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0ECFF',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryText: {
    color: '#1D4ED8',
    fontSize: 13,
    fontWeight: '800',
  },
  description: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 14,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 6,
  },
  metaText: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 5,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  progressLabel: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '700',
  },
  progressValue: {
    color: '#2563EB',
    fontSize: 13,
    fontWeight: '800',
  },
  progressTrack: {
    height: 7,
    backgroundColor: '#E2E8F0',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 999,
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
