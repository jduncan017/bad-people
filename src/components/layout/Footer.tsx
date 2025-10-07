export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 bg-zinc-950 py-4">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <p className="text-sm text-zinc-500">
          App developed by{" "}
          <a
            href="https://digitalnovastudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-orange-500 transition-colors hover:text-orange-400"
          >
            DigitalNova Studio
          </a>
        </p>
      </div>
    </footer>
  );
}
