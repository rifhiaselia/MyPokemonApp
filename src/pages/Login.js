import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import database from '@react-native-firebase/database';
import {Formik} from 'formik';
import * as yup from 'yup';

const Login = ({navigation}) => {
  const LoginSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  const onLogin = values => {
    try {
      database()
        .ref('/users/')
        .orderByChild('emailId')
        .equalTo(values.email)
        .once('value')
        .then(async snapshot => {
          if (snapshot.val() == null) {
            Alert.alert('Invalid Email Id');
            return false;
          }
          let userData = Object.values(snapshot.val())[0];
          if (userData?.password != values.password) {
            Alert.alert('Error', 'Invalid Password!');
            return false;
          }
          console.log('User data: ', userData);
          navigation.replace('HomeScreen', {userData: userData});
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Formik
        validationSchema={LoginSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={values => onLoginRDB(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <View style={styles.container}>
              <TextInput
                name="email"
                placeholder="masukan email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                style={styles.textInput}
              />
            </View>
            {errors.email && <Text style={{color: 'red'}}>{errors.email}</Text>}

            <View style={styles.container}>
              <TextInput
                name="password"
                placeholder="masukan password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                style={styles.textInput}
                secureTextEntry={true}
              />
            </View>
            {errors.password && (
              <Text style={{color: 'red'}}>{errors.password}</Text>
            )}

            <TouchableOpacity onPress={handleSubmit}>
              <Text>Login</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={{color: '#000', marginRight: 5}}>
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('RegisterScreen')}>
                <Text style={{color: '#b12441', fontWeight: 'bold'}}>
                  Register Now
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    marginBottom: 10,
    borderColor: '#f6f6f6',
    borderWidth: 2,
    width: '90%',
  },
});
