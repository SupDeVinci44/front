import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme, Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Reviews({ reviews, onAddReview }) {
    const { colors } = useTheme();
    const router = useRouter();

    return (
        <View style={styles.reviewsContainer}>
            <Text style={styles.reviewsTitle}>Avis</Text>
            {reviews.length > 0 ? (
                reviews.map(review => (
                    <View key={review.id} style={styles.review}>
                        <Text style={styles.reviewTitle}>{review.user.username}</Text>
                        <Text style={styles.reviewComment}>{review.content}</Text>
                        <Text style={styles.reviewDate}>{new Date(review.createdAt).toLocaleDateString()}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.noReviews}>Aucun avis pour cet événement.</Text>
            )}
            <Button
                mode="contained"
                onPress={onAddReview}
                style={styles.addButton}
            >
                + Ajouter un avis
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    reviewsContainer: {
        width: "100%",
        marginTop: 16,
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    reviewsTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#333",
    },
    review: {
        marginBottom: 16,
    },
    reviewTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    reviewComment: {
        fontSize: 16,
        color: "#666",
        marginBottom: 8,
    },
    noReviews: {
        fontSize: 16,
        color: "#999",
        textAlign: "center",
    },
    addButton: {
        marginTop: 16,
    },
    reviewDate: {
        fontSize: 14,
        color: "#999",
        textAlign: "right",
    },
});
