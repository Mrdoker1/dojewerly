import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LanguageState {
  currentLanguage: string;
  availableLanguages: string[];
}

// Список доступных языков
const AVAILABLE_LANGUAGES = ['EN', 'RU', 'PL'];

// Устанавливаем дефолтный язык
const DEFAULT_LANGUAGE = 'EN';


// Проверяем, есть ли язык в localStorage
if (!localStorage.getItem('language')) {
  // Если нет, устанавливаем DEFAULT_LANGUAGE по умолчанию
  localStorage.setItem('language', DEFAULT_LANGUAGE);
}

// Ищем язык в localStorage или используем DEFAULT_LANGUAGE по умолчанию
const initialLanguage = localStorage.getItem('language') || DEFAULT_LANGUAGE;

const initialState: LanguageState = {
  currentLanguage: initialLanguage,
  availableLanguages: AVAILABLE_LANGUAGES
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      if (state.availableLanguages.includes(action.payload)) {
        state.currentLanguage = action.payload;
        // Сохраняем выбранный язык в localStorage
        localStorage.setItem('language', action.payload);
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;

// Экспортируем список доступных языков и DEFAULT_LANGUAGE для использования в других частях приложения
export const AVAILABLE_LANGUAGES_LIST = AVAILABLE_LANGUAGES;
export const DEFAULT_LANGUAGE_CONST = DEFAULT_LANGUAGE;

export default languageSlice.reducer;
