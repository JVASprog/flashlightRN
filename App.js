import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import Torch from "react-native-torch";
import RNShake from 'react-native-shake';

import imagex from './assets/icons/lanterna_preta.png';

const App = () => {
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    //Alert.alert('Atualizou o Componente ' + toggle);  abre caixa de alerta 
    // Liga flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(()=>{
    const subscription = RNShake.addListener(()=> {setToggle(oldToggle => !oldToggle);
    });

    //este return serve para ele se autoremover e nao ficar criando inumeros eventos

    return () => subscription.remove();
  },[]);

  return (
    <View style={toggle ? style.containerBlack : style.containerLight}>
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image style={toggle ? style.lightingOff : style.lightingOn} source={imagex} />
        <Text style={[style.textDescription, toggle ? style.textDefault : style.textOn]}>Liga/Desliga</Text>
      </TouchableOpacity>
    </View>
  )
}

export default App;

const style = StyleSheet.create({
  containerBlack: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  textDescription: {
    marginTop: 40,
    fontSize: 26,
    fontWeight: 'bold',
  },
  textDefault: {
    color: 'white',
  },
  textOn: {
    color: 'black',
  },
});