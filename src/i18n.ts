import * as React from 'react';

import * as bcp47 from './bcp47';
import { german } from './i18n/de';
import { english } from './i18n/en';
import { spanish } from './i18n/es';
import { french } from './i18n/fr';
import { croatian } from './i18n/hr';
import { serbian } from './i18n/sr';
import * as question from './question';

export type ExpectedAnswers = {
  readonly [_ in question.ID]: string;
};

export interface Translation {
  chooseYourLanguage: string;
  languageName: string;
  chooseYourVoice: string;
  noVoiceAvailable: string;
  expectedAnswers: ExpectedAnswers;
  hereItSays: string;
  nothingIsWrittenHere: string;
  questionImageAlt: string;
}

export const SERBIAN = 'sr';
export const CROATIAN = 'hr';
export const ENGLISH = 'en';
export const GERMAN = 'de';
export const FRENCH = 'fr';
export const SPANISH = 'es';

export type LanguageID =
  | typeof SERBIAN
  | typeof CROATIAN
  | typeof ENGLISH
  | typeof GERMAN
  | typeof FRENCH
  | typeof SPANISH;

export type Translations = Map<LanguageID, Translation>;

export function initializeTranslations(): Translations {
  const result = new Map<LanguageID, Translation>();

  result.set(SERBIAN, serbian);
  result.set(CROATIAN, croatian);
  result.set(ENGLISH, english);
  result.set(GERMAN, german);
  result.set(FRENCH, french);
  result.set(SPANISH, spanish);

  // Post-condition
  if (result.size === 0) {
    throw Error('Expected a non-empty map of translations.');
  }
  return result;
}

/**
 * Infer the translation language from the navigator language.
 *
 * It matches first exactly, then by the primary language. If no match has been found, the first language
 * in the given list is returned.
 *
 * @param navigatorLanguage language as indicated by the browser
 * @param languages list of available translation languages
 */
export function inferDefault(navigatorLanguage: bcp47.Tag, languages: LanguageID[]): LanguageID {
  let result: LanguageID | undefined = undefined;

  for (const lang of languages) {
    if (lang === navigatorLanguage) {
      result = lang;
      break;
    }

    if (bcp47.primaryLanguage(navigatorLanguage) === lang) {
      result = lang;
      break;
    }
  }

  if (result === undefined) {
    return languages[0];
  }
  return result;
}

export const Context = React.createContext<Translations | undefined>(undefined);