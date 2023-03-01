import {getDatabase, ref, set, child, get, update} from 'firebase/database';
import * as firebase from 'firebase/app';
import {getStorage, ref as refStorage, uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage'
import { IPatient } from '../models/IPatient';
import { StatusType } from '../pages/AdminPanel/AdminPanelPage';

const firebaseConfig = {
  apiKey: "AIzaSyDpnii32YBgZtRjcyCKy1WK-u0D4l87_JE",
  authDomain: "need-a-doctor-f5a09.firebaseapp.com",
  databaseURL: "https://need-a-doctor-f5a09-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "need-a-doctor-f5a09",
  storageBucket: "need-a-doctor-f5a09.appspot.com",
  messagingSenderId: "572565503143",
  appId: "1:572565503143:web:39e37621223a7a06eeaf82",
  measurementId: "G-63P6W8HNQH"
};


firebase.initializeApp(firebaseConfig);

const db = getDatabase();

export const useFirebase = () => {

    function writePatientData({id, date, phone, prefix, user} : IPatient) {
    set(ref(db, 'Patient/' + id), {
      id,
      date:date.toString(),
      phone: '+'+prefix+phone,
      age: user.age || null,
      email: user.email || null,
      name: user.name,
      other: user.other || null, 
      severity: user.severity,
      complaints: user.complaints.join('; '),
      dateCreated: Date.now(),
      status: 'active'
    });
  }

  function writePatientStatus(id: string, status: StatusType) {
    update(ref(db, 'Patient/' + id), {
      id,
      status
    });
  }


  const getData = (dataReq: string) => {
    const dbRef = ref(getDatabase());
      const data = get(child(dbRef, dataReq)).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return false
      }
    }).catch((error) => {
      return error;
    });
    return data;
}

const getAuth = () => getData(`/auth`);
const getPatients = () => getData('/Patient')

return {writePatientData, getAuth, getPatients, writePatientStatus};

}
  