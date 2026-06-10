import en from './en.json';
import tr from './tr.json';

export const dictionaries = { en, tr };
export type Locale = keyof typeof dictionaries;

export const defaultLocale = 'en';
