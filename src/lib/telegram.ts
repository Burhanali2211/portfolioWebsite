
/**
 * Utility to send messages to a Telegram Bot
 */

export interface TelegramConfig {
    botToken: string;
    chatId: string;
}

export const TELEGRAM_CONFIG: TelegramConfig = {
    botToken: "8434347610:AAEE3l-2dD1K_ck0QuX96HivadQPvuWYn8M",
    chatId: "7658385347",
};

export async function sendToTelegram(message: string, config: TelegramConfig = TELEGRAM_CONFIG) {
    const url = `https://api.telegram.org/bot${config.botToken}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: config.chatId,
                text: message,
                parse_mode: "HTML",
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Telegram API error:", errorData);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Failed to send to Telegram:", error);
        return false;
    }
}

export function formatVisitorDataForTelegram(data: any): string {
    const emoji = {
        device: "🖥️",
        browser: "🌐",
        os: "💻",
        location: "📍",
        network: "📶",
        hardware: "⚙️",
        time: "🕒",
        page: "📄",
        finger: "🆔",
        map: "🗺️",
        bot: "🤖",
    };

    const clean = (val: any) =>
        (!val || val === "N/A" || val === "Unknown" || val.toString().includes("Not supported")) ? null : val;

    const ram = clean(data.deviceMemory);
    const battery = clean(data.batteryStatus);
    const network = clean(data.connectionEffectiveType);
    const isp = clean(data.isp);
    const location = data.city && data.country ? `${data.city}, ${data.country}` : clean(data.ip) || "Unknown Location";
    const mapsLink = data.lat && data.lon ? `https://www.google.com/maps?q=${data.lat},${data.lon}` : null;
    const utmStr = (data.utmSource || data.utmMedium || data.utmCampaign) 
        ? `\n\n🎯 <b>Campaign Tracking:</b>\n• Source: ${data.utmSource || "N/A"}\n• Medium: ${data.utmMedium || "N/A"}\n• Campaign: ${data.utmCampaign || "N/A"}`
        : "";

    const modelStr = (data.deviceVendor !== "Unknown Vendor" || data.deviceModel !== "Unknown Model") 
        ? `${data.deviceVendor !== "Unknown Vendor" ? data.deviceVendor : ""} ${data.deviceModel !== "Unknown Model" ? data.deviceModel : ""}`.trim()
        : `${data.deviceType} Device`;

    return `
<b>${data.isBot ? emoji.bot : "🚀"} New ${data.isBot ? "Bot" : "Visitor"} Detected!</b>
<i>${data.isReturningVisitor ? `(Returning Visitor - Visit #${data.visitCount})` : "(First Time Visitor)"}</i>

${emoji.page} <b>Execution Info:</b>
• URL: <code>${data.currentUrl}</code>
• Referrer: <i>${data.referrer || "Direct Visit"}</i>${utmStr}

${emoji.location} <b>Identity & Location:</b>
• City: <b>${data.city || "Unknown"}</b>
• Country: <b>${data.country || "Unknown"}</b>
• IP: <code>${data.ip}</code>
${isp ? `• ISP: <i>${isp}</i>` : ""}
${mapsLink ? `${emoji.map} <a href="${mapsLink}">View on Google Maps</a>` : ""}

${emoji.device} <b>Device & OS:</b>
• Model: <b>${modelStr}</b>
• OS: ${data.deviceType} | ${data.osName} ${data.osVersion}
• Browser: <b>${data.browserName} ${data.browserVersion}</b>
• Screen: ${data.screenWidth}x${data.screenHeight} (@${data.screenPixelRatio}x)
• Orientation: ${data.orientation} (${data.refreshRate}Hz)

${emoji.hardware} <b>Hardware Specs (Fingerprinted):</b>
• CPU: ${data.hardwareConcurrency} Cores
${ram ? `• RAM: ~${ram} GB` : ""}
• GPU: <code>${data.gpu}</code>
• WebGL Vendor: ${data.componentsData?.webglVendor || "Unknown"}
• Touch: ${data.hasTouch ? "✅ Yes" : "❌ No"}
${battery ? `• Battery: ${battery}` : ""}
• Fonts: ${data.componentsData?.fontsCount || 0}
• Canvas Hash: ${data.componentsData?.canvasHash || "N/A"}

${emoji.finger} <b>Fingerprint (Confidence ${Math.round((data.confidenceScore || 0) * 100)}%):</b>
<code>${data.fingerprint}</code>

${emoji.network} <b>Connection:</b>
${network ? `• Type: ${network}` : ""}
• Language: ${data.language}
• Timezone: ${data.timezone}

${emoji.time} <b>Local Time:</b>
• ${new Date(data.localTime).toLocaleString()}
    `.trim();
}

export function formatContactMessageForTelegram(data: { name: string; email: string; message: string }): string {
    return `
<b>📩 New Contact Message!</b>

👤 <b>From:</b> ${data.name}
📧 <b>Email:</b> ${data.email}

📝 <b>Message:</b>
${data.message}

🕒 <b>Sent at:</b> ${new Date().toLocaleString()}
    `.trim();
}

export function formatProjectBriefForTelegram(data: {
    name: string;
    email: string;
    phone?: string;
    projectType: string;
    budget: string;
    timeline: string;
    description: string;
}): string {
    return `
<b>🚀 New Project Brief!</b>

👤 <b>Name:</b> ${data.name}
📧 <b>Email:</b> ${data.email}
${data.phone ? `📱 <b>Phone:</b> ${data.phone}` : ""}

🏷 <b>Project Type:</b> ${data.projectType}
💰 <b>Budget:</b> ${data.budget}
⏱ <b>Timeline:</b> ${data.timeline}

📋 <b>Description:</b>
${data.description}

🕒 <b>Sent at:</b> ${new Date().toLocaleString()}
    `.trim();
}
