import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Course } from '@/data/courses';

import { ProgressBar } from './progress-bar';

type CourseCardProps = {
  course: Course;
};

type IconName = keyof typeof Ionicons.glyphMap;

const categoryIcons: Record<string, IconName> = {
  'Back-end': 'server-outline',
  Design: 'color-palette-outline',
  Ferramentas: 'construct-outline',
  'Front-end': 'code-slash-outline',
  Mobile: 'phone-portrait-outline',
  Programacao: 'logo-javascript',
  Programação: 'logo-javascript',
};

export function CourseCard({ course }: CourseCardProps) {
  const iconName = categoryIcons[course.category] ?? 'school-outline';

  return (
    <Link href={{ pathname: '/details', params: { id: course.id } }} asChild>
      <TouchableOpacity activeOpacity={0.85} style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.thumbnail}>
            <Ionicons name={iconName} size={28} color="#2563EB" />
          </View>

          <View style={styles.cardTitleGroup}>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{course.category}</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
        </View>

        <Text style={styles.description}>{course.description}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color="#64748B" />
            <Text style={styles.metaText}>{course.duration}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="albums-outline" size={16} color="#64748B" />
            <Text style={styles.metaText}>{course.lessons} aulas</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="speedometer-outline" size={16} color="#64748B" />
            <Text style={styles.metaText}>{course.level}</Text>
          </View>
        </View>

        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progresso</Text>
          <Text style={styles.progressValue}>{course.progress}%</Text>
        </View>
        <ProgressBar value={course.progress} height={7} />
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
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
});
