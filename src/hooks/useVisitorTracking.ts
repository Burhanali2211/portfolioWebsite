import { useEffect, useRef } from "react";
import { invokeEdgeFunction } from "@/integrations/supabase/client";
import { sendToTelegram, formatVisitorDataForTelegram, TelegramConfig, TELEGRAM_CONFIG } from "@/lib/telegram";
import { UAParser } from "ua-parser-js";

interface VisitorData {
  // Browser/Device info
  userAgent: string;
  language: string;
  languages: string[];
  platform: string;
  vendor: string;
  cookieEnabled: boolean;
  doNotTrack: string | null;

  // Screen info
  screenWidth: number;
  screenHeight: number;
  screenColorDepth: number;
  screenPixelRatio: number;
  viewportWidth: number;
  viewportHeight: number;

  // Connection info
  connectionType?: string;
  connectionEffectiveType?: string;
  connectionDownlink?: number;

  // Time info
  timezone: string;
  timezoneOffset: number;
  localTime: string;

  // Page info
  referrer: string;
  currentUrl: string;
  pageTitle: string;

  // Hardware
  hardwareConcurrency?: number;
  deviceMemory?: number;
  maxTouchPoints?: number;
  gpu?: string;
  batteryStatus?: string;

  // Parsed device info
  deviceType: string;
  browserName: string;
  browserVersion: string;
  osName: string;
  osVersion: string;
  isMobile: boolean;
  isTablet: boolean;
  isBot: boolean;
  refreshRate?: number;
  hasTouch: boolean;
  orientation: string;
  deviceModel: string;
  deviceVendor: string;
  fingerprint: string;
  confidenceScore?: number;
  componentsData?: Record<string, any>;
}

// Parse user agent to get browser and OS info using ua-parser-js
function parseUserAgent(ua: string): {
  browserName: string;
  browserVersion: string;
  osName: string;
  osVersion: string;
  isMobile: boolean;
  isTablet: boolean;
  isBot: boolean;
  deviceType: string;
  deviceModel: string;
  deviceVendor: string;
} {
  const parser = new UAParser(ua);
  const browser = parser.getBrowser();
  const os = parser.getOS();
  const device = parser.getDevice();

  const isMobile = device.type === 'mobile';
  const isTablet = device.type === 'tablet';
  const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(ua);

  let deviceType = "Desktop";
  if (isTablet) deviceType = "Tablet";
  else if (isMobile) deviceType = "Mobile";
  else if (isBot) deviceType = "Bot";

  return {
    browserName: browser.name || "Unknown",
    browserVersion: browser.version || "",
    osName: os.name || "Unknown",
    osVersion: os.version || "",
    isMobile,
    isTablet,
    isBot,
    deviceType,
    deviceModel: device.model || "Unknown Model",
    deviceVendor: device.vendor || "Unknown Vendor",
  };
}

/**
 * Get accurate device info via Client Hints (Modern Browsers)
 */
async function getHighEntropyData(): Promise<{ model?: string; platformVersion?: string }> {
  try {
    const nav = navigator as any;
    if (nav.userAgentData && nav.userAgentData.getHighEntropyValues) {
      const hints = await nav.userAgentData.getHighEntropyValues(['model', 'platformVersion']);
      return {
        model: hints.model,
        platformVersion: hints.platformVersion
      };
    }
  } catch (e) { }
  return {};
}

/**
 * Detect screen refresh rate
 */
async function getRefreshRate(): Promise<number> {
  return new Promise((resolve) => {
    let start = 0;
    let frames = 0;
    const check = (timestamp: number) => {
      if (!start) start = timestamp;
      frames++;
      if (timestamp - start < 1000) {
        requestAnimationFrame(check);
      } else {
        // Round to nearest common refresh rate
        const hz = Math.round(frames);
        resolve(hz);
      }
    };
    requestAnimationFrame(check);
    // Timeout fallback
    setTimeout(() => resolve(60), 1200);
  });
}

// Get GPU information
function getGPUInfo(): string {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext;
    if (!gl) return "Not available";

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (!debugInfo) return "Standard WebGL";

    return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
  } catch (e) {
    return "Error detecting GPU";
  }
}

// Get Battery information
async function getBatteryInfo(): Promise<string> {
  try {
    const nav = navigator as any;
    if (!nav.getBattery) return "Not supported";

    const battery = await nav.getBattery();
    const level = Math.round(battery.level * 100);
    const status = battery.charging ? "Charging" : "Discharging";
    return `${level}% (${status})`;
  } catch (e) {
    return "Error detecting battery";
  }
}

// Generate highly accurate fingerprint using FingerprintJS
async function getFingerprintData() {
  try {
    const fpPromise = import('@fingerprintjs/fingerprintjs').then(FingerprintJS => FingerprintJS.load());
    const fp = await fpPromise;
    const result = await fp.get();
    
    // Extract useful components to verify non-faked data
    const components = result.components as any;
    
    return {
      visitorId: result.visitorId,
      confidenceScore: result.confidence?.score || 1,
      componentsData: {
        fontsCount: components?.fonts?.value?.length || 0,
        pluginsCount: components?.plugins?.value?.length || 0,
        audioHash: components?.audio?.value ? "Available" : "N/A",
        canvasHash: components?.canvas?.value ? "Available" : "N/A",
        webglVendor: components?.webglVendorAndRenderer?.value || "Unknown",
        mathHash: components?.math?.value ? "Available" : "N/A",
      }
    };
  } catch (e) {
    console.error("FingerprintJS error:", e);
    return {
      visitorId: "Unknown",
      confidenceScore: 0,
      componentsData: {}
    };
  }
}

// Get IP and Geo Information
async function getGeoInfo(): Promise<any> {
  try {
    // Using ipapi.co for detailed geo info (City, Country, ISP)
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    return {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      isp: data.org,
      asn: data.asn,
      lat: data.latitude,
      lon: data.longitude
    };
  } catch (e) {
    // Fallback if geo API fails
    try {
      const resp = await fetch("https://api64.ipify.org?format=json");
      const d = await resp.json();
      return { ip: d.ip };
    } catch (err) {
      return { ip: "Unknown" };
    }
  }
}

// Collect all visitor data
async function collectVisitorData(): Promise<VisitorData> {
  const nav = navigator as any;

  const parsed = parseUserAgent(nav.userAgent);
  const gpu = getGPUInfo();
  const batteryStatus = await getBatteryInfo();
  const geo = await getGeoInfo();
  const fpData = await getFingerprintData();
  const refreshRate = await getRefreshRate();
  const hints = await getHighEntropyData();

  if (hints.model) parsed.deviceModel = hints.model;

  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const orientation = screen.orientation?.type || (window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');

  return {
    // Browser/Device info
    userAgent: nav.userAgent,
    language: nav.language,
    languages: Array.from(nav.languages || [nav.language]),
    platform: nav.platform,
    vendor: nav.vendor,
    cookieEnabled: nav.cookieEnabled,
    doNotTrack: nav.doNotTrack,

    // Screen info
    screenWidth: screen.width,
    screenHeight: screen.height,
    screenColorDepth: screen.colorDepth,
    screenPixelRatio: window.devicePixelRatio,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,

    // Connection info
    connectionType: nav.connection?.type,
    connectionEffectiveType: nav.connection?.effectiveType,
    connectionDownlink: nav.connection?.downlink,

    // Time info
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: new Date().getTimezoneOffset(),
    localTime: new Date().toISOString(),

    // Page info
    referrer: document.referrer,
    currentUrl: window.location.href,
    pageTitle: document.title,

    // Hardware
    hardwareConcurrency: nav.hardwareConcurrency,
    deviceMemory: nav.deviceMemory,
    maxTouchPoints: nav.maxTouchPoints,
    gpu,
    batteryStatus,
    fingerprint: fpData.visitorId,
    confidenceScore: fpData.confidenceScore,
    componentsData: fpData.componentsData,
    refreshRate,
    hasTouch,
    orientation,
    ...geo,

    // Parsed device info
    ...parsed,
  } as any;
}



// Main hook
export function useVisitorTracking() {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Only track once per session
    if (hasTracked.current) return;

    // Check if already tracked in this session
    const sessionTracked = sessionStorage.getItem("visitor_tracked");
    if (sessionTracked) {
      hasTracked.current = true;
      return;
    }

    // Function to perform tracking
    const performTracking = async () => {
      try {
        const visitorData = await collectVisitorData();

        // 1. Send to Supabase (if configured)
        try {
          await invokeEdgeFunction("track-visitor", visitorData as unknown as Record<string, unknown>);
        } catch (e) {
          console.debug("Supabase tracking skipped or failed");
        }

        // 2. Send to Telegram
        if (TELEGRAM_CONFIG.botToken && TELEGRAM_CONFIG.chatId) {
          const message = formatVisitorDataForTelegram(visitorData);
          await sendToTelegram(message);
        }

        // Mark as tracked for this session
        sessionStorage.setItem("visitor_tracked", "true");
        hasTracked.current = true;
      } catch (error) {
        // Silent failure - don't affect user experience
        console.debug("Visitor tracking failed:", error);
      }
    };

    // Use requestIdleCallback for zero lag, or fallback to setTimeout
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        // Still delay slightly to let the page settle
        setTimeout(performTracking, 1000);
      });
    } else {
      setTimeout(performTracking, 2000);
    }
  }, []);
}

export default useVisitorTracking;

