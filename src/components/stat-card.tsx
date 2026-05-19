import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type IconName = keyof typeof Ionicons.glyphMap;

type StatCardProps = {
  value: string | number;
  label: string;
  iconName?: IconName;
  iconColor?: string;
};

export function StatCard({ value, label, iconName, iconColor = '#2563EB' }: StatCardProps) {
  return (
    <View style={styles.card}>
      {iconName && <Ionicons name={iconName} size={22} color={iconColor} />}
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
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
  value: {
    color: '#0F172A',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 6,
    marginBottom: 3,
  },
  label: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '700',
  },
});
