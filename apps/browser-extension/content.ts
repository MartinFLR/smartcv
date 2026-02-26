// SmartCV Browser Extension - Content Script

// Listen for messages from background worker
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SMARTCV_CAPTURED') {
    showCaptureNotification(message.text);
    sendResponse({ received: true });
  }
});

/**
 * Shows a floating toast notification when text is captured
 */
function showCaptureNotification(text) {
  // Remove any existing notification
  const existing = document.getElementById('smartcv-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'smartcv-toast';
  toast.innerHTML = `
    <div style="
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 2147483647;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: #f8fafc;
      padding: 16px 20px;
      border-radius: 12px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      max-width: 360px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(45,212,191,0.2);
      animation: smartcv-slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      border-left: 3px solid #2dd4bf;
    ">
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
        <span style="font-size: 18px;">✅</span>
        <strong style="color: #2dd4bf;">SmartCV</strong>
      </div>
      <div style="color: #94a3b8; font-size: 12px; line-height: 1.4;">
        Job description captured! Click the extension icon to generate your CV.
      </div>
      <div style="
        margin-top: 8px;
        padding: 8px 10px;
        background: rgba(255,255,255,0.05);
        border-radius: 6px;
        font-size: 11px;
        color: #64748b;
        max-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      ">${escapeHtml(text.substring(0, 120))}${text.length > 120 ? '...' : ''}</div>
    </div>
  `;

  // Add animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes smartcv-slide-in {
      from { transform: translateX(100px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes smartcv-slide-out {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(toast);

  // Auto-remove after 4 seconds
  setTimeout(() => {
    const el = document.getElementById('smartcv-toast');
    if (el) {
      el.firstElementChild.style.animation = 'smartcv-slide-out 0.3s ease forwards';
      setTimeout(() => el.remove(), 300);
    }
  }, 4000);
}

/**
 * Escape HTML to prevent XSS from captured text
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
