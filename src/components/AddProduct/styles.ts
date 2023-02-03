import { StyleSheet } from "react-native-size-scaling";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  imgBackground: { width: "100%", height: 150 },
  wrap: {
    marginTop: 64,
  },
  avatarImg: {
    borderRadius: 50,
  },
  name: {
    marginTop: 16,
    alignSelf: "center",
  },
  wrapMenu: {
    flex: 1,
    marginBottom: 55,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  rowMenu: {
    marginHorizontal: 12,
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: "#F8F8FF",
    flexDirection: "row",
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

    elevation: 3,
  },
  menuContainer: {
    flexDirection: "row",
    width: "90%",
    marginTop: 40,
    alignItems: "center",
  },
  textMenu: {
    marginHorizontal: 8,
  },
  title: {
    color: "#181818",
    fontSize: 20,
    fontWeight: "500",
    marginRight: 15,
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
    padding: 16,
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
