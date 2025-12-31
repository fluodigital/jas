import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCzkBIUmbzWwVEsLPtHURH33gScdGJKxbY',
  authDomain: 'jas-soni.firebaseapp.com',
  projectId: 'jas-soni',
  storageBucket: 'jas-soni.firebasestorage.app',
  messagingSenderId: '293993309190',
  appId: '1:293993309190:web:7c4464e8f32dbf95724f87',
  measurementId: 'G-XXF9SVPJEQ',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let analytics: Analytics | undefined;

export const initAnalytics = async () => {
  if (typeof window === 'undefined') return undefined;
  const supported = await isSupported();
  if (!supported) return undefined;
  analytics = getAnalytics(app);
  return analytics;
};

export const getAnalyticsInstance = () => analytics;

export { app };

