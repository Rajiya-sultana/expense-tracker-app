import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { styles } from "../assets/styles/create.styles";
import { COLORS } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const createScreen = () => {
  const CATEGORIES = [
    { id: "food", name: "Food & Drinks", icon: "fast-food" },
    { id: "shopping", name: "Shopping", icon: "cart" },
    { id: "transportation", name: "Transportation", icon: "car" },
    { id: "entertainment", name: "Entertainment", icon: "film" },
    { id: "bills", name: "Bills", icon: "receipt" },
    { id: "income", name: "Income", icon: "cash" },
    { id: "other", name: "Other", icon: "ellipsis-horizontal" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");

  const handleSave = () => {
    setSelectedCategory(null);
    setSelectedType("expense");
    setAmount("");
    setTitle("");

    Alert.alert("Success", "Transaction saved!");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>New Transaction</Text>

        <TouchableOpacity
          style={styles.saveButtonContainer}
          onPress={handleSave}
        >
          <Text style={styles.saveButton}>Save</Text>
          <Ionicons name="checkmark" size={18} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Card */}
      <View style={styles.card}>
        {/* Expense/Income Selector */}
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              selectedType === "expense" && styles.typeButtonActive,
            ]}
            onPress={() => setSelectedType("expense")}
          >
            <Ionicons
              name="arrow-down-circle"
              size={22}
              color={selectedType === "expense" ? COLORS.white : COLORS.expense}
              style={styles.typeIcon}
            />
            <Text
              style={[
                styles.typeButtonText,
                selectedType === "expense" && { color: COLORS.white },
              ]}
            >
              Expense
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeButton,
              selectedType === "income" && styles.typeButtonActive,
            ]}
            onPress={() => setSelectedType("income")}
          >
            <Ionicons
              name="arrow-up-circle"
              size={22}
              color={selectedType === "income" ? COLORS.white : COLORS.income}
              style={styles.typeIcon}
            />
            <Text
              style={[
                styles.typeButtonText,
                selectedType === "income" && { color: COLORS.white },
              ]}
            >
              Income
            </Text>
          </TouchableOpacity>
        </View>

        {/* Amount Input */}
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.currencySymbol}
            placeholder="0.00"
            placeholderTextColor={COLORS.textLight}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        {/* Title Input */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="create-outline"
            size={22}
            color={COLORS.textLight}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Transaction Title"
            placeholderTextColor={COLORS.textLight}
            keyboardType="default"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Category */}
        <Text style={styles.sectionTitle}>
          <Ionicons name="add" size={16} color={COLORS.text} /> Category
        </Text>
        <View style={styles.categoryGrid}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Ionicons
                name={category.icon}
                size={20}
                color={
                  selectedCategory === category.id
                    ? COLORS.white
                    : COLORS.text
                }
              />
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category.id &&
                    styles.categoryButtonTextActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default createScreen;
