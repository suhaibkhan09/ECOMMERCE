import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiSun,
  FiMoon,
  FiMonitor,
  FiCheck,
  FiSliders,
  FiEye,
  FiRotateCcw,
} from 'react-icons/fi';
import {
  selectThemePreferences,
  setThemeMode,
  setAccentColor,
  setFontSize,
  toggleHighContrast,
  toggleReducedMotion,
  toggleCustomizerModal,
  resetThemePreferences,
  ACCENT_PALETTES,
} from '../../store/themeSlice';
import toast from 'react-hot-toast';

const ThemeCustomizerModal = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectThemePreferences);
  const isOpen = useSelector((state) => state.theme?.isCustomizerOpen || false);

  if (!isOpen) return null;

  const handleReset = () => {
    dispatch(resetThemePreferences());
    toast.success('Theme preferences reset to default');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => dispatch(toggleCustomizerModal(false))}
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-10"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <FiSliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Display & Accessibility
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Customize theme colors, contrast, and font scaling
                </p>
              </div>
            </div>

            <button
              onClick={() => dispatch(toggleCustomizerModal(false))}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Color Mode Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Interface Mode
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'light', label: 'Light', icon: FiSun },
                  { key: 'dark', label: 'Dark', icon: FiMoon },
                  { key: 'system', label: 'System', icon: FiMonitor },
                ].map(({ key, label, icon: Icon }) => {
                  const isSelected = theme.mode === key;
                  return (
                    <button
                      key={key}
                      onClick={() => dispatch(setThemeMode(key))}
                      className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-xs font-semibold transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 shadow-xs'
                          : 'border-gray-200 dark:border-gray-750 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="w-5 h-5 mb-1.5" />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accent Theme Color */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Accent Theme Color
              </label>
              <div className="grid grid-cols-5 gap-2.5">
                {Object.entries(ACCENT_PALETTES).map(([key, palette]) => {
                  const isSelected = theme.accent === key;
                  return (
                    <button
                      key={key}
                      onClick={() => dispatch(setAccentColor(key))}
                      className={`group flex flex-col items-center p-2 rounded-2xl border transition-all ${
                        isSelected
                          ? 'border-gray-900 dark:border-white shadow-sm ring-2 ring-gray-900/10 dark:ring-white/10'
                          : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl ${palette.swatch} flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105`}
                      >
                        {isSelected && <FiCheck className="w-4 h-4 stroke-[3]" />}
                      </div>
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1.5 font-medium text-center truncate w-full">
                        {palette.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Font Size Scaling */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Reading Text Size
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'sm', label: 'Compact', desc: '15px' },
                  { key: 'md', label: 'Standard', desc: '16px' },
                  { key: 'lg', label: 'Large', desc: '17px' },
                ].map(({ key, label, desc }) => {
                  const isSelected = theme.fontSize === key;
                  return (
                    <button
                      key={key}
                      onClick={() => dispatch(setFontSize(key))}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400'
                          : 'border-gray-200 dark:border-gray-750 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className="font-semibold text-xs">{label}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accessibility Toggles */}
            <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-gray-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Accessibility Enhancements
              </label>

              {/* High Contrast */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-750">
                <div className="flex items-center gap-3">
                  <FiEye className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-xs font-semibold text-gray-900 dark:text-white">
                      High Contrast Mode
                    </div>
                    <div className="text-[11px] text-gray-400">
                      Sharpen borders and maximize text contrast
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={theme.highContrast}
                  onChange={() => dispatch(toggleHighContrast())}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                />
              </div>

              {/* Reduced Motion */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-750">
                <div className="flex items-center gap-3">
                  <FiSliders className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-xs font-semibold text-gray-900 dark:text-white">
                      Reduce Animations
                    </div>
                    <div className="text-[11px] text-gray-400">
                      Minimize transition movements and layout shifts
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={theme.reducedMotion}
                  onChange={() => dispatch(toggleReducedMotion())}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 px-6 bg-gray-50 dark:bg-gray-850 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              <FiRotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={() => dispatch(toggleCustomizerModal(false))}
              className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
            >
              Apply & Close
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThemeCustomizerModal;
