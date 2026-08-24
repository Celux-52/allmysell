import en from './en.json';
import tr from './tr.json';
import ru from './ru.json';
import uz from './uz.json';

export const dictionaries = { en, tr, ru, uz };
export type Locale = keyof typeof dictionaries;

export const defaultLocale = 'en';
