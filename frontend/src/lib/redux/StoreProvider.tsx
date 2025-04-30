'use client';
import { useRef, useEffect } from 'react'; // Added useEffect
import { Provider } from 'react-redux';
import { makeStore, AppStore, AppDispatch } from './store'; // Added AppDispatch
import { initializeAuth } from './slices/authSlice'; // Added initializeAuth

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    // Dispatch initializeAuth on initial client-side render
    const dispatch = storeRef.current.dispatch as AppDispatch;
    dispatch(initializeAuth());
  }

  // Note: The useEffect approach mentioned in the prompt might cause issues
  // with strict mode or re-renders if not handled carefully.
  // Dispatching directly after store creation ensures it happens once
  // before the Provider makes the store available to the component tree.
  // If issues arise, a useEffect with a check for initialization state
  // might be needed, but this is simpler for now.

  return <Provider store={storeRef.current}>{children}</Provider>;
}