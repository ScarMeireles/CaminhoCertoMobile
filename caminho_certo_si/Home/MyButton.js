import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MyButton({ title = '?', color = '#24CBAF', onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}>
      <Text style={styles.text}> {title.toUpperCase()} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 13,
    padding: 10,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
