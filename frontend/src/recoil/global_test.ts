// src/recoil/global_test.ts
import { atom } from "recoil";

const loadFromLocalStorage = (key: string, defaultValue: number) => {
  const savedValue = localStorage.getItem(key);
  return savedValue ? JSON.parse(savedValue) : defaultValue;
};

const saveToLocalStorage = (key: string, value: number) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const globalVariable = atom<number>({
  key: "globalVariable",
  default: loadFromLocalStorage("globalVariable", 1),
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        saveToLocalStorage("globalVariable", newValue); 
      });
    },
  ],
});

export const clearLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
