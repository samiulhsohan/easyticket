import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import SafeView from "../../components/common/SafeView";
import { TextInput } from "react-native-gesture-handler";
import globalStyles from "../../styles/global";
import Button from "../../components/common/Button";
import http from "../../services/http";

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = ({}) => {
  const handleSubmit = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const res = await http.post("login", {
        email: username,
        password,
        rememberMe: true,
      });

      console.log(res.headers);
    } catch (err) {
      console.log("err", err.response.data);
    }
  };

  return (
    <SafeView>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>লগইন করুন</Text>

          <View style={styles.form}>
            <Formik
              initialValues={{ username: "", password: "" }}
              validateOnBlur={false}
              validateOnChange={false}
              validateOnMount={false}
              onSubmit={async (values, { setSubmitting }) => {
                await handleSubmit(values);
                setSubmitting(false);
              }}
            >
              {({ handleChange, values, submitForm, isSubmitting }) => (
                <>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputField}
                      keyboardType="email-address"
                      placeholder="ইমেইল অথবা মোবাইল নাম্বার"
                      onChangeText={handleChange("username")}
                      value={values.username}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputField}
                      placeholder="পাসওয়ার্ড"
                      onChangeText={handleChange("password")}
                      value={values.password}
                      secureTextEntry={true}
                    />
                  </View>

                  <Button
                    variant="large"
                    disabled={
                      isSubmitting || !values.username || !values.password
                    }
                    onPress={submitForm}
                  >
                    লগইন
                  </Button>
                </>
              )}
            </Formik>
          </View>
        </View>
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  title: {
    ...globalStyles.text,
    fontSize: 36,
    marginTop: 60,
  },
  form: {
    marginTop: 24,
  },
  inputContainer: {
    borderRadius: 8,
    borderColor: "#f3f3f3",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 13,
    marginBottom: 16,
    backgroundColor: "#f3f3f3",
  },
  inputField: {
    ...globalStyles.text,
    fontFamily: "Inter-Medium",
    fontSize: 16,
  },
});

export default LoginScreen;
