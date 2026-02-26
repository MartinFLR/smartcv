// =================== SmartCV Extension - Popup Script ===================
'use strict';

import {
  CvForm,
  CvPayload,
  CoverLetterPayload,
  PromptLanguage,
  TemperatureLevel,
  ToneLevel,
  DeliveryChannel,
} from '@smartcv/types';
import { AI_MODELS_DATA } from '@smartcv/shared';
import sharedEs from '../../frontend/public/assets/i18n/es.json';
import sharedEn from '../../frontend/public/assets/i18n/en.json';
import packageJson from '../../../package.json';

// =================== I18N TRANSLATIONS ===================
const EXTENSION_I18N = {
  spanish: {
    // Settings
    'settings.serverUrl': 'URL del Servidor',
    'settings.save': 'Guardar',
    'settings.connected': '✓ Conectado',
    'settings.error': '✕ Error de conexión',
    'settings.lang': 'Idioma',
    'settings.provider': 'Proveedor IA',
    'settings.model': 'Modelo',
    // Selectors
    profile: 'Perfil',
    template: 'Plantilla',
    'template.harvard': 'Harvard (Clásico)',
    'template.creative': 'Creative (Moderno)',
    // Tabs
    'tab.cv': '⚡ Optimizar CV',
    'tab.cover': '📝 Carta de Presentación',
    // CV tab
    'cv.jobDesc': 'Descripción del Puesto',
    'cv.jobDesc.placeholder':
      'Seleccioná texto en una publicación de empleo y hacé clic derecho → "Enviar a SmartCV", o pegá la descripción acá...',
    'cv.captured': 'Capturado de la página',
    'cv.characters': 'caracteres',
    'cv.clear': '✕ Limpiar',
    'cv.generate': 'Optimizar CV',
    'cv.download': 'Descargar PDF',
    'cv.editInApp': 'Editar en SmartCV',
    'cv.copyJson': 'Copiar JSON',
    'cv.newGeneration': 'Nueva Generación',
    // Cover letter tab
    'cover.copy': 'Copiar',
    // Status
    'status.loading.profile': 'Cargando perfil...',
    'status.loading.generating': 'Generando con',
    'status.loading.processing': 'Procesando respuesta...',
    'status.loading.cover': 'Generando carta de presentación...',
    'status.loading.streaming': 'Streaming con',
    'status.success.cv': '¡CV generado exitosamente!',
    'status.success.cover': '¡Carta generada!',
    'status.success.pdf': '¡PDF descargado!',
    'status.success.sent': '¡CV enviado a SmartCV!',
    'status.error.profile': 'Perfil no encontrado. Intentá recargar.',
    'status.error.profiles': '⚠ Error cargando perfiles',
    'status.error.noProfiles': 'No se encontraron perfiles',
    'status.error.copy': 'Error al copiar',
    'status.copied': '✓ ¡Copiado!',
    // Preview
    'preview.title': 'Vista previa del CV generado',
    'preview.generated': 'Generado',
    'preview.justNow': 'recién',
    'preview.summary': 'Perfil',
    'preview.experience': 'Experiencia',
    'preview.skills': 'Habilidades',
    // Footer
    'footer.version': `SmartCV Extension v${packageJson.version}`,
    'footer.open': 'Abrir SmartCV ↗',
  },
  english: {
    // Settings
    'settings.serverUrl': 'Server URL',
    'settings.save': 'Save',
    'settings.connected': '✓ Connected',
    'settings.error': '✕ Connection failed',
    'settings.lang': 'Language',
    'settings.provider': 'AI Provider',
    'settings.model': 'Model',
    // Selectors
    profile: 'Profile',
    template: 'Template',
    'template.harvard': 'Harvard (Classic)',
    'template.creative': 'Creative (Modern)',
    // Tabs
    'tab.cv': '⚡ Optimize CV',
    'tab.cover': '📝 Cover Letter',
    // CV tab
    'cv.jobDesc': 'Job Description',
    'cv.jobDesc.placeholder':
      'Select text on a job listing and right-click → "Send to SmartCV", or paste the job description here...',
    'cv.captured': 'Captured from page',
    'cv.characters': 'characters',
    'cv.clear': '✕ Clear',
    'cv.generate': 'Optimize CV',
    'cv.download': 'Download PDF',
    'cv.editInApp': 'Edit in SmartCV',
    'cv.copyJson': 'Copy JSON',
    'cv.newGeneration': 'New Generation',
    // Cover letter tab
    'cover.copy': 'Copy',
    // Status
    'status.loading.profile': 'Loading profile...',
    'status.loading.generating': 'Generating with',
    'status.loading.processing': 'Processing response...',
    'status.loading.cover': 'Generating cover letter...',
    'status.loading.streaming': 'Streaming with',
    'status.success.cv': 'CV generated successfully!',
    'status.success.cover': 'Cover letter generated!',
    'status.success.pdf': 'PDF downloaded!',
    'status.success.sent': 'CV sent to SmartCV!',
    'status.error.profile': 'Profile not found. Try reloading.',
    'status.error.profiles': '⚠ Error loading profiles',
    'status.error.noProfiles': 'No profiles found',
    'status.error.copy': 'Failed to copy',
    'status.copied': '✓ Copied!',
    // Preview
    'preview.title': 'Generated CV Preview',
    'preview.generated': 'Generated',
    'preview.justNow': 'just now',
    'preview.summary': 'Professional Summary',
    'preview.experience': 'Experience',
    'preview.skills': 'Skills',
    // Footer
    'footer.version': `SmartCV Extension v${packageJson.version}`,
    'footer.open': 'Open SmartCV ↗',
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getNestedValue(obj: any, path: string): string | undefined {
  if (!obj) return undefined;
  if (obj[path]) return obj[path];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return path.split('.').reduce((acc: any, part) => acc && acc[part], obj);
}

function t(key: string): string {
  // 1. Extension specific translations
  const localStr = EXTENSION_I18N[state.lang]?.[key] || EXTENSION_I18N.english[key];
  if (localStr) return localStr;

  // 2. Shared formatting translations
  const shared = state.lang === 'spanish' ? sharedEs : sharedEn;
  let sharedStr = getNestedValue(shared, key);
  if (!sharedStr && state.lang !== 'english') {
    sharedStr = getNestedValue(sharedEn, key);
  }

  return sharedStr || key;
}

// =================== AI MODELS DATA ===================
// Imported from @smartcv/shared

// =================== EXAGGERATION CONFIG ===================
const EXAGGERATION_LABELS = { 0: 'low', 1: 'medium', 2: 'high' };
const EXAGGERATION_TEMP = { 0: 'low', 1: 'medium', 2: 'high' };

// =================== COVER LETTER CONFIG ===================
const TONE_MAP: Record<number, ToneLevel> = {
  0: 'formal',
  1: 'enthusiast',
  2: 'casual',
  3: 'neutral',
  4: 'confident',
};
const CHANNEL_MAP: Record<number, DeliveryChannel> = {
  0: 'linkedinMessage',
  1: 'email',
  2: 'applicationForm',
  3: 'internalReferral',
};
const TONE_I18N_KEYS = [
  'cv.coverLetter.tone.formal.name',
  'cv.coverLetter.tone.enthusiast.name',
  'cv.coverLetter.tone.casual.name',
  'cv.coverLetter.tone.neutral.name',
  'cv.coverLetter.tone.confident.name',
];
const CHANNEL_I18N_KEYS = [
  'cv.coverLetter.deliveryChannel.linkedin.name',
  'cv.coverLetter.deliveryChannel.email.name',
  'cv.coverLetter.deliveryChannel.form.name',
  'cv.coverLetter.deliveryChannel.referral.name',
];

// =================== DOM ELEMENTS ===================
const elements = {
  githubBtn: document.getElementById('githubBtn') as HTMLAnchorElement | null,
  settingsBtn: document.getElementById('settingsBtn'),
  settingsPanel: document.getElementById('settingsPanel'),
  serverUrl: document.getElementById('serverUrl'),
  saveUrlBtn: document.getElementById('saveUrlBtn'),
  connectionStatus: document.getElementById('connectionStatus'),
  langSelect: document.getElementById('langSelect'),
  providerSelect: document.getElementById('providerSelect'),
  modelSelect: document.getElementById('modelSelect'),
  profileSelect: document.getElementById('profileSelect'),
  templateSelect: document.getElementById('templateSelect'),
  // CV Tab
  jobDesc: document.getElementById('jobDesc'),
  capturedBadge: document.getElementById('capturedBadge'),
  charCount: document.getElementById('charCount'),
  clearJobDescBtn: document.getElementById('clearJobDescBtn'),
  exaggerationSlider: document.getElementById('exaggerationSlider'),
  exaggerationBadge: document.getElementById('exaggerationBadge'),
  exaggerationDesc: document.getElementById('exaggerationDesc'),
  generateBtn: document.getElementById('generateBtn'),
  downloadBtn: document.getElementById('downloadBtn'),
  secondaryActions: document.getElementById('secondaryActions'),
  editInAppBtn: document.getElementById('editInAppBtn'),
  copyJsonBtn: document.getElementById('copyJsonBtn'),
  newGenerationBtn: document.getElementById('newGenerationBtn'),
  // Cover Letter Tab
  toneChips: document.getElementById('toneChips'),
  channelChips: document.getElementById('channelChips'),
  recruiterName: document.getElementById('recruiterName'),
  companyName: document.getElementById('companyName'),
  referralField: document.getElementById('referralField'),
  referralName: document.getElementById('referralName'),
  generateCoverBtn: document.getElementById('generateCoverBtn'),
  coverOutputSection: document.getElementById('coverOutputSection'),
  coverOutput: document.getElementById('coverOutput'),
  copyCoverBtn: document.getElementById('copyCoverBtn'),
  // Status / Preview
  statusArea: document.getElementById('statusArea'),
  statusIcon: document.getElementById('statusIcon'),
  statusText: document.getElementById('statusText'),
  progressBarFill: document.getElementById('progressBarFill'),
  previewSection: document.getElementById('previewSection'),
  previewContent: document.getElementById('previewContent'),
  generationInfo: document.getElementById('generationInfo'),
  openAppLink: document.getElementById('openAppLink'),
};

// =================== i18n LABEL TARGETS ===================
function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
  // Update chips
  updateChipsText(elements.toneChips, TONE_I18N_KEYS);
  updateChipsText(elements.channelChips, CHANNEL_I18N_KEYS);
  // Slider labels
  updateExaggerationUI(state.exaggeration);
  // Template options
  const templateOpts = elements.templateSelect.options;
  if (templateOpts[0]) templateOpts[0].text = t('template.harvard');
  if (templateOpts[1]) templateOpts[1].text = t('template.creative');
}

function updateChipsText(container, keys) {
  const chips = container.querySelectorAll('.chip');
  chips.forEach((chip, i) => {
    if (keys[i]) chip.textContent = t(keys[i]);
  });
}

// =================== STATE ===================
const state = {
  serverUrl: 'http://localhost:3000',
  profiles: [],
  selectedProfileId: null,
  generatedCvData: null,
  generatedAt: null,
  isGenerating: false,
  aiProvider: 'google',
  aiModel: 'gemini-2.0-flash',
  lang: 'spanish',
  exaggeration: 0,
  activeTab: 'cv',
  // Cover letter
  coverTone: 0,
  coverChannel: 0,
  coverLetter: '',
  isCoverGenerating: false,
};

// =================== INITIALIZATION ===================
document.addEventListener('DOMContentLoaded', init);

async function init() {
  const stored = await chromeStorageGet([
    'serverUrl',
    'selectedProfileId',
    'aiProvider',
    'aiModel',
    'selectedTemplate',
    'capturedJobDesc',
    'generatedCvData',
    'generatedAt',
    'exaggeration',
    'lang',
  ]);

  if (stored.serverUrl) {
    state.serverUrl = stored.serverUrl;
    elements.serverUrl.value = stored.serverUrl;
  }

  // Language
  if (stored.lang) {
    state.lang = stored.lang;
    elements.langSelect.value = stored.lang;
  }

  // Set AI provider/model
  if (stored.aiProvider) {
    state.aiProvider = stored.aiProvider;
    elements.providerSelect.value = stored.aiProvider;
  }
  populateModelSelect(state.aiProvider);
  if (stored.aiModel) {
    state.aiModel = stored.aiModel;
    elements.modelSelect.value = stored.aiModel;
  }

  // Set template
  if (stored.selectedTemplate) {
    elements.templateSelect.value = stored.selectedTemplate;
  }

  // Exaggeration
  if (stored.exaggeration != null) {
    state.exaggeration = parseInt(stored.exaggeration);
    elements.exaggerationSlider.value = state.exaggeration;
  }

  // Set captured job description
  if (stored.capturedJobDesc) {
    elements.jobDesc.value = stored.capturedJobDesc;
    elements.capturedBadge.classList.remove('hidden');
  }

  // Update app link
  elements.openAppLink.href = state.serverUrl.replace(':3000', ':4200');

  // Apply i18n texts
  applyI18n();

  // Load profiles
  await loadProfiles();

  if (stored.selectedProfileId) {
    elements.profileSelect.value = stored.selectedProfileId;
    state.selectedProfileId = stored.selectedProfileId;
  }

  // Restore generated CV
  if (stored.generatedCvData) {
    state.generatedCvData = stored.generatedCvData;
    state.generatedAt = stored.generatedAt || null;
    elements.downloadBtn.classList.remove('hidden');
    elements.secondaryActions.classList.remove('hidden');
    showPreview(state.generatedCvData);
    if (state.generatedAt) {
      elements.generationInfo.textContent = `${t('preview.generated')} ${formatTimeAgo(state.generatedAt)}`;
    }
  }

  setupEventListeners();
  updateCharCount();
  updateGenerateButton();
  updateCoverButton();
}

// =================== EVENT LISTENERS ===================
function setupEventListeners() {
  // Settings toggle
  elements.settingsBtn.addEventListener('click', () => {
    elements.settingsPanel.classList.toggle('hidden');
  });

  // Save URL
  elements.saveUrlBtn.addEventListener('click', async () => {
    state.serverUrl = elements.serverUrl.value.replace(/\/+$/, '');
    elements.openAppLink.href = state.serverUrl.replace(':3000', ':4200');
    await chromeStorageSet({ serverUrl: state.serverUrl });
    testConnection();
    loadProfiles();
  });

  // Language change
  elements.langSelect.addEventListener('change', async () => {
    state.lang = elements.langSelect.value;
    await chromeStorageSet({ lang: state.lang });
    applyI18n();
  });

  // AI Provider change
  elements.providerSelect.addEventListener('change', async () => {
    state.aiProvider = elements.providerSelect.value;
    populateModelSelect(state.aiProvider);
    state.aiModel = elements.modelSelect.value;
    await chromeStorageSet({ aiProvider: state.aiProvider, aiModel: state.aiModel });
  });

  // AI Model change
  elements.modelSelect.addEventListener('change', async () => {
    state.aiModel = elements.modelSelect.value;
    await chromeStorageSet({ aiModel: state.aiModel });
  });

  // Profile change
  elements.profileSelect.addEventListener('change', async () => {
    state.selectedProfileId = elements.profileSelect.value;
    await chromeStorageSet({ selectedProfileId: state.selectedProfileId });
    updateGenerateButton();
    updateCoverButton();
  });

  // Template change
  elements.templateSelect.addEventListener('change', async () => {
    await chromeStorageSet({ selectedTemplate: elements.templateSelect.value });
  });

  // Job description input (shared between both tabs)
  elements.jobDesc.addEventListener('input', () => {
    updateCharCount();
    updateGenerateButton();
    updateCoverButton();
    chromeStorageSet({ capturedJobDesc: elements.jobDesc.value });
  });

  // Clear job description
  elements.clearJobDescBtn.addEventListener('click', () => {
    elements.jobDesc.value = '';
    updateCharCount();
    updateGenerateButton();
    updateCoverButton();
    elements.capturedBadge.classList.add('hidden');
    chromeStorageSet({ capturedJobDesc: '' });
  });

  // Exaggeration slider
  elements.exaggerationSlider.addEventListener('input', () => {
    const val = parseInt(elements.exaggerationSlider.value);
    state.exaggeration = val;
    updateExaggerationUI(val);
    chromeStorageSet({ exaggeration: val });
  });

  // Generate CV
  elements.generateBtn.addEventListener('click', generateCv);

  // Download PDF
  elements.downloadBtn.addEventListener('click', downloadPdf);

  // Edit in App
  elements.editInAppBtn.addEventListener('click', sendToApp);

  // Copy JSON
  elements.copyJsonBtn.addEventListener('click', copyJsonToClipboard);

  // New Generation
  elements.newGenerationBtn.addEventListener('click', startNewGeneration);

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Cover letter: tone chips
  elements.toneChips.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    state.coverTone = parseInt(chip.dataset.value);
    elements.toneChips.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
  });

  // Cover letter: channel chips
  elements.channelChips.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    state.coverChannel = parseInt(chip.dataset.value);
    elements.channelChips.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    // Show/hide referral field
    if (state.coverChannel === 3) {
      elements.referralField.classList.remove('hidden');
    } else {
      elements.referralField.classList.add('hidden');
    }
  });

  // Generate cover letter
  elements.generateCoverBtn.addEventListener('click', generateCoverLetter);

  // Copy cover letter
  elements.copyCoverBtn.addEventListener('click', copyCoverLetter);

  // Open App link
  elements.openAppLink.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: elements.openAppLink.href });
  });
}

// =================== TAB SWITCHING ===================
function switchTab(tab) {
  state.activeTab = tab;
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  document.getElementById('tabCv').classList.toggle('active', tab === 'cv');
  document.getElementById('tabCover').classList.toggle('active', tab === 'cover');
}

// =================== PROFILES ===================
async function loadProfiles() {
  try {
    const response = await fetch(`${state.serverUrl}/api/profiles`);
    if (!response.ok) throw new Error('Failed to load profiles');
    state.profiles = await response.json();
    renderProfiles();
  } catch (err) {
    console.error('Error loading profiles:', err);
    elements.profileSelect.innerHTML = `<option value="">${t('status.error.profiles')}</option>`;
  }
}

function renderProfiles() {
  if (state.profiles.length === 0) {
    elements.profileSelect.innerHTML = `<option value="">${t('status.error.noProfiles')}</option>`;
    return;
  }
  elements.profileSelect.innerHTML = state.profiles
    .map((p) => {
      const jobTitle = p.data?.personalInfo?.job || 'No title';
      return `<option value="${p.id}">${p.name} — ${jobTitle}</option>`;
    })
    .join('');
  if (!state.selectedProfileId && state.profiles.length > 0) {
    state.selectedProfileId = state.profiles[0].id;
  }
  if (state.selectedProfileId) {
    elements.profileSelect.value = state.selectedProfileId;
  }
  updateGenerateButton();
  updateCoverButton();
}

// =================== CV GENERATION ===================
async function generateCv() {
  const profileId = elements.profileSelect.value;
  const jobDesc = elements.jobDesc.value.trim();
  if (!profileId || !jobDesc || state.isGenerating) return;

  state.isGenerating = true;
  elements.generateBtn.disabled = true;
  elements.generateBtn.classList.add('btn--loading');
  showStatus('loading', t('status.loading.profile'), 10);

  try {
    // Look up profile from local cache
    const profile = state.profiles.find((p) => p.id === profileId);
    if (!profile) throw new Error(t('status.error.profile'));
    showStatus(
      'loading',
      `${t('status.loading.generating')} ${state.aiProvider}/${state.aiModel}...`,
      30,
    );

    // Build payload matching CvPayload type
    const payload: CvPayload = {
      baseCv: profile.data,
      jobDesc: jobDesc,
      promptOption: {
        type: 'tailoredCv',
        temperature: EXAGGERATION_TEMP[state.exaggeration] as TemperatureLevel,
        lang: state.lang as PromptLanguage,
      },
    };

    const response = await fetch(`${state.serverUrl}/api/generate-cv`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Ai-Provider': state.aiProvider,
        'X-Ai-Model': state.aiModel,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Server error: ${response.status}`);
    }

    showStatus('loading', t('status.loading.processing'), 70);
    const cvResponse = await response.json();
    state.generatedCvData = mergeCvData(profile.data, cvResponse);
    showStatus('success', t('status.success.cv'), 100);

    // Persist
    state.generatedAt = new Date().toISOString();
    await chromeStorageSet({
      generatedCvData: state.generatedCvData,
      generatedAt: state.generatedAt,
    });

    elements.downloadBtn.classList.remove('hidden');
    elements.secondaryActions.classList.remove('hidden');
    elements.generationInfo.textContent = `${t('preview.generated')} ${t('preview.justNow')}`;
    showPreview(state.generatedCvData);
  } catch (err) {
    console.error('CV generation failed:', err);
    showStatus('error', `Error: ${err.message}`);
  } finally {
    state.isGenerating = false;
    elements.generateBtn.disabled = false;
    elements.generateBtn.classList.remove('btn--loading');
    updateGenerateButton();
  }
}

function mergeCvData(baseCv: CvForm, cvResponse: Partial<CvForm>): CvForm {
  const merged: CvForm = JSON.parse(JSON.stringify(baseCv));

  if (cvResponse.personalInfo) {
    merged.personalInfo = { ...merged.personalInfo, ...cvResponse.personalInfo };
  }
  if (cvResponse.profileSummary) {
    merged.personalInfo.profileSummary = cvResponse.profileSummary;
  }
  if (cvResponse.job) {
    merged.personalInfo.job = cvResponse.job;
  }

  if (cvResponse.experience?.length) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    merged.experience = cvResponse.experience.map((exp: any) => ({
      role: exp.role || '',
      company: exp.company || '',
      dateIn: exp.dateIn || null,
      dateFin: exp.dateFin || null,
      bullets: Array.isArray(exp.bullets) ? exp.bullets.join('\n') : exp.bullets || '',
    }));
  }
  if (cvResponse.projects?.length) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    merged.projects = cvResponse.projects.map((proj: any) => ({
      name: proj.name || '',
      subtitle: proj.subtitle || null,
      dateIn: proj.dateIn || null,
      dateFin: proj.dateFin || null,
      bullets: Array.isArray(proj.bullets) ? proj.bullets.join('\n') : proj.bullets || '',
    }));
  }
  if (cvResponse.education?.length) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    merged.education = cvResponse.education.map((edu: any) => ({
      title: edu.title || '',
      institution: edu.institution || '',
      dateIn: edu.dateIn || null,
      dateFin: edu.dateFin || null,
      bullets: Array.isArray(edu.bullets) ? edu.bullets.join('\n') : edu.bullets || '',
    }));
  }
  if (cvResponse.skills?.length) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    merged.skills = cvResponse.skills.map((sg: any) => ({
      skills: sg.skills || [],
      languages: sg.languages || [],
      certifications: sg.certifications || [],
      additional: sg.additional || [],
    }));
  }
  return merged;
}

// =================== COVER LETTER GENERATION ===================
async function generateCoverLetter() {
  const jobDesc = elements.jobDesc.value.trim(); // Shared job desc
  const profileId = elements.profileSelect.value;
  if (!jobDesc || !profileId || state.isCoverGenerating) return;

  state.isCoverGenerating = true;
  state.coverLetter = '';
  elements.generateCoverBtn.disabled = true;
  elements.generateCoverBtn.classList.add('btn--loading');
  elements.coverOutputSection.classList.remove('hidden');
  elements.coverOutput.textContent = '';
  elements.coverOutput.classList.add('streaming');
  showStatus('loading', t('status.loading.cover'), 20);

  try {
    // Look up profile from local cache
    const profile = state.profiles.find((p) => p.id === profileId);
    if (!profile) throw new Error(t('status.error.profile'));

    showStatus('loading', `${t('status.loading.streaming')} ${state.aiProvider}...`, 40);

    const payload: CoverLetterPayload = {
      baseCv: profile.data,
      jobDesc: jobDesc,
      promptOption: {
        type: 'coverLetter',
        lang: state.lang as PromptLanguage,
        tone: TONE_MAP[state.coverTone],
        deliveryChannel: CHANNEL_MAP[state.coverChannel],
        recruiterName: (elements.recruiterName as HTMLInputElement).value.trim() || undefined,
        companyName: (elements.companyName as HTMLInputElement).value.trim() || undefined,
        referralName: (elements.referralName as HTMLInputElement).value.trim() || undefined,
      },
    };

    const response = await fetch(`${state.serverUrl}/api/generate-cover-letter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Ai-Provider': state.aiProvider,
        'X-Ai-Model': state.aiModel,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    // Stream the response
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      state.coverLetter += chunk;
      elements.coverOutput.textContent = state.coverLetter;
      elements.coverOutput.scrollTop = elements.coverOutput.scrollHeight;
    }

    elements.coverOutput.classList.remove('streaming');
    showStatus('success', t('status.success.cover'), 100);
  } catch (err) {
    console.error('Cover letter generation failed:', err);
    showStatus('error', `Error: ${err.message}`);
    elements.coverOutput.classList.remove('streaming');
  } finally {
    state.isCoverGenerating = false;
    elements.generateCoverBtn.disabled = false;
    elements.generateCoverBtn.classList.remove('btn--loading');
    updateCoverButton();
  }
}

function copyCoverLetter() {
  if (!state.coverLetter) return;
  navigator.clipboard.writeText(state.coverLetter).then(() => {
    const origText = elements.copyCoverBtn.textContent;
    elements.copyCoverBtn.textContent = t('status.copied');
    setTimeout(() => {
      elements.copyCoverBtn.textContent = origText;
    }, 2000);
  });
}

// =================== UI HELPERS ===================
function populateModelSelect(provider) {
  const models = AI_MODELS_DATA[provider] || [];
  elements.modelSelect.innerHTML = '';
  models.forEach((model) => {
    const opt = document.createElement('option');
    opt.value = model;
    opt.textContent = model;
    elements.modelSelect.appendChild(opt);
  });
  if (models.length > 0) {
    state.aiModel = models[0];
  }
}

function updateCharCount() {
  elements.charCount.textContent = elements.jobDesc.value.length;
}

function updateGenerateButton() {
  const hasProfile = !!elements.profileSelect.value;
  const hasJobDesc = elements.jobDesc.value.trim().length > 10;
  elements.generateBtn.disabled = !hasProfile || !hasJobDesc || state.isGenerating;
}

function updateCoverButton() {
  const hasProfile = !!elements.profileSelect.value;
  const hasJobDesc = elements.jobDesc.value.trim().length > 10;
  elements.generateCoverBtn.disabled = !hasProfile || !hasJobDesc || state.isCoverGenerating;
}

function updateExaggerationUI(val) {
  const levelKey = EXAGGERATION_LABELS[val] as 'low' | 'medium' | 'high';
  elements.exaggerationBadge.textContent = t(`cv.ia.exaggeration.level.${levelKey}.name`);
  elements.exaggerationBadge.classList.toggle('high', val === 2);
  elements.exaggerationDesc.textContent = t(`cv.ia.exaggeration.level.${levelKey}.description`);
  // Highlight active label
  const labels = document.querySelectorAll('.slider-labels span');
  labels.forEach((label, i) => {
    const lk = EXAGGERATION_LABELS[i];
    label.textContent = t(`cv.ia.exaggeration.level.${lk}.name`);
    label.classList.toggle('active', i === val);
  });
}

function showStatus(type, message, progress) {
  elements.statusArea.classList.remove('hidden', 'status-area--success', 'status-area--error');
  elements.statusText.textContent = message;

  if (type === 'loading') {
    elements.statusIcon.className = 'spinner';
    elements.statusIcon.textContent = '';
    elements.statusIcon.style.color = '';
    elements.progressBarFill.style.width = `${progress || 0}%`;
  } else if (type === 'success') {
    elements.statusArea.classList.add('status-area--success');
    elements.statusIcon.className = '';
    elements.statusIcon.textContent = '✓';
    elements.statusIcon.style.color = 'var(--text-positive)';
    elements.progressBarFill.style.width = '100%';
    setTimeout(() => elements.statusArea.classList.add('hidden'), 4000);
  } else if (type === 'error') {
    elements.statusArea.classList.add('status-area--error');
    elements.statusIcon.className = '';
    elements.statusIcon.textContent = '✕';
    elements.statusIcon.style.color = 'var(--text-negative)';
    elements.progressBarFill.style.width = '0';
  }
}

// =================== PREVIEW ===================
function showPreview(cvData) {
  elements.previewSection.classList.remove('hidden');
  let html = '';

  if (cvData.personalInfo?.name) {
    html += `<h3>👤 ${escapeHtml(cvData.personalInfo.name)}</h3>`;
  }
  if (cvData.personalInfo?.job) {
    html += `<p style="color: var(--text-action); margin-bottom: 8px;">${escapeHtml(cvData.personalInfo.job)}</p>`;
  }
  if (cvData.personalInfo?.profileSummary) {
    html += `<h3>${t('preview.summary')}</h3>`;
    html += `<p>${escapeHtml(cvData.personalInfo.profileSummary).substring(0, 200)}...</p>`;
  }
  if (cvData.experience?.length) {
    html += `<h3>${t('preview.experience')} (${cvData.experience.length})</h3>`;
    cvData.experience.slice(0, 2).forEach((exp) => {
      html += `<p><strong>${escapeHtml(exp.role || '')}</strong> at ${escapeHtml(exp.company || '')}</p>`;
    });
    if (cvData.experience.length > 2) html += `<p>... +${cvData.experience.length - 2} more</p>`;
  }
  if (cvData.skills?.length) {
    for (const sg of cvData.skills) {
      if (!sg.skills?.length) continue;
      html += `<h3>${t('preview.skills')}</h3>`;
      html += `<p>${sg.skills.slice(0, 10).map(escapeHtml).join(' • ')}${sg.skills.length > 10 ? ' ...' : ''}</p>`;
    }
  }
  elements.previewContent.innerHTML = html;
}

// =================== SEND TO APP ===================
function sendToApp() {
  if (!state.generatedCvData) return;
  const frontendUrl = state.serverUrl.replace(':3000', ':4200');
  const cvDataJson = JSON.stringify(state.generatedCvData);
  const metaJson = JSON.stringify({
    isLocked: false,
    template: elements.templateSelect.value || 'harvard',
  });

  chrome.tabs.query({}, (tabs) => {
    const existingTab = tabs.find((t) => t.url && t.url.startsWith(frontendUrl));

    if (existingTab) {
      chrome.scripting.executeScript(
        {
          target: { tabId: existingTab.id },
          func: (dataJson, metJson) => {
            localStorage.setItem('angular-cv-data', dataJson);
            localStorage.setItem('angular-cv-meta', metJson);
          },
          args: [cvDataJson, metaJson],
        },
        () => {
          chrome.tabs.update(existingTab.id, { url: frontendUrl + '/cv', active: true });
          showStatus('success', t('status.success.sent'), 100);
        },
      );
    } else {
      chrome.tabs.create({ url: frontendUrl + '/cv', active: true }, (tab) => {
        const listener = (tabId, changeInfo) => {
          if (tabId === tab.id && changeInfo.status === 'loading') {
            chrome.scripting
              .executeScript({
                target: { tabId: tab.id },
                func: (dj, mj) => {
                  try {
                    localStorage.setItem('angular-cv-data', dj);
                    localStorage.setItem('angular-cv-meta', mj);
                  } catch (e) {
                    console.error('SmartCV inject failed', e);
                  }
                },
                args: [cvDataJson, metaJson],
                injectImmediately: true,
              })
              .catch((e) => {
                console.error(e);
              });
          }
          if (tabId === tab.id && changeInfo.status === 'complete') {
            chrome.tabs.onUpdated.removeListener(listener);
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              func: (dj, mj) => {
                if (localStorage.getItem('angular-cv-data') !== dj) {
                  localStorage.setItem('angular-cv-data', dj);
                  localStorage.setItem('angular-cv-meta', mj);
                  window.location.reload();
                }
              },
              args: [cvDataJson, metaJson],
            });
          }
        };
        chrome.tabs.onUpdated.addListener(listener);
        showStatus('success', t('status.success.sent'), 100);
      });
    }
  });
}

// =================== COPY JSON ===================
function copyJsonToClipboard() {
  if (!state.generatedCvData) return;
  navigator.clipboard
    .writeText(JSON.stringify(state.generatedCvData, null, 2))
    .then(() => {
      const span = elements.copyJsonBtn.querySelector('span');
      const original = span.textContent;
      span.textContent = t('status.copied');
      setTimeout(() => {
        span.textContent = original;
      }, 2000);
    })
    .catch((err) => {
      console.error('Copy failed:', err);
      showStatus('error', t('status.error.copy'));
    });
}

// =================== NEW GENERATION ===================
function startNewGeneration() {
  state.generatedCvData = null;
  state.generatedAt = null;
  elements.downloadBtn.classList.add('hidden');
  elements.secondaryActions.classList.add('hidden');
  elements.previewSection.classList.add('hidden');
  elements.statusArea.classList.add('hidden');
  chromeStorageSet({ generatedCvData: null, generatedAt: null });
  updateGenerateButton();
}

// =================== PDF DOWNLOAD ===================
function downloadPdf() {
  if (!state.generatedCvData) return;
  try {
    const template = elements.templateSelect.value || 'harvard';
    const translations = {
      summary: t('view.resume'),
      experience: t('view.experience'),
      projects: t('view.projects'),
      education: t('view.education'),
      skills: t('view.skills'),
      techSkills: t('view.tech'),
      languages: t('view.languages'),
      certifications: t('view.certifications'),
      additional: t('view.additional'),
      contact: t('view.contact'),
    };
    SmartCvPdfGenerator.downloadPdf(state.generatedCvData, template, translations);
    showStatus('success', t('status.success.pdf'), 100);
  } catch (err) {
    console.error('PDF download failed:', err);
    showStatus('error', `Error: ${err.message}`);
  }
}

// =================== CONNECTION TEST ===================
async function testConnection() {
  try {
    const response = await fetch(`${state.serverUrl}/api/config`);
    if (response.ok) {
      elements.connectionStatus.textContent = t('settings.connected');
      elements.connectionStatus.className = 'status-badge status-badge--connected';
    } else {
      throw new Error();
    }
  } catch {
    elements.connectionStatus.textContent = t('settings.error');
    elements.connectionStatus.className = 'status-badge status-badge--error';
  }
}

// =================== UTILITY FUNCTIONS ===================
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatTimeAgo(isoString) {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return t('preview.justNow');
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// =================== CHROME STORAGE HELPERS ===================
function chromeStorageGet(keys) {
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, resolve);
  });
}

function chromeStorageSet(data) {
  return new Promise((resolve) => {
    chrome.storage.local.set(data, resolve);
  });
}
