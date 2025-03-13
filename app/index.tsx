import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, Text, ActivityIndicator } from "react-native-paper";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [emailOrPseudo, setEmailOrPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://app-80651435-7b96-4c7f-a772-4fcbfd695794.cleverapps.io/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: emailOrPseudo,
          password: password,
        }),
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        // Store the token
        await AsyncStorage.setItem('token', data.token);
        router.push("/home");
      } else {
        setError(data.message || "Une erreur s'est produite");
      }
    } catch (error) {
      setLoading(false);
      setError("Une erreur s'est produite");
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword && !showPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`https://app-80651435-7b96-4c7f-a772-4fcbfd695794.cleverapps.io/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: pseudo,
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        // Store the token
        await AsyncStorage.setItem('token', data.token);
        router.push("/home");
      } else {
        setError(data.message || "Une erreur s'est produite");
      }
    } catch (error) {
      setLoading(false);
      setError("Une erreur s'est produite");
    }
  };

  const getPasswordStrength = () => {
    let strength = 0;
    if (/[A-Z]/.test(password)) strength++; // Au moins une majuscule
    if (/[a-z]/.test(password)) strength++; // Au moins une minuscule
    if (/\d/.test(password)) strength++; // Au moins un chiffre
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++; // Au moins un caractère spécial
    if (password.length >= 16) strength++; // Au moins 16 caractères
    return strength;
  };

  const renderPasswordStrengthBar = () => {
    const strength = getPasswordStrength();
    return (
      <View>
        <View style={styles.strengthBarContainer}>
          <View style={[styles.strengthBar, strength >= 1 ? styles.strengthBarVeryWeak : styles.strengthBarEmpty]} />
          <View style={[styles.strengthBar, strength >= 2 ? styles.strengthBarWeak : styles.strengthBarEmpty]} />
          <View style={[styles.strengthBar, strength >= 3 ? styles.strengthBarMedium : styles.strengthBarEmpty]} />
          <View style={[styles.strengthBar, strength >= 4 ? styles.strengthBarStrong : styles.strengthBarEmpty]} />
          <View style={[styles.strengthBar, strength >= 5 ? styles.strengthBarVeryStrong : styles.strengthBarEmpty]} />
        </View>
        <View style={styles.criteriaContainer}>
          <View style={styles.criteria}>
            <Text style={[styles.criteriaText, /[A-Z]/.test(password) && styles.criteriaTextStrikethrough]}>
              Au moins une majuscule
            </Text>
          </View>
          <View style={styles.criteria}>
            <Text style={[styles.criteriaText, /[a-z]/.test(password) && styles.criteriaTextStrikethrough]}>
              Au moins une minuscule
            </Text>
          </View>
          <View style={styles.criteria}>
            <Text style={[styles.criteriaText, /\d/.test(password) && styles.criteriaTextStrikethrough]}>
              Au moins un chiffre
            </Text>
          </View>
          <View style={styles.criteria}>
            <Text style={[styles.criteriaText, /[!@#$%^&*(),.?":{}|<>]/.test(password) && styles.criteriaTextStrikethrough]}>
              Au moins un caractère spécial
            </Text>
          </View>
          <View style={styles.criteria}>
            <Text style={[styles.criteriaText, password.length >= 16 && styles.criteriaTextStrikethrough]}>
              Au moins 16 caractères
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const isSignUpDisabled = () => {
    return (
      !email ||
      !pseudo ||
      !password ||
      (!showPassword && !confirmPassword) ||
      (!showPassword && password !== confirmPassword) ||
      getPasswordStrength() < 5
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{isSignUp ? "Inscription" : "Connexion"}</Text>
      {isSignUp ? (
        <>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            label="Pseudo"
            value={pseudo}
            onChangeText={setPseudo}
            style={styles.input}
            autoCapitalize="none"
          />
        </>
      ) : (
        <TextInput
          label="Pseudo"
          value={emailOrPseudo}
          onChangeText={setEmailOrPseudo}
          style={styles.input}
          autoCapitalize="none"
        />
      )}
      <TextInput
        label="Mot de passe"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      {isSignUp && renderPasswordStrengthBar()}
      {isSignUp && !showPassword && (
        <TextInput
          label="Confirmer le mot de passe"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={[styles.input, { marginTop: 10 }]} 
          secureTextEntry={!showPassword}
        />
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button mode="contained" onPress={isSignUp ? handleSignUp : handleLogin} disabled={isSignUp && isSignUpDisabled()}>
        {loading ? <ActivityIndicator animating={true} color="white" /> : isSignUp ? "S'inscrire" : "Se connecter"}
      </Button>
      <Button mode="text" onPress={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Déjà un compte ? Se connecter" : "Pas de compte ? S'inscrire"}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  strengthBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  strengthBar: {
    height: 5,
    flex: 1,
    marginHorizontal: 2,
  },
  strengthBarEmpty: {
    backgroundColor: "#e0e0e0",
  },
  strengthBarVeryWeak: {
    backgroundColor: "darkred",
  },
  strengthBarWeak: {
    backgroundColor: "red",
  },
  strengthBarMedium: {
    backgroundColor: "orange",
  },
  strengthBarStrong: {
    backgroundColor: "lightgreen",
  },
  strengthBarVeryStrong: {
    backgroundColor: "green",
  },
  criteriaContainer: {
    marginTop: 8,
  },
  criteria: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 1,
  },
  criteriaText: {
    marginLeft: 2,
    color: "gray",
    fontSize: 10,
  },
  criteriaTextStrikethrough: {
    textDecorationLine: 'line-through',
  },
  error: {
    color: "red",
    marginBottom: 16,
    textAlign: "center",
  },
});
