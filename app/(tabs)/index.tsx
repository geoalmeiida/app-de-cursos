import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { courses } from '@/data/courses';

import appIcon from '../../assets/icons/icon.png';

const totalCourses = courses.length;
const completedCourses = courses.filter((course) => course.progress === 100).length;
const averageProgress = Math.round(
  courses.reduce((total, course) => total + course.progress, 0) / totalCourses
);
const currentCourse = courses.find((course) => course.progress > 0 && course.progress < 100);

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Image source={appIcon} style={styles.logo} resizeMode="contain" />
        <Text style={styles.eyebrow}>Área de estudos</Text>
        <Text style={styles.title}>App de Cursos</Text>
        <Text style={styles.subtitle}>
          Acompanhe seu progresso e continue aprendendo com cursos práticos.
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalCourses}</Text>
          <Text style={styles.statLabel}>Cursos</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{completedCourses}</Text>
          <Text style={styles.statLabel}>Concluído</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{averageProgress}%</Text>
          <Text style={styles.statLabel}>Média</Text>
        </View>
      </View>

      {currentCourse && (
        <View style={styles.featuredCard}>
          <View style={styles.featuredHeader}>
            <View>
              <Text style={styles.sectionLabel}>Continue estudando</Text>
              <Text style={styles.featuredTitle}>{currentCourse.title}</Text>
            </View>
            <View style={styles.progressBadge}>
              <Text style={styles.progressBadgeText}>{currentCourse.progress}%</Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${currentCourse.progress}%` }]} />
          </View>

          <Text style={styles.featuredDescription}>{currentCourse.description}</Text>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.primaryButton}
            onPress={() =>
              router.push({
                pathname: '/details',
                params: { id: currentCourse.id },
              })
            }
          >
            <Ionicons name="play-circle" size={20} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Continuar curso</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity activeOpacity={0.85} style={styles.outlineButton} onPress={() => router.push('/courses')}>
        <Ionicons name="library" size={20} color="#2563EB" />
        <Text style={styles.outlineButtonText}>Ver todos os cursos</Text>
      </TouchableOpacity>
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
  header: {
    marginTop: 28,
    marginBottom: 20,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 18,
    marginBottom: 16,
  },
  eyebrow: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  title: {
    color: '#0F3761',
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#42526E',
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 560,
  },
  statsGrid: {
    flexDirection: 'row',
    marginHorizontal: -6,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginHorizontal: 6,
    padding: 16,
    shadowColor: '#102A43',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  statValue: {
    color: '#0F172A',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '600',
  },
  featuredCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    shadowColor: '#102A43',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionLabel: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  featuredTitle: {
    color: '#0F172A',
    fontSize: 24,
    fontWeight: '800',
  },
  progressBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0ECFF',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  progressBadgeText: {
    color: '#1D4ED8',
    fontSize: 13,
    fontWeight: '800',
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 14,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 999,
  },
  featuredDescription: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
  },
  primaryButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#2563EB',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    marginLeft: 8,
  },
  outlineButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderColor: '#BBD2FF',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  outlineButtonText: {
    color: '#2563EB',
    fontSize: 15,
    fontWeight: '800',
    marginLeft: 8,
  },
});
