export const SITE_AUDIO_BUCKET = "site-audio";

export type SiteAudioSettings = {
  path: string;
  url: string;
  volume: number;
};

export function publicSiteAudioUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!baseUrl) return "";
  return `${baseUrl}/storage/v1/object/public/${SITE_AUDIO_BUCKET}/${path}`;
}

export async function getSiteAudioSettings(): Promise<SiteAudioSettings | null> {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!baseUrl || !publishableKey) return null;

  try {
    const response = await fetch(
      `${baseUrl}/rest/v1/site_audio_settings?select=audio_path,volume&id=eq.background&limit=1`,
      {
        headers: {
          apikey: publishableKey,
          Authorization: `Bearer ${publishableKey}`,
        },
        next: { revalidate: 3600, tags: ["site-audio"] },
      },
    );
    if (!response.ok) return null;
    const rows = await response.json() as Array<{ audio_path: string; volume: number }>;
    const settings = rows[0];
    if (!settings) return null;
    return {
      path: settings.audio_path,
      url: publicSiteAudioUrl(settings.audio_path),
      volume: Math.max(0, Math.min(1, Number(settings.volume))),
    };
  } catch {
    return null;
  }
}
