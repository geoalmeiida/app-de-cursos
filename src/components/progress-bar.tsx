import { StyleSheet, View } from 'react-native';

type ProgressBarProps = {
  value: number;
  height?: number;
  color?: string;
  trackColor?: string;
};

export function ProgressBar({
  value,
  height = 8,
  color = '#2563EB',
  trackColor = '#E2E8F0',
}: ProgressBarProps) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <View style={[styles.track, { height, backgroundColor: trackColor }]}>
      <View style={[styles.fill, { width: `${safeValue}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 999,
    height: '100%',
  },
});
