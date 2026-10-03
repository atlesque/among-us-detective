import { computed, onMounted } from 'vue';
import { useSettingsStore } from '~/stores/settings';
import { translations, SUPPORTED_LOCALES, type SupportedLocale, type LocaleInfo } from '~/utils/translations';
import { getTranslatedTaskName, getTranslatedLocation } from '~/utils/taskTranslations';
import { uiTranslations } from '~/utils/uiTranslations';

export function useI18n() {
  const settingsStore = useSettingsStore();

  function detectBrowserLocale(): SupportedLocale {
    if (typeof navigator === 'undefined') return 'en-US';
    const lang = (navigator.language || (navigator as any).userLanguage || '').toLowerCase();
    if (lang.startsWith('pt')) return 'pt-BR';
    if (lang.startsWith('es')) return 'es-ES';
    if (lang.startsWith('fr')) return 'fr-FR';
    if (lang.startsWith('de')) return 'de-DE';
    if (lang.startsWith('ko')) return 'ko-KR';
    return 'en-US';
  }

  const detectedBrowserLocale = computed<SupportedLocale>(() => detectBrowserLocale());

  const detectedLocaleInfo = computed<LocaleInfo>(() => {
    return SUPPORTED_LOCALES.find(l => l.code === detectedBrowserLocale.value) || SUPPORTED_LOCALES[0];
  });

  function initLocale() {
    if (!settingsStore.hasAutoDetectedLanguage) {
      settingsStore.setHasAutoDetectedLanguage(true);
    }
  }

  onMounted(() => {
    initLocale();
  });

  const locale = computed<SupportedLocale>(() => {
    if (!settingsStore.uiLanguage || settingsStore.uiLanguage === 'auto') {
      return detectedBrowserLocale.value;
    }
    return settingsStore.uiLanguage;
  });

  function t(key: string, params?: Record<string, string | number>): string {
    const currentLoc = locale.value;
    let str = translations[currentLoc]?.[key]
      || uiTranslations[currentLoc]?.[key]
      || translations['en-US']?.[key]
      || uiTranslations['en-US']?.[key]
      || key;
    if (params) {
      for (const [pKey, pVal] of Object.entries(params)) {
        str = str.replace(new RegExp(`\\{${pKey}\\}`, 'g'), String(pVal));
      }
    }
    return str;
  }

  function tRole(role: string | null | undefined): string {
    if (!role) return '';
    const roleKey = `role.${role.toLowerCase()}`;
    const translated = t(roleKey);
    return translated === roleKey ? role : translated;
  }

  function tColor(color: string): string {
    if (!color) return '';
    return t(`color.${color.toLowerCase()}`);
  }

  function tTask(name: string): string {
    return getTranslatedTaskName(name, locale.value);
  }

  function tLocation(location: string): string {
    return getTranslatedLocation(location, locale.value);
  }

  function setLocale(loc: 'auto' | SupportedLocale) {
    settingsStore.setUiLanguage(loc);
  }

  return {
    t,
    tRole,
    tColor,
    tTask,
    tLocation,
    locale,
    setLocale,
    availableLocales: SUPPORTED_LOCALES,
    detectedBrowserLocale,
    detectedLocaleInfo,
    initLocale,
  };
}
