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
  wrapProduct: {
    flex: 1,
    marginBottom: 55,
    alignItems: "center",
  },
  productContainer: {
    width: "90%",
    alignItems: "center",
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
  textMenu: {
    marginHorizontal: 8,
  },
  productTitle: {
    marginVertical: 30,
    fontSize: 30,
    fontWeight: "bold",
  },
  rowMenuRefresh: {
    marginHorizontal: 12,
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: "white",
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
    width: "100%",
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  textMenuRefresh: {
    textAlign: "center",
    color: "#3a86ff",
    marginHorizontal: 8,
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
  productWastedText: {
    color: "#d90429",
    fontWeight: "bold",
    fontSize: 20,
  },
  productNonWastedText: {
    color: "#16db65",
    fontWeight: "bold",
    fontSize: 20,
  },
});
