import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App de Cursos</Text>
      <Text style={styles.subtitle}>
        Explore cursos, veja detalhes e acompanhe seu perfil de forma simples e rápida.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Bem-vindo!</Text>
        <Text style={styles.cardText}>
          Use a aba Cursos para visualizar as opções disponíveis e toque em um curso para ver mais detalhes.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF4F8',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#163A63',
    marginBottom: 14,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 28,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 23,
  },
});