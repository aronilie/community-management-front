import { StyleSheet } from "react-native-size-scaling";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0b090a",
  },
  rowMenuAdd: {
    marginHorizontal: 12,
    marginTop: 40,
    borderRadius: 8,
    backgroundColor: "#3a86ff",
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
    borderBottomWidth: 0.4,
    borderBottomColor: "gray",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    width: "100%",
    elevation: 3,
  },
  textMenuAdd: {
    textAlign: "center",
    color: "white",
    marginHorizontal: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export const inputStyles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    width: "100%",
  },
  input: {
    height: 55,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#DDDDDD",
  },
  inputStyle: { fontSize: 16 },
  labelStyle: {
    fontSize: 14,
    position: "absolute",
    top: -10,
    backgroundColor: "white",
    paddingHorizontal: 4,
    marginLeft: -4,
  },
  placeholderStyle: { fontSize: 16 },
  textErrorStyle: { fontSize: 16 },
});
