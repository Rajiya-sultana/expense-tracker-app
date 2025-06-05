import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect } from "react";
import { styles } from "../assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import BalanceCard from "../component/BalanceCard";
import TransactionItem from "../component/TransactionItem";
import { Alert } from "react-native";
import { useTransactions } from "../hooks/useTransactions";
import PageLoader from "../component/PageLoader";
import { router } from "expo-router";

const index = () => {
  const { transactions, summary, isLoading, loadData, deleteTransaction } =
    useTransactions();

  useEffect(() => {
    loadData();
  }, []);
  if (isLoading) return <PageLoader />;

  const handleDelete = (id) => {
    Alert.alert("Delete", "Are you sure you want to delete this transaction?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteTransaction(id),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>Rajiya Sultana</Text>
            </View>
          </View>
        </View>
        {/* balanceCard */}
        <BalanceCard summary={summary} />
        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>
      </View>
      {/* transaction */}
      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem item={item} onDelete={handleDelete} />
        )}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/create")}
      >
        <Ionicons name="add" size={28} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

export default index;
