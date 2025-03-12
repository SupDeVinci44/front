import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

export default function Reviews({ reviews }) {
    const { colors } = useTheme();

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <MaterialIcons
                    key={i}
                    name={i <= rating ? "star" : "star-border"}
                    size={24}
                    color={colors.primary}
                />
            );
        }
        return stars;
    };

    return (
        <View style={styles.reviewsContainer}>
            <Text style={styles.reviewsTitle}>Avis</Text>
            {reviews.length > 0 ? (
                reviews.map(review => (
                    <View key={review.id} style={styles.review}>
                        <Text style={styles.reviewTitle}>{review.title}</Text>
                        <Text style={styles.reviewComment}>{review.comment}</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {renderStars(review.rating)}
                        </View>
                    </View>
                ))
            ) : (
                <Text style={styles.noReviews}>Aucun avis pour cet événement.</Text>
            )}
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
    reviewRating: {
        fontSize: 16,
        color: "#999",
    },
    noReviews: {
        fontSize: 16,
        color: "#999",
        textAlign: "center",
    },
});
