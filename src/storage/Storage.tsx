export const saveLoginInfo = async (SecureStore: any, email: string, password: string) => {
    try {
      await SecureStore.setItemAsync('savedEmail', email);
      await SecureStore.setItemAsync('savedPassword', password);

      console.log('Login information saved successfully.');
    } catch (error) {
      console.error('Error saving login information:', error);
    }
};

export const saveLastQuizID = async (quizID: string) => {
    try {

    } catch (error) {
      console.error('Error saving last quiz id:', error);
    }
}