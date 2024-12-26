import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../relog/login';
import AccountantRegistrationForm from '../relog/acregister';
import AdminRegistrationForm from '../relog/adminregister';
import FacultyRegistrationForm from '../relog/facultyregister';
import StudentRegistrationForm from '../relog/sturegister';
import AdminHome from '../components/Adminhome';
import AccountantHome from '../components/Accountanthome';
import StudentHome from '../components/Studenthome';
import FacultyHome from '../components/Facultyhome';
import StudentDetails from '../components/studentdetails';
import FacultyDetails from '../components/facultydetails';
import AccountantDetails from '../components/accountantdetails';
import AddFees from '../components/addfess';
import addfineamount from '../components/addfineamount';
import StudentLoginScreen from '../relog/studentlogin';
import EditStudent from '../components/editstudent';
import AllStudents from '../components/studentlist';
import AccountantProfileScreen from '../components/accountantprofile';
import Updateamount from '../components/updateamount';
import StudentDetails2 from '../components/acStudent';
import AdminProfileScreen from '../components/adminprofile';
import FacultyProfileScreen from '../components/facultyprofile';



const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Accountantregister">
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="Accountantregister" component={AccountantRegistrationForm} />
        <Stack.Screen name="adminregister" component={AdminRegistrationForm} />
        <Stack.Screen name="facregister" component={FacultyRegistrationForm} />
        <Stack.Screen name="StudentRegistrationForm" component={StudentRegistrationForm} />
        <Stack.Screen name="AdminHome" component={AdminHome} />
        <Stack.Screen name="AccountantHome" component={AccountantHome} />
        <Stack.Screen name="StudentHome" component={StudentHome} />
        <Stack.Screen name ="FacultyHome" component={FacultyHome} />
        <Stack.Screen name="StudentDetails" component={StudentDetails} />
        <Stack.Screen name="facultydetails" component={FacultyDetails} />
        <Stack.Screen name="accountantdetails" component={AccountantDetails} />
        <Stack.Screen name="AddFees" component={AddFees} />
        <Stack.Screen name="addfineamount" component={addfineamount} />
        <Stack.Screen name="studentlogin" component={StudentLoginScreen} />
        <Stack.Screen name="editstudent" component={EditStudent} />
        <Stack.Screen name="Studentlist" component={AllStudents} />
        <Stack.Screen name="AccountantProfile" component={AccountantProfileScreen}/>
        <Stack.Screen name="updateamount" component={Updateamount} />
        <Stack.Screen name="Acstudent" component={StudentDetails2} />
        <Stack.Screen name="adminprofile" component={AdminProfileScreen} />
        <Stack.Screen name="facultyprofile" component={FacultyProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
