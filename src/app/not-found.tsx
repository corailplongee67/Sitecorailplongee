import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow light">404 · Sous la surface</p>
      <h1>Cette page a pris le large.</h1>
      <p>Revenez vers le centre pour choisir votre prochaine immersion.</p>
      <Link className="button button-coral" href="/">Retour à l’accueil</Link>
    </main>
  );
}
