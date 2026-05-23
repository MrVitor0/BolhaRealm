import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, logEvent, type Analytics } from "firebase/analytics";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
    measurementId: config.public.firebaseMeasurementId,
  };

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

  let analytics: Analytics | null = null;
  if (config.public.firebaseMeasurementId) {
    analytics = getAnalytics(app);
  }

  return {
    provide: {
      firebaseAnalytics: analytics,
      logEvent: (eventName: string, params?: Record<string, unknown>) => {
        if (analytics) logEvent(analytics, eventName, params as never);
      },
    },
  };
});
