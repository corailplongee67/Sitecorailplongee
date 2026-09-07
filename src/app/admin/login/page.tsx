import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signIn } from "../actions";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";

export const metadata = { title: "Connexion administration", robots: { index: false, follow: false } };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const configured = hasSupabaseEnv();
  if (configured) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    if (data?.claims?.sub) redirect("/admin/");
  }
  const { error } = await searchParams;

  return (
    <main className="admin-login">
      <div className="admin-login-image"><Image src="/images/hero/corail-reef.jpg" alt="" fill priority sizes="50vw" /></div>
      <section className="admin-login-panel">
        <Link href="/"><Image src="/images/brand/logo.png" alt="Corail Plongée" width={180} height={86} /></Link>
        <p className="eyebrow">Espace privé</p>
        <h1>Administration</h1>
        {!configured ? (
          <div className="admin-notice">La connexion Supabase doit d’abord être ajoutée à l’environnement de préproduction.</div>
        ) : (
          <form action={signIn} className="admin-form">
            {error ? <p className="form-error">Adresse e-mail ou mot de passe incorrect.</p> : null}
            <label>E-mail<input type="email" name="email" autoComplete="email" required /></label>
            <label>Mot de passe<input type="password" name="password" autoComplete="current-password" required /></label>
            <button className="button button-coral" type="submit">Se connecter</button>
          </form>
        )}
        <Link className="admin-back" href="/">← Retour au site</Link>
      </section>
    </main>
  );
}
