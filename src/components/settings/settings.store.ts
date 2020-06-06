import { Store } from "../../store";
import { Hotkey } from "../../utils/parseHotkey";
import { getTranslator } from "../../vendors";

export type ISettingsStoreData = typeof defaultSettings;

export const defaultHokey: Hotkey = {
  altKey: true,
  shiftKey: true,
  code: "X"
}

export const defaultSettings = {
  autoPlayText: false,
  useChromeTtsEngine: false,
  showTextToSpeechIcon: true,
  showNextVendorIcon: true,
  showCopyTranslationIcon: true,
  useDarkTheme: false,
  showInContextMenu: false,
  showIconNearSelection: true,
  showPopupAfterSelection: false,
  showPopupOnClickBySelection: false,
  showPopupOnDoubleClick: true,
  showPopupOnHotkey: true,
  showTranslatedFrom: false,
  rememberLastText: false,
  textInputTranslateDelayMs: 750,
  vendor: "google",
  langFrom: "auto",
  langTo: navigator.language.split('-')[0],
  historyEnabled: false,
  historySaveWordsOnly: true,
  historyAvoidDuplicates: true,
  historyPageSize: 100,
  popupFixedPos: "", // possible values defined as css-classes in popup.scss
  hotkey: defaultHokey,
};

export class SettingsStore extends Store<ISettingsStoreData> {
  constructor() {
    super({
      id: "settings",
      storageType: "sync",
      initialData: defaultSettings
    });
  }

  setVendor(vendorName: string) {
    var translator = getTranslator(vendorName);
    var { vendor, langFrom, langTo } = this.data;
    if (vendor === vendorName) return;
    if (!translator.langFrom[langFrom]) {
      this.data.langFrom = Object.keys(translator.langFrom)[0];
    }
    if (!translator.langTo[langTo]) {
      this.data.langTo = Object.keys(translator.langTo)[0];
    }
    this.data.vendor = vendorName;
  }
}

export const settingsStore = new SettingsStore();