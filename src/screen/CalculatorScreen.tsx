/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import NativeFunctions from '../../spec/NativeFunctions';

const Button = ({text, onClick}: {text: String; onClick: () => void}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        margin: 5,
      }}>
      <Text style={{color: 'white'}}>{text}</Text>
    </TouchableOpacity>
  );
};

function CalculatorScreen(): React.JSX.Element {
  const [value, setValue] = React.useState(0);
  const [mul, setMul] = React.useState(0);
  const [div, setDiv] = React.useState(0);
  const [mod, setMod] = React.useState(0);
  const [exp, setExp] = React.useState(0);
  const [sqrt, setSqrt] = React.useState(0);
  const [text, setText] = React.useState(0);
  const [text2, setText2] = React.useState(0);
  const [error, setError] = React.useState('');
  const [sub, setSub] = React.useState(0);

  const nativeAddition = async () => {
    try {
      const result = NativeFunctions?.add(text, text2) ?? 0;
      setValue(result);
    } catch (e: any) {
      setError(e.message);
    }
  };
  const nativeSubtraction = async () => {
    try {
      const result = NativeFunctions?.subtract(text, text2) ?? 0;
      setSub(result);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const nativeMultiplication = async () => {
    setMul(NativeFunctions?.multiply(text, text2) ?? 0);
  };

  const nativeDivision = async () => {
    setDiv(NativeFunctions?.divide(text, text2) ?? 0);
  };
  const nativeModulus = async () => {
    setMod(NativeFunctions?.squareRoot(text) ?? 0);
  };

  const nativeExponent = async () => {
    setExp(NativeFunctions?.exponent(text) ?? 0);
  };

  const TextFormatter = ({text}: {text: String}) => {
    return <Text style={{fontSize: 20, marginTop: 20}}>{text}</Text>;
  };
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        placeholder="Enter the first number"
        onChangeText={text => setText(parseInt(text))}
        placeholderTextColor={"black"}
      />
      <TextInput
        placeholder="Enter the second number"
        onChangeText={text => setText2(parseInt(text))}
        placeholderTextColor={"black"}
      />
      <TextFormatter text={`Native Addition: ${value}`} />

      <View style={{flexDirection: 'row'}}>
        <Button text="Login" onClick={() => console.log('Login')} />
        <Button text="SignUp" onClick={() => console.log('SignIn')} />
      </View>

      <View style={{flexDirection: 'row'}}>
        <Button text="Native Addition" onClick={() => nativeAddition()} />
        <Button text="Native Subtraction" onClick={() => nativeSubtraction()} />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Button text="Native Multiply" onClick={() => nativeMultiplication()} />
        <Button text="Native Division" onClick={() => nativeDivision()} />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Button text="Native Modulus" onClick={() => nativeModulus()} />
        <Button text="Native exponent" onClick={() => nativeExponent()} />
      </View>
      <TextFormatter text={`Native subtraction: ${sub}`} />

      <TextFormatter text={`Native multiplication: ${mul}`} />
      <TextFormatter text={`Native divions: ${div}`} />
      <TextFormatter text={`Native modules: ${mod}`} />
      <TextFormatter text={`Native exponent: ${exp}`} />

      
    </SafeAreaView>
  );
}

export default CalculatorScreen;
