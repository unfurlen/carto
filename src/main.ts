import "./style.css";
import { load } from "./loader";
import { render } from "./renderer";

function renderFromHash(hash: string): void {
  const app = document.getElementById("app");
  if (!app) return;

  try {
    const game = load(hash);
    app.replaceChildren(render(game));
  } catch (e) {
    app.textContent =
      e instanceof Error ? e.message : "Failed to load map from URL";
  }
}

renderFromHash(window.location.hash);
window.addEventListener("hashchange", () =>
  renderFromHash(window.location.hash),
);
