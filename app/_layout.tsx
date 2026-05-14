import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTintColor: '#0F3761',
        headerTitleStyle: {
          fontWeight: '800',
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="details"
        options={{ title: 'Detalhes do Curso' }}
      />
    </Stack>
  );
}
