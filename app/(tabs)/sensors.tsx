import { Ionicons } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type SensorInfoProps = {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
};

function SensorInfo({ iconName, title, description }: SensorInfoProps) {
  return (
    <View style={styles.infoItem}>
      <View style={styles.infoIcon}>
        <Ionicons name={iconName} size={20} color="#2563EB" />
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoText}>{description}</Text>
      </View>
    </View>
  );
}

export default function SensorsScreen() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [cameraFacing, setCameraFacing] = useState<CameraType>('back');
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [locationMessage, setLocationMessage] = useState('Localizacao ainda nao solicitada.');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const hasCameraPermission = cameraPermission?.granted;

  const toggleCameraFacing = () => {
    setCameraFacing((currentFacing) => (currentFacing === 'back' ? 'front' : 'back'));
  };

  const getCurrentLocation = async () => {
    setIsLoadingLocation(true);
    setLocationMessage('Solicitando permissao de localizacao...');

    try {
      const permission = await Location.requestForegroundPermissionsAsync();

      if (permission.status !== 'granted') {
        setLocation(null);
        setLocationMessage('Permissao de localizacao negada.');
        return;
      }

      setLocationMessage('Buscando localizacao atual...');
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocation(currentLocation);
      setLocationMessage('Localizacao obtida com sucesso.');
    } catch {
      setLocation(null);
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
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Recursos do aparelho</Text>
        <Text style={styles.title}>Sensores</Text>
        <Text style={styles.subtitle}>
          Use a camera para registrar momentos de estudo e a geolocalizacao para salvar onde a
          atividade foi realizada.
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionLabel}>Sensor de camera</Text>
            <Text style={styles.sectionTitle}>Previa da camera</Text>
          </View>
          <Ionicons name="camera" size={24} color="#2563EB" />
        </View>

        {!cameraPermission && (
          <View style={styles.permissionBox}>
            <ActivityIndicator color="#2563EB" />
            <Text style={styles.permissionText}>Verificando permissao da camera...</Text>
          </View>
        )}

        {cameraPermission && !hasCameraPermission && (
          <View style={styles.permissionBox}>
            <Ionicons name="lock-closed" size={28} color="#D97706" />
            <Text style={styles.permissionText}>
              A camera precisa de permissao para exibir a previa dentro do app.
            </Text>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.primaryButton}
              onPress={() => {
                requestCameraPermission();
              }}
            >
              <Ionicons name="camera" size={18} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>Permitir camera</Text>
            </TouchableOpacity>
          </View>
        )}

        {hasCameraPermission && (
          <>
            <View style={styles.cameraFrame}>
              <CameraView style={styles.cameraPreview} facing={cameraFacing}>
                <View style={styles.cameraOverlay}>
                  <Text style={styles.cameraOverlayText}>
                    {cameraFacing === 'back' ? 'Camera traseira' : 'Camera frontal'}
                  </Text>
                </View>
              </CameraView>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.secondaryButton}
              onPress={toggleCameraFacing}
            >
              <Ionicons name="camera-reverse" size={18} color="#2563EB" />
              <Text style={styles.secondaryButtonText}>Alternar camera</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionLabel}>Sensor de geolocalizacao</Text>
            <Text style={styles.sectionTitle}>Local atual</Text>
          </View>
          <Ionicons name="navigate-circle" size={26} color="#16A34A" />
        </View>

        <Text style={styles.locationMessage}>{locationMessage}</Text>

        {location && (
          <View style={styles.locationGrid}>
            <View style={styles.locationItem}>
              <Text style={styles.locationLabel}>Latitude</Text>
              <Text style={styles.locationValue}>{location.coords.latitude.toFixed(6)}</Text>
            </View>

            <View style={styles.locationItem}>
              <Text style={styles.locationLabel}>Longitude</Text>
              <Text style={styles.locationValue}>{location.coords.longitude.toFixed(6)}</Text>
            </View>

            <View style={styles.locationItem}>
              <Text style={styles.locationLabel}>Precisao</Text>
              <Text style={styles.locationValue}>
                {location.coords.accuracy ? `${Math.round(location.coords.accuracy)} m` : 'N/A'}
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.primaryButton}
          onPress={getCurrentLocation}
          disabled={isLoadingLocation}
        >
          {isLoadingLocation ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Ionicons name="locate" size={18} color="#FFFFFF" />
          )}
          <Text style={styles.primaryButtonText}>Obter localizacao</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explicacao dos sensores</Text>

        <SensorInfo
          iconName="camera-outline"
          title="Camera"
          description="Captura imagem em tempo real. No app de estudos, pode servir para registrar anotacoes, cadernos ou comprovantes de atividade."
        />

        <SensorInfo
          iconName="map-outline"
          title="Geolocalizacao"
          description="Usa GPS, Wi-Fi ou rede movel para identificar a posicao aproximada do aluno durante uma sessao de estudo."
        />

        <SensorInfo
          iconName="shield-checkmark-outline"
          title="Permissoes"
          description="Os sensores so funcionam depois que o usuario autoriza o acesso no dispositivo."
        />
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
  header: {
    marginBottom: 18,
    marginTop: 20,
  },
  eyebrow: {
    color: '#2563EB',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  title: {
    color: '#0F3761',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#42526E',
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 640,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 14,
    padding: 18,
    shadowColor: '#102A43',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  sectionHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionLabel: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  sectionTitle: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '800',
  },
  permissionBox: {
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderColor: '#D8E2EF',
    borderRadius: 14,
    borderWidth: 1,
    padding: 18,
  },
  permissionText: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22,
    marginVertical: 12,
    textAlign: 'center',
  },
  cameraFrame: {
    aspectRatio: 4 / 3,
    backgroundColor: '#0F172A',
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
  },
  cameraPreview: {
    flex: 1,
  },
  cameraOverlay: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(15, 23, 42, 0.72)',
    borderRadius: 999,
    margin: 12,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  cameraOverlayText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  primaryButton: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    borderRadius: 12,
    flexDirection: 'row',
    minHeight: 44,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    marginLeft: 8,
  },
  secondaryButton: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#BBD2FF',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 44,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  secondaryButtonText: {
    color: '#2563EB',
    fontSize: 15,
    fontWeight: '800',
    marginLeft: 8,
  },
  locationMessage: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  locationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 14,
    marginHorizontal: -5,
  },
  locationItem: {
    backgroundColor: '#F8FAFC',
    borderColor: '#D8E2EF',
    borderRadius: 12,
    borderWidth: 1,
    flexGrow: 1,
    margin: 5,
    minWidth: 150,
    padding: 12,
  },
  locationLabel: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  locationValue: {
    color: '#0F172A',
    fontSize: 17,
    fontWeight: '800',
  },
  infoItem: {
    flexDirection: 'row',
    marginTop: 16,
  },
  infoIcon: {
    alignItems: 'center',
    backgroundColor: '#E0ECFF',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    marginRight: 12,
    width: 40,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },
  infoText: {
    color: '#475569',
    fontSize: 14,
    lineHeight: 21,
  },
});
