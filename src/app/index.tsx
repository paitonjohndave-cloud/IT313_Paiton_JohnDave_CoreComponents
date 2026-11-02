import { useState } from "react";

import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// ==========================================
// STUDENT CARD COMPONENT
// ==========================================

type StudentCardProps = {
  id: string;
  name: string;
  year: string;
  photoUrl: string;
  flagged: boolean;
  onToggleFlag: (id: string) => void;
};

function StudentCard({
  id,
  name,
  year,
  photoUrl,
  flagged,
  onToggleFlag,
}: StudentCardProps) {
  return (
    <View style={styles.studentCard}>
      {/* Student Image */}
      <Image source={{ uri: photoUrl }} style={styles.studentImage} />

      {/* Student Information */}
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{name}</Text>

        <Text style={styles.studentYear}>{year}</Text>
      </View>

      {/* Flag Button */}
      <Pressable
        onPress={() => onToggleFlag(id)}
        style={({ pressed }) => [
          styles.flagButton,
          flagged ? styles.flaggedButton : styles.unflaggedButton,
          pressed && styles.pressedButton,
        ]}
      >
        <Text
          style={[
            styles.flagButtonText,
            flagged ? styles.flaggedText : styles.unflaggedText,
          ]}
        >
          {flagged ? "★ Flagged" : "☆ Flag"}
        </Text>
      </Pressable>
    </View>
  );
}

// ==========================================
// STUDENT DIRECTORY COMPONENT
// ==========================================

export default function App() {
  // Student records
  const [students, setStudents] = useState([
    {
      id: "s1",
      name: "Ana Cruz",
      year: "3rd Year",
      photoUrl: "https://i.pravatar.cc/100?img=1",
      flagged: false,
    },
    {
      id: "s2",
      name: "Bea Santos",
      year: "2nd Year",
      photoUrl: "https://i.pravatar.cc/100?img=2",
      flagged: false,
    },
    {
      id: "s3",
      name: "Cid Ramos",
      year: "4th Year",
      photoUrl: "https://i.pravatar.cc/100?img=3",
      flagged: false,
    },
    {
      id: "s4",
      name: "Dex Alonzo",
      year: "1st Year",
      photoUrl: "https://i.pravatar.cc/100?img=4",
      flagged: false,
    },
    {
      id: "s5",
      name: "Eli Tan",
      year: "3rd Year",
      photoUrl: "https://i.pravatar.cc/100?img=5",
      flagged: false,
    },
  ]);

  // Search state
  const [query, setQuery] = useState("");

  // Toggle flag
  const toggleFlag = (studentId: string) => {
    setStudents((previousStudents) =>
      previousStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              flagged: !student.flagged,
            }
          : student,
      ),
    );
  };

  // Search filtering
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  // ========================================
  // SCREEN UI
  // ========================================

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Student Directory</Text>

        <Text style={styles.headerSubtitle}>
          {students.length} students this term
        </Text>
      </View>

      {/* MAIN CONTENT */}
      <View style={styles.content}>
        {/* SEARCH BAR */}
        <TextInput
          style={styles.searchInput}
          placeholder="⌕  Search students..."
          placeholderTextColor="#999999"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          clearButtonMode="while-editing"
        />

        {/* SCROLLABLE STUDENT LIST */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.listContainer}
        >
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                id={student.id}
                name={student.name}
                year={student.year}
                photoUrl={student.photoUrl}
                flagged={student.flagged}
                onToggleFlag={toggleFlag}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No Students Found</Text>

              <Text style={styles.emptySubtitle}>
                Try searching another student name.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// ==========================================
// STYLESHEET
// ==========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },

  header: {
    backgroundColor: "#211B59",
    paddingHorizontal: 22,
    paddingTop: 30,
    paddingBottom: 25,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "bold",
  },

  headerSubtitle: {
    color: "#D2CFF0",
    fontSize: 13,
    marginTop: 5,
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  searchInput: {
    height: 48,
    backgroundColor: "#EFEDF8",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#222222",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E5E2F0",
  },

  listContainer: {
    paddingBottom: 25,
  },

  studentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 13,
    borderRadius: 15,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: "#EAE8F0",

    elevation: 2,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },

  studentImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E5E5E5",
  },

  studentInfo: {
    flex: 1,
    marginLeft: 12,
  },

  studentName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#292929",
  },

  studentYear: {
    fontSize: 12,
    color: "#858585",
    marginTop: 4,
  },

  flagButton: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  unflaggedButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#B9B5C9",
  },

  flaggedButton: {
    backgroundColor: "#E9A900",
    borderColor: "#E9A900",
  },

  pressedButton: {
    opacity: 0.65,
    transform: [{ scale: 0.96 }],
  },

  flagButtonText: {
    fontSize: 12,
    fontWeight: "bold",
  },

  unflaggedText: {
    color: "#77718C",
  },

  flaggedText: {
    color: "#FFFFFF",
  },

  emptyContainer: {
    alignItems: "center",
    paddingVertical: 50,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#292929",
  },

  emptySubtitle: {
    color: "#888888",
    fontSize: 13,
    marginTop: 8,
  },
});
