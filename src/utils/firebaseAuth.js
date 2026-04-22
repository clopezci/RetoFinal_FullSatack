import { getFirebaseAuth, isFirebaseConfigured } from '../config/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';

export function mapFirebaseAuthError(error) {
  const code = error?.code;
  if (code === 'auth/email-already-in-use') {
    return 'Ese correo ya está registrado.';
  }
  if (code === 'auth/invalid-email') {
    return 'Correo no válido.';
  }
  if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
    return 'Credenciales inválidas.';
  }
  if (code === 'auth/weak-password') {
    return 'La contraseña es demasiado débil (mínimo 6 caracteres).';
  }
  if (code === 'auth/too-many-requests') {
    return 'Demasiados intentos. Espera un momento e inténtalo de nuevo.';
  }
  return 'No se pudo completar la acción. Inténtalo de nuevo.';
}

export async function firebaseSignInWithEmail({ email, password }) {
  const auth = isFirebaseConfigured() ? getFirebaseAuth() : null;
  if (!auth) {
    throw new Error('Firebase no está configurado');
  }
  await signInWithEmailAndPassword(auth, email, password);
}

export async function firebaseRegisterWithEmail({ name, email, password }) {
  const auth = isFirebaseConfigured() ? getFirebaseAuth() : null;
  if (!auth) {
    throw new Error('Firebase no está configurado');
  }
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, { displayName: name.trim() });
}

export async function firebaseSignOut() {
  const auth = isFirebaseConfigured() ? getFirebaseAuth() : null;
  if (auth) {
    await signOut(auth);
  }
}
