import { Game } from "./game";
import { render } from "./renderer";

const game = new Game();
document.getElementById("app")?.appendChild(render(game));
