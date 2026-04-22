import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getFirebaseDb } from '../config/firebase';

/**
 * Guarda un resumen de pedido en Firestore (usuario autenticado en Firebase).
 */
export async function saveOrderToFirestore({ cart, user, total }) {
  const db = getFirebaseDb();
  if (!db || !user?.id) {
    return;
  }

  const items = cart.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    quantity: item.quantity,
  }));

  await addDoc(collection(db, 'orders'), {
    userId: user.id,
    email: user.email,
    displayName: user.name,
    total: Number.parseFloat(total),
    items,
    createdAt: serverTimestamp(),
  });
}
