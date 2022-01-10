import React from "react";
import { Provider } from "react-redux";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { configureStore, createReducer, combineReducers } from "@reduxjs/toolkit";

import { slices, navigators, initialRoute } from "@modules";


const Stack = createStackNavigator();

const getNavigation = (modules, initialRoute) => {
  const Navigation = () => {
    const routes = modules.map(([name, navigator]) => {
      return (
        <Stack.Screen options={{headerShown: false}} key={name} name={name} component={navigator} />
      )
    });
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          {routes}
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  return Navigation;
}

const getStore = slices => {
  const reducers = Object.fromEntries(slices.map(([name, slice]) => [name, slice.reducer]));

  const appState = {
    name: "Baydot",
    url: "baydot.digital",
    version: "1.0.0"
  }

  const appReducer = createReducer(appState, _ => {
    return appState;
  })

  const reducer = combineReducers({
    app: appReducer,
    ...reducers
  });

  return configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  });
}


const App = () => {
  const Navigation = getNavigation(navigators, initialRoute);
  const store = getStore([...slices]);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
