import React, { Component } from "react";
import { View, Text, StyleSheet,TouchableOpacity, TextInput,ImageBackground,Image } from "react-native";
import *as Permissions from "expo-permissions";
import { BarCodeScanner, } from "expo-barcode-scanner";
import db from '../config'
const bgImage=require("../assets/background2.png")
const appIcon=require("../assets/appIcon.png")
const appName=require("../assets/appName.png")
export default class TransactionScreen extends Component {
constructor(){
 super()
 this.state={
 domState:"normal",
 hasCameraPermissions:null,
 scanned:false,
 scannedData:""
 }    
}
getCameraPermissions=async domState =>{
const {status}=await Permissions.askAsync(Permissions.CAMERA)
this.setState({
hasCameraPermissions:status==="granted",
domState:domState,
scanned:false
})
}
handleTransaction=()=>{
var {bookId}=this.state;
db.collection('books')
  .doc(bookId)
  .get()
  .then(doc=>{
    var book = doc.data()
    if(book.is_book_available ){
      this.initiateBookIssue()
    }
    else{this.initiateBookReturn()}
  })
}
initiateBookIssue=()=>{
  console.log("book is issued")
}
initiateBookReturn=()=>{
  console.log("book is returned")
}
handleBarCodeScanned=async({type,data})=>{
this.setState({
scannedData:data,
domState:"normal",
scanned:true
})
}
render(){
const{domState,hasCameraPermissions,scannedData,scanned}=this.state;
if(domState==="scanner"){
return(
<BarCodeScanner
onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
style={StyleSheet.absoluteFillObject}
/>

)
}



return(

<View style ={styles.container}>
<ImageBackground source={bgImage} style={styles.bgImage}> 
<View style={styles.upperContainer} >
<Image source={appIcon} style={styles.appIcon} /> 
<Image source={appName} style={styles.appName} />
<View style={styles.lowerContainer}>
     <View style={styles.textInputContainer}>
     <TextInput style={styles.textinput} 
     placeholder={"Book Id"} 
     placeholderTextColor={"#FFFFFF"} 
     value={bookId} />
      <TouchableOpacity style={styles.scanbutton} onPress={() => this.getCameraPermissions("bookId")} >
            <Text style={styles.scanbuttonText}>
             Scan
            </Text>
             </TouchableOpacity>
     </View>
     <View style={[styles.textInputContainer,{marginTop:25}]}>
     <TextInput style={styles.textinput} 
     placeholder={"Student Id"} 
     placeholderTextColor={"#FFFFFF"} 
     value={bookId} />
      <TouchableOpacity style={styles.scanbutton} onPress={() => this.getCameraPermissions("Student Id")} >
            <Text style={styles.scanbuttonText}>
             Scan
            </Text>
             </TouchableOpacity>
     </View>
     <TouchableOpacity style={[styles.button,{marginTop:25}]}
     onPress={this.handleTransaction}
     >
      <Text style={styles.buttonText}>
      Submit
      </Text>

     </TouchableOpacity>
</View>

</View>
</ImageBackground>
</View>

)
}    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  upperContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  appIcon: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 80
  },
  appName: {
    width: 80,
    height: 80,
    resizeMode: "contain"
  },
  lowerContainer: {
    flex: 0.5,
    alignItems: "center"
  },
  textinputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#9DFD24",
    borderColor: "#FFFFFF"
  },
  textinput: {
    width: "57%",
    height: 50,
    padding: 10,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: "#5653D4",
    fontFamily: "Rajdhani_600SemiBold",
    color: "#FFFFFF"
  },
  scanbutton: {
    width: 100,
    height: 50,
    backgroundColor: "#9DFD24",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  scanbuttonText: {
    fontSize: 24,
    color: "#0A0101",
    fontFamily: "Rajdhani_600SemiBold"
  },
  button: {
    width:'45%',
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f48d20",
    borderRadius:15
  },
  buttonText: { 
  fontSize: 24,
  color: '#ffffff',
  fontFamily: 'Rajdhani_600SemiBold'
  }
});

