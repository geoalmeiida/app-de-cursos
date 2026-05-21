import { Ionicons } from '@expo/vector-icons';
import { Link, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ProgressBar } from '@/components/progress-bar';
import { courses } from '@/data/courses';

export default function DetailsScreen() {
  const { id, started } = useLocalSearchParams<{ id?: string; started?: string }>();
  const course = courses.find((item) => item.id === id);
  const hasStarted = started === 'true';

  if (!course) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="alert-circle-outline" size={44} color="#94A3B8" />
        <Text style={styles.emptyTitle}>Curso não encontrado</Text>
        <Link href="/courses" asChild>
          <TouchableOpacity activeOpacity={0.85} style={styles.secondaryButton}>
            <Ionicons name="arrow-back" size={18} color="#2563EB" />
            <Text style={styles.secondaryButtonText}>Voltar</Text>
          </TouchableOpacity>
        </Link>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <View style={styles.imageBox}>
          <Image
            source={require('../assets/images/react-logo.png')}
            style={styles.heroImage}
            contentFit="contain"
          />
        </View>

        <View style={styles.heroContent}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{course.category}</Text>
          </View>
          <Text style={styles.title}>{course.title}</Text>
          <Text style={styles.description}>{course.description}</Text>
        </View>
      </View>

      <View style={styles.metaGrid}>
        <View style={styles.metaCard}>
          <Ionicons name="time-outline" size={20} color="#2563EB" />
          <Text style={styles.metaValue}>{course.duration}</Text>
          <Text style={styles.metaLabel}>Duração</Text>
        </View>

        <View style={styles.metaCard}>
          <Ionicons name="albums-outline" size={20} color="#2563EB" />
          <Text style={styles.metaValue}>{course.lessons}</Text>
          <Text style={styles.metaLabel}>Aulas</Text>
        </View>

        <View style={styles.metaCard}>
          <Ionicons name="speedometer-outline" size={20} color="#2563EB" />
          <Text style={styles.metaValue}>{course.level}</Text>
          <Text style={styles.metaLabel}>Nível</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Progresso do curso</Text>
          <Text style={styles.progressValue}>{course.progress}%</Text>
        </View>
        <ProgressBar value={course.progress} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Módulos</Text>
        {course.modules.map((module, index) => (
          <View key={module} style={styles.moduleItem}>
            <View style={styles.moduleNumber}>
              <Text style={styles.moduleNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.moduleText}>{module}</Text>
          </View>
        ))}
      </View>

      {hasStarted && (
        <View style={styles.startedCard}>
          <Ionicons name="checkmark-circle" size={22} color="#16A34A" />
          <Text style={styles.startedText}>Curso iniciado. Bom estudo!</Text>
        </View>
      )}

      <View style={styles.actions}>
        <Link href="/courses" asChild>
          <TouchableOpacity activeOpacity={0.85} style={styles.secondaryButton}>
            <Ionicons name="arrow-back" size={18} color="#2563EB" />
            <Text style={styles.secondaryButtonText}>Voltar</Text>
          </TouchableOpacity>
        </Link>

        <Link href={{ pathname: '/details', params: { id: course.id, started: 'true' } }} asChild>
          <TouchableOpacity activeOpacity={0.85} style={styles.primaryButton}>
            <Ionicons name="play-circle" size={20} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Começar curso</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF4F8',
  },
  content: {
    width: '100%',
    maxWidth: 960,
    alignSelf: 'center',
    padding: 20,
    paddingBottom: 96,
  },
  hero: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    marginBottom: 14,
    shadowColor: '#102A43',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  imageBox: {
    height: 120,
    backgroundColor: '#EEF4FF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  heroImage: {
    width: 86,
    height: 86,
  },
  heroContent: {
    maxWidth: 680,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0ECFF',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
  },
  categoryText: {
    color: '#1D4ED8',
    fontSize: 13,
    fontWeight: '800',
  },
  title: {
    color: '#0F172A',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 10,
  },
  description: {
    color: '#475569',
    fontSize: 16,
    lineHeight: 24,
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginBottom: 14,
  },
  metaCard: {
    flex: 1,
    minWidth: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginHorizontal: 6,
    padding: 14,
  },
  metaValue: {
    color: '#0F172A',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 3,
  },
  metaLabel: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '700',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  progressValue: {
    color: '#2563EB',
    fontSize: 15,
    fontWeight: '800',
  },
  moduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  moduleNumber: {
    width: 30,
    height: 30,
    backgroundColor: '#E0ECFF',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  moduleNumberText: {
    color: '#1D4ED8',
    fontSize: 13,
    fontWeight: '800',
  },
  moduleText: {
    color: '#334155',
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  startedCard: {
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 14,
    padding: 14,
  },
  startedText: {
    color: '#166534',
    fontSize: 15,
    fontWeight: '800',
    marginLeft: 8,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 10,
    marginBottom: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#BBD2FF',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 10,
    marginBottom: 10,
  },
  secondaryButtonText: {
    color: '#2563EB',
    fontSize: 15,
    fontWeight: '800',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#EEF4F8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyTitle: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 14,
  },
});
