import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { courses } from '@/data/courses';

const completedCourses = courses.filter((course) => course.progress === 100).length;
const inProgressCourses = courses.filter((course) => course.progress > 0 && course.progress < 100).length;
const averageProgress = Math.round(
  courses.reduce((total, course) => total + course.progress, 0) / courses.length
);

export default function ProfileScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Meu Perfil</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>GA</Text>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.name}>Geovanna Almeida</Text>
          <Text style={styles.role}>Estudante de desenvolvimento mobile</Text>
        </View>
      </View>

      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.sectionTitle}>Progresso geral</Text>
          <Text style={styles.progressValue}>{averageProgress}%</Text>
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${averageProgress}%` }]} />
        </View>

        <Text style={styles.progressText}>Continue avançando nos cursos em andamento.</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Ionicons name="checkmark-circle" size={22} color="#16A34A" />
          <Text style={styles.statValue}>{completedCourses}</Text>
          <Text style={styles.statLabel}>Concluídos</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="school" size={22} color="#2563EB" />
          <Text style={styles.statValue}>{inProgressCourses}</Text>
          <Text style={styles.statLabel}>Em andamento</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="ribbon" size={22} color="#D97706" />
          <Text style={styles.statValue}>1</Text>
          <Text style={styles.statLabel}>Certificado</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumo</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons name="heart" size={18} color="#2563EB" />
          </View>
          <View>
            <Text style={styles.infoLabel}>Curso favorito</Text>
            <Text style={styles.infoValue}>React Native</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons name="calendar" size={18} color="#2563EB" />
          </View>
          <View>
            <Text style={styles.infoLabel}>Meta semanal</Text>
            <Text style={styles.infoValue}>Estudar 4 aulas</Text>
          </View>
        </View>
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
  title: {
    color: '#0F3761',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 18,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    marginBottom: 14,
    shadowColor: '#102A43',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  avatar: {
    width: 64,
    height: 64,
    backgroundColor: '#2563EB',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    color: '#0F172A',
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 4,
  },
  role: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 20,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '800',
  },
  progressValue: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '800',
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 999,
  },
  progressText: {
    color: '#64748B',
    fontSize: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    marginHorizontal: -6,
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginHorizontal: 6,
    padding: 14,
  },
  statValue: {
    color: '#0F172A',
    fontSize: 23,
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 3,
  },
  statLabel: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '700',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  infoIcon: {
    width: 38,
    height: 38,
    backgroundColor: '#E0ECFF',
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoLabel: {
    color: '#64748B',
    fontSize: 13,
    marginBottom: 2,
  },
  infoValue: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '800',
  },
});
