import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getFirebaseAuth, getFirebaseDb } from '../config/firebase';

/**
 * Guarda un resumen de pedido en Firestore.
 * userId y email vienen de la sesión de Auth (misma fuente que las reglas de seguridad).
 */
export async function saveOrderToFirestore({ cart, user, total }) {
  const db = getFirebaseDb();
  const auth = getFirebaseAuth();
  if (!db || !auth) {
    return;
  }
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) {
    throw new Error('No hay sesión activa en Firebase. Vuelve a iniciar sesión.');
  }

  const items = cart.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    quantity: item.quantity,
  }));

  const displayName = user?.name || firebaseUser.displayName || 'Usuario';
  const email = firebaseUser.email || user?.email;

  await addDoc(collection(db, 'orders'), {
    userId: firebaseUser.uid,
    email: email || '',
    displayName,
    total: Number.parseFloat(total),
    items,
    createdAt: serverTimestamp(),
  });
}
