/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// Ported from MV2 samples. Some coding practices are non-standard in MV3, but the sample remains a robust demonstration of the chrome.fontsettings API.
// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

/**
 * @fileoverview The Advanced Font Settings Extension implementation.
 */

function $(id) {
  return document.getElementById(id);
}

/**
 * A version, for any config files that are exported. Otherwise unused as of now
 * @const
 */
const SETTINGS_VERSION = 1;

/**
 * @namespace
 */
let advancedFonts = {};

/**
 * The ICU script code for the Common, or global, script, which is used as the
 * fallback when the script is undeclared.
 * @const
 */
advancedFonts.COMMON_SCRIPT = 'Zyyy';

/**
 * The scripts supported by the Font Settings Extension API.
 * @const
 */
advancedFonts.scripts = [
  { scriptCode: advancedFonts.COMMON_SCRIPT, scriptName: 'Default' },
  { scriptCode: 'Afak', scriptName: 'Afaka' },
  { scriptCode: 'Arab', scriptName: 'Arabic' },
  { scriptCode: 'Armi', scriptName: 'Imperial Aramaic' },
  { scriptCode: 'Armn', scriptName: 'Armenian' },
  { scriptCode: 'Avst', scriptName: 'Avestan' },
  { scriptCode: 'Bali', scriptName: 'Balinese' },
  { scriptCode: 'Bamu', scriptName: 'Bamum' },
  { scriptCode: 'Bass', scriptName: 'Bassa Vah' },
  { scriptCode: 'Batk', scriptName: 'Batak' },
  { scriptCode: 'Beng', scriptName: 'Bengali' },
  { scriptCode: 'Blis', scriptName: 'Blissymbols' },
  { scriptCode: 'Bopo', scriptName: 'Bopomofo' },
  { scriptCode: 'Brah', scriptName: 'Brahmi' },
  { scriptCode: 'Brai', scriptName: 'Braille' },
  { scriptCode: 'Bugi', scriptName: 'Buginese' },
  { scriptCode: 'Buhd', scriptName: 'Buhid' },
  { scriptCode: 'Cakm', scriptName: 'Chakma' },
  { scriptCode: 'Cans', scriptName: 'Unified Canadian Aboriginal Syllabics' },
  { scriptCode: 'Cari', scriptName: 'Carian' },
  { scriptCode: 'Cham', scriptName: 'Cham' },
  { scriptCode: 'Cher', scriptName: 'Cherokee' },
  { scriptCode: 'Cirt', scriptName: 'Cirth' },
  { scriptCode: 'Copt', scriptName: 'Coptic' },
  { scriptCode: 'Cprt', scriptName: 'Cypriot' },
  { scriptCode: 'Cyrl', scriptName: 'Cyrillic' },
  { scriptCode: 'Cyrs', scriptName: 'Old Church Slavonic Cyrillic' },
  { scriptCode: 'Deva', scriptName: 'Devanagari' },
  { scriptCode: 'Dsrt', scriptName: 'Deseret' },
  { scriptCode: 'Dupl', scriptName: 'Duployan shorthand' },
  { scriptCode: 'Egyd', scriptName: 'Egyptian demotic' },
  { scriptCode: 'Egyh', scriptName: 'Egyptian hieratic' },
  { scriptCode: 'Egyp', scriptName: 'Egyptian hieroglyphs' },
  { scriptCode: 'Elba', scriptName: 'Elbasan' },
  { scriptCode: 'Ethi', scriptName: 'Ethiopic' },
  { scriptCode: 'Geok', scriptName: 'Georgian Khutsuri' },
  { scriptCode: 'Geor', scriptName: 'Georgian' },
  { scriptCode: 'Glag', scriptName: 'Glagolitic' },
  { scriptCode: 'Goth', scriptName: 'Gothic' },
  { scriptCode: 'Gran', scriptName: 'Grantha' },
  { scriptCode: 'Grek', scriptName: 'Greek' },
  { scriptCode: 'Gujr', scriptName: 'Gujarati' },
  { scriptCode: 'Guru', scriptName: 'Gurmukhi' },
  { scriptCode: 'Hang', scriptName: 'Hangul' },
  { scriptCode: 'Hani', scriptName: 'Han' },
  { scriptCode: 'Hano', scriptName: 'Hanunoo' },
  { scriptCode: 'Hans', scriptName: 'Simplified Han' },
  { scriptCode: 'Hant', scriptName: 'Traditional Han' },
  { scriptCode: 'Hebr', scriptName: 'Hebrew' },
  { scriptCode: 'Hluw', scriptName: 'Anatolian Hieroglyphs' },
  { scriptCode: 'Hmng', scriptName: 'Pahawh Hmong' },
  { scriptCode: 'Hung', scriptName: 'Old Hungarian' },
  { scriptCode: 'Inds', scriptName: 'Indus' },
  { scriptCode: 'Ital', scriptName: 'Old Italic' },
  { scriptCode: 'Java', scriptName: 'Javanese' },
  { scriptCode: 'Jpan', scriptName: 'Japanese' },
  { scriptCode: 'Jurc', scriptName: 'Jurchen' },
  { scriptCode: 'Kali', scriptName: 'Kayah Li' },
  { scriptCode: 'Khar', scriptName: 'Kharoshthi' },
  { scriptCode: 'Khmr', scriptName: 'Khmer' },
  { scriptCode: 'Khoj', scriptName: 'Khojki' },
  { scriptCode: 'Knda', scriptName: 'Kannada' },
  { scriptCode: 'Kpel', scriptName: 'Kpelle' },
  { scriptCode: 'Kthi', scriptName: 'Kaithi' },
  { scriptCode: 'Lana', scriptName: 'Lanna' },
  { scriptCode: 'Laoo', scriptName: 'Lao' },
  { scriptCode: 'Latf', scriptName: 'Fraktur Latin' },
  { scriptCode: 'Latg', scriptName: 'Gaelic Latin' },
  { scriptCode: 'Latn', scriptName: 'Latin' },
  { scriptCode: 'Lepc', scriptName: 'Lepcha' },
  { scriptCode: 'Limb', scriptName: 'Limbu' },
  { scriptCode: 'Lina', scriptName: 'Linear A' },
  { scriptCode: 'Linb', scriptName: 'Linear B' },
  { scriptCode: 'Lisu', scriptName: 'Fraser' },
  { scriptCode: 'Loma', scriptName: 'Loma' },
  { scriptCode: 'Lyci', scriptName: 'Lycian' },
  { scriptCode: 'Lydi', scriptName: 'Lydian' },
  { scriptCode: 'Mand', scriptName: 'Mandaean' },
  { scriptCode: 'Mani', scriptName: 'Manichaean' },
  { scriptCode: 'Maya', scriptName: 'Mayan hieroglyphs' },
  { scriptCode: 'Mend', scriptName: 'Mende' },
  { scriptCode: 'Merc', scriptName: 'Meroitic Cursive' },
  { scriptCode: 'Mero', scriptName: 'Meroitic' },
  { scriptCode: 'Mlym', scriptName: 'Malayalam' },
  { scriptCode: 'Mong', scriptName: 'Mongolian' },
  { scriptCode: 'Moon', scriptName: 'Moon' },
  { scriptCode: 'Mroo', scriptName: 'Mro' },
  { scriptCode: 'Mtei', scriptName: 'Meitei Mayek' },
  { scriptCode: 'Mymr', scriptName: 'Myanmar' },
  { scriptCode: 'Narb', scriptName: 'Old North Arabian' },
  { scriptCode: 'Nbat', scriptName: 'Nabataean' },
  { scriptCode: 'Nkgb', scriptName: 'Naxi Geba' },
  { scriptCode: 'Nkoo', scriptName: 'N’Ko' },
  { scriptCode: 'Nshu', scriptName: 'Nüshu' },
  { scriptCode: 'Ogam', scriptName: 'Ogham' },
  { scriptCode: 'Olck', scriptName: 'Ol Chiki' },
  { scriptCode: 'Orkh', scriptName: 'Orkhon' },
  { scriptCode: 'Orya', scriptName: 'Oriya' },
  { scriptCode: 'Osma', scriptName: 'Osmanya' },
  { scriptCode: 'Palm', scriptName: 'Palmyrene' },
  { scriptCode: 'Perm', scriptName: 'Old Permic' },
  { scriptCode: 'Phag', scriptName: 'Phags-pa' },
  { scriptCode: 'Phli', scriptName: 'Inscriptional Pahlavi' },
  { scriptCode: 'Phlp', scriptName: 'Psalter Pahlavi' },
  { scriptCode: 'Phlv', scriptName: 'Book Pahlavi' },
  { scriptCode: 'Phnx', scriptName: 'Phoenician' },
  { scriptCode: 'Plrd', scriptName: 'Pollard Phonetic' },
  { scriptCode: 'Prti', scriptName: 'Inscriptional Parthian' },
  { scriptCode: 'Rjng', scriptName: 'Rejang' },
  { scriptCode: 'Roro', scriptName: 'Rongorongo' },
  { scriptCode: 'Runr', scriptName: 'Runic' },
  { scriptCode: 'Samr', scriptName: 'Samaritan' },
  { scriptCode: 'Sara', scriptName: 'Sarati' },
  { scriptCode: 'Sarb', scriptName: 'Old South Arabian' },
  { scriptCode: 'Saur', scriptName: 'Saurashtra' },
  { scriptCode: 'Sgnw', scriptName: 'SignWriting' },
  { scriptCode: 'Shaw', scriptName: 'Shavian' },
  { scriptCode: 'Shrd', scriptName: 'Sharada' },
  { scriptCode: 'Sind', scriptName: 'Khudawadi' },
  { scriptCode: 'Sinh', scriptName: 'Sinhala' },
  { scriptCode: 'Sora', scriptName: 'Sora Sompeng' },
  { scriptCode: 'Sund', scriptName: 'Sundanese' },
  { scriptCode: 'Sylo', scriptName: 'Syloti Nagri' },
  { scriptCode: 'Syrc', scriptName: 'Syriac' },
  { scriptCode: 'Syre', scriptName: 'Estrangelo Syriac' },
  { scriptCode: 'Syrj', scriptName: 'Western Syriac' },
  { scriptCode: 'Syrn', scriptName: 'Eastern Syriac' },
  { scriptCode: 'Tagb', scriptName: 'Tagbanwa' },
  { scriptCode: 'Takr', scriptName: 'Takri' },
  { scriptCode: 'Tale', scriptName: 'Tai Le' },
  { scriptCode: 'Talu', scriptName: 'New Tai Lue' },
  { scriptCode: 'Taml', scriptName: 'Tamil' },
  { scriptCode: 'Tang', scriptName: 'Tangut' },
  { scriptCode: 'Tavt', scriptName: 'Tai Viet' },
  { scriptCode: 'Telu', scriptName: 'Telugu' },
  { scriptCode: 'Teng', scriptName: 'Tengwar' },
  { scriptCode: 'Tfng', scriptName: 'Tifinagh' },
  { scriptCode: 'Tglg', scriptName: 'Tagalog' },
  { scriptCode: 'Thaa', scriptName: 'Thaana' },
  { scriptCode: 'Thai', scriptName: 'Thai' },
  { scriptCode: 'Tibt', scriptName: 'Tibetan' },
  { scriptCode: 'Tirh', scriptName: 'Tirhuta' },
  { scriptCode: 'Ugar', scriptName: 'Ugaritic' },
  { scriptCode: 'Vaii', scriptName: 'Vai' },
  { scriptCode: 'Visp', scriptName: 'Visible Speech' },
  { scriptCode: 'Wara', scriptName: 'Varang Kshiti' },
  { scriptCode: 'Wole', scriptName: 'Woleai' },
  { scriptCode: 'Xpeo', scriptName: 'Old Persian' },
  { scriptCode: 'Xsux', scriptName: 'Sumero-Akkadian Cuneiform' },
  { scriptCode: 'Yiii', scriptName: 'Yi' },
  { scriptCode: 'Zmth', scriptName: 'Mathematical Notation' },
  { scriptCode: 'Zsym', scriptName: 'Symbols' }
];

/**
 * The generic font families supported by the Font Settings Extension API.
 * @const
 */
advancedFonts.FAMILIES = [
  'standard',
  'sansserif',
  'serif',
  'fixed',
  'cursive',
  'fantasy'
];

/**
 * Sample texts.
 * @const
 */
advancedFonts.SAMPLE_TEXTS = {
  // "Cyrllic script".
  Cyrl: 'Кириллица',
  Hang: '정 참판 양반댁 규수 큰 교자 타고 혼례 치른 날.',
  Hans: '床前明月光，疑是地上霜。举头望明月，低头思故乡。',
  Hant: '床前明月光，疑是地上霜。舉頭望明月，低頭思故鄉。',
  Jpan: '吾輩は猫である。名前はまだ無い。',
  // "Khmer language".
  Khmr: '\u1797\u17B6\u179F\u17B6\u1781\u17D2\u1798\u17C2\u179A',
  Zyyy: 'The quick brown fox jumps over the lazy dog.'
};

/**
 * Controller of pending changes.
 * @const
 */
advancedFonts.pendingChanges = new PendingChanges();

/**
 * Map from |genericFamily| to UI controls and data for its font setting.
 */
advancedFonts.fontSettings = null;

/**
 * Map from |fontSizeKey| to UI controls and data for its font size setting.
 */
advancedFonts.fontSizeSettings = null;

/**
 * Gets the font size used for |fontSizeKey|, including pending changes. Calls
 * |callback| with the result.
 *
 * @param {string} fontSizeKey The font size setting key. See
 *     PendingChanges.getFontSize().
 * @param {function(number, boolean)} callback The callback of form
 *     function(size, controllable). |size| is the effective setting,
 *     |controllable| is whether the setting can be set.
 */
advancedFonts.getEffectiveFontSize = function (fontSizeKey, callback) {
  advancedFonts.fontSizeSettings[fontSizeKey].getter({}, function (details) {
    let controllable = advancedFonts.isControllableLevel(
      details.levelOfControl
    );
    let size = details.pixelSize;
    let pendingFontSize = advancedFonts.pendingChanges.getFontSize(fontSizeKey);
    // If the setting is not controllable, we can have no pending change.
    if (!controllable) {
      if (pendingFontSize != null) {
        advancedFonts.pendingChanges.setFontSize(fontSizeKey, null);
        $('apply-settings').disabled = advancedFonts.pendingChanges.isEmpty();
        pendingFontSize = null;
      }
    }

    // If we have a pending change, it overrides the current setting.
    if (pendingFontSize != null) size = pendingFontSize;
    callback(size, controllable);
  });
};

/**
 * Gets the font used for |script| and |genericFamily|, including pending
 * changes. Calls |callback| with the result.
 *
 * @param {string} script The script code.
 * @param {string} genericFamily The generic family.
 * @param {function(string, boolean, string)} callback The callback of form
 *     function(font, controllable, effectiveFont). |font| is the setting
 *     (pending or not), |controllable| is whether the setting can be set,
 *     |effectiveFont| is the font used taking fallback into consideration.
 */
advancedFonts.getEffectiveFont = function (script, genericFamily, callback) {
  let pendingChanges = advancedFonts.pendingChanges;
  let details = { script: script, genericFamily: genericFamily };
  chrome.fontSettings.getFont(details, function (result) {
    let setting = {};
    setting.font = result.fontId;
    setting.controllable = advancedFonts.isControllableLevel(
      result.levelOfControl
    );
    let pendingFont = pendingChanges.getFont(
      details.script,
      details.genericFamily
    );
    // If the setting is not controllable, we can have no pending change.
    if (!setting.controllable) {
      if (pendingFont != null) {
        pendingChanges.setFont(script, genericFamily, null);
        $('apply-settings').disabled = advancedFonts.pendingChanges.isEmpty();
        pendingFont = null;
      }
    }

    // If we have a pending change, it overrides the current setting.
    if (pendingFont != null) setting.font = pendingFont;

    // If we have a font, we're done.
    if (setting.font) {
      callback(setting.font, setting.controllable, setting.font);
      return;
    }

    // If we're still here, we have to fallback to common script, unless this
    // already is common script.
    if (script == advancedFonts.COMMON_SCRIPT) {
      callback('', setting.controllable, '');
      return;
    }
    advancedFonts.getEffectiveFont(
      advancedFonts.COMMON_SCRIPT,
      genericFamily,
      callback.bind(null, setting.font, setting.controllable)
    );
  });
};

/**
 * Refreshes the UI controls related to a font setting.
 *
 * @param {{fontList: HTMLSelectElement, samples: Array<HTMLElement>}}
 *     fontSetting The setting object (see advancedFonts.fontSettings).
 * @param {string} font The value of the font setting.
 * @param {boolean} controllable Whether the font setting can be controlled
 *     by this extension.
 * @param {string} effectiveFont The font used, including fallback to Common
 *     script.
 */
advancedFonts.refreshFont = function (
  fontSetting,
  font,
  controllable,
  effectiveFont
) {
  for (let i = 0; i < fontSetting.samples.length; ++i)
    fontSetting.samples[i].style.fontFamily = effectiveFont;
  advancedFonts.setSelectedFont(fontSetting.fontList, font);
  fontSetting.fontList.disabled = !controllable;
};

/**
 * Refreshes the UI controls related to a font size setting.
 *
 * @param {{label: HTMLElement, slider: Slider, samples: Array<HTMLElement>}}
 *     fontSizeSetting The setting object (see advancedFonts.fontSizeSettings).
 * @param size The value of the font size setting.
 * @param controllable Whether the setting can be controlled by this extension.
 */
advancedFonts.refreshFontSize = function (fontSizeSetting, size, controllable) {
  fontSizeSetting.label.textContent = 'Size: ' + size + 'px';
  advancedFonts.setFontSizeSlider(fontSizeSetting.slider, size, controllable);
  for (let i = 0; i < fontSizeSetting.samples.length; ++i)
    fontSizeSetting.samples[i].style.fontSize = size + 'px';
};

/**
 * Refreshes all UI controls to reflect the current settings, including pending
 * changes.
 */
advancedFonts.refresh = function () {
  let script = advancedFonts.getSelectedScript();
  let sample;
  if (advancedFonts.SAMPLE_TEXTS[script])
    sample = advancedFonts.SAMPLE_TEXTS[script];
  else sample = advancedFonts.SAMPLE_TEXTS[advancedFonts.COMMON_SCRIPT];
  let sampleTexts = document.querySelectorAll('.sample-text-span');
  for (let i = 0; i < sampleTexts.length; i++)
    sampleTexts[i].textContent = sample;

  let setting;
  let callback;
  for (let genericFamily in advancedFonts.fontSettings) {
    setting = advancedFonts.fontSettings[genericFamily];
    callback = advancedFonts.refreshFont.bind(null, setting);
    advancedFonts.getEffectiveFont(script, genericFamily, callback);
  }

  for (let fontSizeKey in advancedFonts.fontSizeSettings) {
    setting = advancedFonts.fontSizeSettings[fontSizeKey];
    callback = advancedFonts.refreshFontSize.bind(null, setting);
    advancedFonts.getEffectiveFontSize(fontSizeKey, callback);
  }

  $('apply-settings').disabled = advancedFonts.pendingChanges.isEmpty();
};

/**
 * @return {string} The currently selected script code.
 */
advancedFonts.getSelectedScript = function () {
  let scriptList = $('scriptList');
  return scriptList.options[scriptList.selectedIndex].value;
};

/**
 * @param {HTMLSelectElement} fontList The <select> containing a list of fonts.
 * @return {string} The currently selected value of |fontList|.
 */
advancedFonts.getSelectedFont = function (fontList) {
  return fontList.options[fontList.selectedIndex].value;
};

/**
 * Populates the font lists.
 * @param {Array<{fontId: string, displayName: string>} fonts The list of
 *     fonts on the system.
 */
advancedFonts.populateFontLists = function (fonts) {
  for (let genericFamily in advancedFonts.fontSettings) {
    let list = advancedFonts.fontSettings[genericFamily].fontList;

    // Add a special item to indicate fallback to the non-per-script
    // font setting. The Font Settings API uses the empty string to indicate
    // fallback.
    let defaultItem = document.createElement('option');
    defaultItem.value = '';
    defaultItem.text = '(Use default)';
    list.add(defaultItem);

    for (let i = 0; i < fonts.length; ++i) {
      let item = document.createElement('option');
      item.value = fonts[i].fontId;
      item.text = fonts[i].displayName;
      list.add(item);
    }
  }
  advancedFonts.refresh();
};

/**
 * Handles change events on a <select> element for a font setting.
 * @param {string} genericFamily The generic family for the font setting.
 * @param {Event} event The change event.
 */
advancedFonts.handleFontListChange = function (genericFamily, event) {
  let script = advancedFonts.getSelectedScript();
  let font = advancedFonts.getSelectedFont(event.target);

  advancedFonts.pendingChanges.setFont(script, genericFamily, font);
  advancedFonts.refresh();
};

/**
 * Sets the selected value of |fontList| to |fontId|.
 * @param {HTMLSelectElement} fontList The <select> containing a list of fonts.
 * @param {string} fontId The font to set |fontList|'s selection to.
 */
advancedFonts.setSelectedFont = function (fontList, fontId) {
  let script = advancedFonts.getSelectedScript();
  let i;
  for (i = 0; i < fontList.length; i++) {
    if (fontId == fontList.options[i].value) {
      fontList.selectedIndex = i;
      break;
    }
  }
  if (i == fontList.length) {
    console.warn(
      "font '" +
        fontId +
        "' for " +
        fontList.id +
        ' for ' +
        script +
        ' is not on the system'
    );
  }
};

/**
 * Handles change events on a font size slider.
 * @param {string} fontSizeKey The key for the font size setting whose slider
 *     changed. See PendingChanges.getFont.
 * @param {string} value The new value of the slider.
 */
advancedFonts.handleFontSizeSliderChange = function (fontSizeKey, value) {
  let pixelSize = parseInt(value);
  if (!isNaN(pixelSize)) {
    advancedFonts.pendingChanges.setFontSize(fontSizeKey, pixelSize);
    advancedFonts.refresh();
  }
};

/**
 * @param {string} levelOfControl The level of control string for a setting,
 *     as returned by the Font Settings Extension API.
 * @return {boolean} True if |levelOfControl| signifies that the extension can
 *     control the setting; otherwise, returns false.
 */
advancedFonts.isControllableLevel = function (levelOfControl) {
  return (
    levelOfControl == 'controllable_by_this_extension' ||
    levelOfControl == 'controlled_by_this_extension'
  );
};

/*
 * Updates the specified font size slider's value and enabled property.
 * @param {Slider} slider The slider for a font size setting.
 * @param {number} size The value to set the slider to.
 * @param {boolean} enabled Whether to enable or disable the slider.
 */
advancedFonts.setFontSizeSlider = function (slider, size, enabled) {
  if (slider.getValue() != size) slider.setValue(size);
  let inputElement = slider.getInput();
  if (enabled) {
    inputElement.parentNode.classList.remove('disabled');
    inputElement.disabled = false;
  } else {
    inputElement.parentNode.classList.add('disabled');
    inputElement.disabled = true;
  }
};

/**
 * Initializes the UI control elements related to the font size setting
 * |fontSizeKey| and registers listeners for the user adjusting its slider and
 * the setting changing on the browser-side.
 * @param {string} fontSizeKey The key for font size setting. See
 *     PendingChanges.getFont().
 */
advancedFonts.initFontSizeSetting = function (fontSizeKey) {
  let fontSizeSettings = advancedFonts.fontSizeSettings;
  let setting = fontSizeSettings[fontSizeKey];
  let label = setting.label;
  let samples = setting.samples;

  setting.slider = new Slider(
    setting.sliderContainer,
    0,
    setting.minValue,
    setting.maxValue,
    advancedFonts.handleFontSizeSliderChange.bind(null, fontSizeKey)
  );

  let slider = setting.slider;
  setting.getter({}, function (details) {
    let size = details.pixelSize.toString();
    let controllable = advancedFonts.isControllableLevel(
      details.levelOfControl
    );
    advancedFonts.setFontSizeSlider(slider, size, controllable);
    for (let i = 0; i < samples.length; i++)
      samples[i].style.fontSize = size + 'px';
  });
  fontSizeSettings[fontSizeKey].onChanged.addListener(advancedFonts.refresh);
};

/**
 * Clears the font settings for the specified script.
 * @param {string} script The script code.
 */
advancedFonts.clearSettingsForScript = function (script) {
  advancedFonts.pendingChanges.clearOneScript(script);
  for (let i = 0; i < advancedFonts.FAMILIES.length; i++) {
    chrome.fontSettings.clearFont({
      script: script,
      genericFamily: advancedFonts.FAMILIES[i]
    });
  }
};

/**
 * Clears all font and font size settings.
 */
advancedFonts.clearAllSettings = function () {
  advancedFonts.pendingChanges.clear();
  for (let i = 0; i < advancedFonts.scripts.length; i++)
    advancedFonts.clearSettingsForScript(advancedFonts.scripts[i].scriptCode);
  chrome.fontSettings.clearDefaultFixedFontSize();
  chrome.fontSettings.clearDefaultFontSize();
  chrome.fontSettings.clearMinimumFontSize();
};

/**
 * Closes the overlay.
 */
advancedFonts.closeOverlay = function () {
  $('overlay-container').hidden = true;
};

/**
 * Import a JSON file of existing font settings
 */
advancedFonts.importSettings = function () {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.json'; // Only allow JSON files

  // Set the event listener for file selection
  fileInput.addEventListener('change', handleFileSelection);

  function handleFileSelection(event) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      if (selectedFile.type === 'application/json') {
        const reader = new FileReader();

        reader.onload = function (e) {
          const jsonContent = e.target.result;

          try {
            const parsedConfig = JSON.parse(jsonContent);

            advancedFonts.applyImportedSettings(parsedConfig);
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        };

        reader.readAsText(selectedFile);
      } else {
        console.error('Please select a valid JSON file.');
      }
    }
  }

  fileInput.click();
};

const isNumeric = function (key, config) {
  if (key in config) {
    if (typeof config[key] === 'number') {
      return true;
    } else {
      console.error(
        `Invalid value for ${key}. It needs to be an integer, recieved ${typeof config[
          key
        ]}`
      );
      return false;
    }
  } else {
    console.error(`${key} not found in config.`);
    return false;
  }
};

advancedFonts.applyImportedSettings = async function (config) {
  if (isNumeric('defaultFixedFontSize', config)) {
    await chrome.fontSettings.setDefaultFixedFontSize({
      pixelSize: config.defaultFixedFontSize
    });
  }
  if (isNumeric('minimumFontSize', config)) {
    await chrome.fontSettings.setMinimumFontSize({
      pixelSize: config.minimumFontSize
    });
  }
  if (isNumeric('defaultFontSize', config)) {
    await chrome.fontSettings.setDefaultFontSize({
      pixelSize: config.minimumFontSize
    });
  }

  config.configuredFonts.forEach(({ script, scriptData }) => {
    scriptData.forEach(async ({ fontId, genericFamily }) => {
      await chrome.fontSettings.setFont({
        fontId,
        genericFamily,
        script
      });
    });
  });
};

/**
 * Export a JSON file of the current font settings;
 */
advancedFonts.exportSettings = async function () {
  const settings = await advancedFonts.getCurrentSettings();
  const blob = new Blob([JSON.stringify(settings)], {
    type: 'application/json'
  });
  const blobUrl = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = blobUrl;
  downloadLink.download = `"Advanced_Font_Settings_Data.v${SETTINGS_VERSION}".json`;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(blobUrl);
};

/**
 * Generate a JSON object that represents all of the font settings data
 */
advancedFonts.getCurrentSettings = async function () {
  const configuredFonts = [
    ...(await Promise.all(
      // iterate over every script (i.e. language code - "Cyrl", "Hebr", etc)
      advancedFonts.scripts.map(async (scriptInfo) => {
        const script = scriptInfo.scriptCode;

        // for each script, we also iterage over any font that is configured for any generic value (e.g. "fixed", "sansserif", etc)
        let scriptData = [
          ...(await Promise.all(
            advancedFonts.FAMILIES.map(async (genericFamily) => {
              const { fontId } = await chrome.fontSettings.getFont({
                genericFamily,
                script
              });

              return {
                genericFamily,
                fontId
              };
            })
          ))
        ]
          .filter((entry) => {
            // any entry that is blank hasnt been configured, so no need to include it
            return entry.fontId !== '';
          })
          .map(({ fontId, genericFamily }) => {
            // filter the output to only the data we care about
            return {
              fontId,
              genericFamily
            };
          });

        return {
          script,
          scriptData
        };
      })
    ))
  ].filter((entry) => {
    // remove any script that has no scriptData, in order to reduce our file size
    return entry.scriptData.length > 0;
  });

  const defaultFixedFontSize = (
    await chrome.fontSettings.getDefaultFixedFontSize()
  ).pixelSize;
  const minimumFontSize = (await chrome.fontSettings.getMinimumFontSize())
    .pixelSize;
  const defaultFontSize = (await chrome.fontSettings.getDefaultFontSize())
    .pixelSize;

  return {
    defaultFixedFontSize,
    defaultFontSize,
    minimumFontSize,
    configuredFonts,
    _version: SETTINGS_VERSION
  };
};

/**
 * Initializes apply and reset buttons.
 */
advancedFonts.initApplyAndResetButtons = function () {
  let applyButton = $('apply-settings');
  applyButton.addEventListener('click', function () {
    advancedFonts.pendingChanges.apply();
    advancedFonts.refresh();
  });

  let overlay = $('overlay-container');
  cr.ui.overlay.globalInitialization();
  cr.ui.overlay.setupOverlay(overlay);
  overlay.addEventListener('cancelOverlay', advancedFonts.closeOverlay);

  $('reset-this-script-button').onclick = function (event) {
    let scriptList = $('scriptList');
    let scriptName = scriptList.options[scriptList.selectedIndex].text;
    $('reset-this-script-overlay-dialog-content').innerText =
      'Are you sure you want to reset settings for ' + scriptName + ' script?';

    $('overlay-container').hidden = false;
    $('reset-this-script-overlay-dialog').hidden = false;
    $('reset-all-scripts-overlay-dialog').hidden = true;
  };
  $('reset-this-script-ok').onclick = function (event) {
    advancedFonts.clearSettingsForScript(advancedFonts.getSelectedScript());
    advancedFonts.closeOverlay();
    advancedFonts.refresh();
  };
  $('reset-this-script-cancel').onclick = advancedFonts.closeOverlay;

  $('reset-all-button').onclick = function (event) {
    $('overlay-container').hidden = false;
    $('reset-all-scripts-overlay-dialog').hidden = false;
    $('reset-this-script-overlay-dialog').hidden = true;
  };
  $('reset-all-ok').onclick = function (event) {
    advancedFonts.clearAllSettings();
    advancedFonts.closeOverlay();
    advancedFonts.refresh();
  };
  $('reset-all-cancel').onclick = advancedFonts.closeOverlay;

  $('import-settings').onclick = advancedFonts.importSettings;
  $('export-settings').onclick = advancedFonts.exportSettings;
};

/**
 * Best guess for system fonts, taken from the IDS_WEB_FONT_FAMILY strings in
 * Chrome.
 * TODO: The font should be localized like Chrome does.
 * @const
 */
advancedFonts.systemFonts = {
  cros: 'Noto Sans UI, sans-serif',
  linux: 'Ubuntu, sans-serif',
  mac: 'Lucida Grande, sans-serif',
  win: 'Segoe UI, Tahoma, sans-serif',
  unknown: 'sans-serif'
};

/**
 * @return {string} The platform this extension is running on.
 */
advancedFonts.getPlatform = function () {
  let ua = window.navigator.appVersion;
  if (ua.indexOf('Win') != -1) return 'win';
  if (ua.indexOf('Mac') != -1) return 'mac';
  if (ua.indexOf('Linux') != -1) return 'linux';
  if (ua.indexOf('CrOS') != -1) return 'cros';
  return 'unknown';
};

/**
 * Chrome settings tries to use the system font. So does this extension.
 */
advancedFonts.useSystemFont = function () {
  document.body.style.fontFamily =
    advancedFonts.systemFonts[advancedFonts.getPlatform()];
};

/**
 * Sorts the list of script codes by scriptName. Someday this extension will
 * have localized script names, so the order will depend on locale.
 */
advancedFonts.sortScripts = function () {
  let i;
  let scripts = advancedFonts.scripts;
  for (i = 0; i < scripts; ++i) {
    if (scripts[i].scriptCode == advancedFonts.COMMON_SCRIPT) break;
  }
  let defaultScript = scripts.splice(i, 1)[0];

  scripts.sort(function (a, b) {
    if (a.scriptName > b.scriptName) return 1;
    if (a.scriptName < b.scriptName) return -1;
    return 0;
  });

  scripts.unshift(defaultScript);
};

/**
 * Initializes UI controls for font settings.
 */
advancedFonts.initFontControls = function () {
  advancedFonts.fontSettings = {
    standard: {
      fontList: $('standardFontList'),
      samples: [$('standardFontSample'), $('minFontSample')]
    },
    serif: {
      fontList: $('serifFontList'),
      samples: [$('serifFontSample')]
    },
    sansserif: {
      fontList: $('sansSerifFontList'),
      samples: [$('sansSerifFontSample')]
    },
    fixed: {
      fontList: $('fixedFontList'),
      samples: [$('fixedFontSample')]
    }
  };

  for (let genericFamily in advancedFonts.fontSettings) {
    let list = advancedFonts.fontSettings[genericFamily].fontList;
    list.addEventListener(
      'change',
      advancedFonts.handleFontListChange.bind(list, genericFamily)
    );
  }
  chrome.fontSettings.onFontChanged.addListener(advancedFonts.refresh);
  chrome.fontSettings.getFontList(advancedFonts.populateFontLists);
};

/**
 * Initializes UI controls for font size settings.
 */
advancedFonts.initFontSizeControls = function () {
  advancedFonts.fontSizeSettings = {
    defaultFontSize: {
      sliderContainer: $('defaultFontSizeSliderContainer'),
      minValue: 6,
      maxValue: 50,
      samples: [
        $('standardFontSample'),
        $('serifFontSample'),
        $('sansSerifFontSample')
      ],
      label: $('defaultFontSizeLabel'),
      getter: chrome.fontSettings.getDefaultFontSize,
      onChanged: chrome.fontSettings.onDefaultFontSizeChanged
    },
    defaultFixedFontSize: {
      sliderContainer: $('defaultFixedFontSizeSliderContainer'),
      minValue: 6,
      maxValue: 50,
      samples: [$('fixedFontSample')],
      label: $('fixedFontSizeLabel'),
      getter: chrome.fontSettings.getDefaultFixedFontSize,
      onChanged: chrome.fontSettings.onDefaultFixedFontSizeChanged
    },
    minFontSize: {
      sliderContainer: $('minFontSizeSliderContainer'),
      minValue: 6,
      maxValue: 24,
      samples: [$('minFontSample')],
      label: $('minFontSizeLabel'),
      getter: chrome.fontSettings.getMinimumFontSize,
      onChanged: chrome.fontSettings.onMinimumFontSizeChanged
    }
  };

  for (let fontSizeKey in advancedFonts.fontSizeSettings)
    advancedFonts.initFontSizeSetting(fontSizeKey);
};

/**
 * Initializes the list of scripts.
 */
advancedFonts.initScriptList = function () {
  let scriptList = $('scriptList');
  advancedFonts.sortScripts();
  let scripts = advancedFonts.scripts;
  for (let i = 0; i < scripts.length; i++) {
    let script = document.createElement('option');
    script.value = scripts[i].scriptCode;
    script.text = scripts[i].scriptName;
    scriptList.add(script);
  }
  scriptList.selectedIndex = 0;
  scriptList.addEventListener('change', advancedFonts.refresh);
};

/**
 * Initializes the extension.
 */
advancedFonts.init = function () {
  advancedFonts.useSystemFont();

  advancedFonts.initFontControls();
  advancedFonts.initFontSizeControls();
  advancedFonts.initScriptList();

  advancedFonts.initApplyAndResetButtons();
};

document.addEventListener('DOMContentLoaded', advancedFonts.init);
