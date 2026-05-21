import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { ProgressBar } from '@/components/progress-bar';
import { StatCard } from '@/components/stat-card';
import { courses } from '@/data/courses';

const completedCourses = courses.filter((course) => course.progress === 100).length;
const inProgressCourses = courses.filter((course) => course.progress > 0 && course.progress < 100).length;
const averageProgress = Math.round(
  courses.reduce((total, course) => total + course.progress, 0) / courses.length
);

export default function ProfileScreen() {
  const [address, setAddress] = useState('');
  const [locationMessage, setLocationMessage] = useState('Toque no botao para usar a localizacao atual.');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const getAddressFromLocation = async () => {
    setIsLoadingLocation(true);
    setLocationMessage('Solicitando permissao de localizacao...');

    try {
      const permission = await Location.requestForegroundPermissionsAsync();

      if (permission.status !== 'granted') {
        setLocationMessage('Permissao de localizacao negada.');
        return;
      }

      setLocationMessage('Buscando localizacao atual...');
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const [place] = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (!place) {
        setLocationMessage('Localizacao encontrada, mas nao foi possivel montar o endereco.');
        return;
      }

      const formattedAddress = [
        place.street,
        place.streetNumber,
        place.district,
        place.city,
        place.region,
        place.postalCode,
      ]
        .filter(Boolean)
        .join(', ');

      setAddress(formattedAddress || 'Endereco encontrado pela localizacao atual.');
      setLocationMessage('Endereco encontrado pela geolocalizacao.');
    } catch {
      setLocationMessage('Nao foi possivel obter a localizacao neste dispositivo.');
    } finally {
      setIsLoadingLocation(false);
    }
  };

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

        <View style={styles.progressSpacing}>
          <ProgressBar value={averageProgress} />
        </View>

        <Text style={styles.progressText}>Continue avançando nos cursos em andamento.</Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard value={completedCourses} label="Concluídos" iconName="checkmark-circle" iconColor="#16A34A" />
        <StatCard value={inProgressCourses} label="Em andamento" iconName="school" />
        <StatCard value={1} label="Certificado" iconName="ribbon" iconColor="#D97706" />
      </View>

      <View style={styles.locationCard}>
        <View style={styles.locationHeader}>
          <View>
            <Text style={styles.sectionTitle}>Localizacao atual</Text>
            <Text style={styles.locationSubtitle}>Use a localizacao atual para encontrar o endereco do perfil.</Text>
          </View>
          <View style={styles.locationIcon}>
            <Ionicons name="location" size={20} color="#16A34A" />
          </View>
        </View>

        <View style={styles.addressBox}>
          <Text style={styles.addressLabel}>Endereco encontrado</Text>
          <Text style={address ? styles.addressValue : styles.addressPlaceholder}>
            {address || 'Nenhum endereco salvo ainda.'}
          </Text>
        </View>

        <Text style={styles.locationMessage}>{locationMessage}</Text>

        <TouchableOpacity
          activeOpacity={0.85}
          disabled={isLoadingLocation}
          style={[styles.locationButton, isLoadingLocation && styles.locationButtonDisabled]}
          onPress={getAddressFromLocation}
        >
          {isLoadingLocation ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Ionicons name="locate" size={18} color="#FFFFFF" />
          )}
          <Text style={styles.locationButtonText}>Usar localizacao atual</Text>
        </TouchableOpacity>
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
  progressSpacing: {
    marginBottom: 10,
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
  locationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 14,
    padding: 18,
  },
  locationHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  locationSubtitle: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  locationIcon: {
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    marginLeft: 12,
    width: 40,
  },
  addressBox: {
    backgroundColor: '#F8FAFC',
    borderColor: '#D8E2EF',
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },
  addressLabel: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  addressValue: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
  },
  addressPlaceholder: {
    color: '#94A3B8',
    fontSize: 15,
    lineHeight: 21,
  },
  locationMessage: {
    color: '#64748B',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 10,
  },
  locationButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#2563EB',
    borderRadius: 12,
    flexDirection: 'row',
    marginTop: 14,
    minHeight: 44,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  locationButtonDisabled: {
    opacity: 0.72,
  },
  locationButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    marginLeft: 8,
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
