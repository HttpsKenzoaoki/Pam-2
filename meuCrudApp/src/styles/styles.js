import { StyleSheet } from "react-native";

export default StyleSheet.create({

  container:{
    flex:1,
    padding:20,
    backgroundColor:"#f5f5f5",
  },

  title:{
    fontSize:22,
    textAlign:"center",
    marginBottom:20
  },

  searchInput:{
    backgroundColor:"#fff",
    borderRadius:8,
    paddingHorizontal:12,
    paddingVertical:10,
    marginBottom:10
  },

  loadingContainer:{
    marginTop:24,
    alignItems:"center"
  },

  card:{
    flexDirection:"row",
    justifyContent:"space-between",
    backgroundColor:"#fff",
    padding:10,
    marginBottom:10,
    borderRadius:5
  },

  name:{
    fontSize:14
  },

  email:{
    fontSize:10
  },

  emptyText:{
    textAlign:"center",
    color:"#666",
    marginTop:16
  },

  errorText:{
    color:"#d32f2f",
    textAlign:"center",
    marginTop:8
  },

  button:{
    padding:10,
    backgroundColor:"#4CAF50",
    borderRadius:5,
    marginTop:10,
    alignItems:"center"
  }

});