import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getAdminApp() {
  if (getApps().length > 0) return getApps()[0];

  const config = useRuntimeConfig();

  return initializeApp({
    credential: cert({
      projectId: config.firebaseProjectId,
      clientEmail: config.firebaseClientEmail,
      privateKey: config.firebasePrivateKey?.replace(/\\n/g, "\n"),
    }),
  });
}

export function adminDb() {
  return getFirestore(getAdminApp());
}
