import { ScissorsIcon } from "./Vectors";

export function Seal({ text = "BARBEARIA PREMIUM · DESDE 2014 · SÃO PAULO · " }: { text?: string }) {
  return (
    <div className="seal" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="seal__ring">
        <defs>
          <path id="seal-path" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
        </defs>
        <circle cx="100" cy="100" r="98" className="seal__edge" />
        <circle cx="100" cy="100" r="58" className="seal__inner" />
        <text className="seal__text">
          <textPath href="#seal-path" textLength="486">
            {text}
          </textPath>
        </text>
      </svg>
      <ScissorsIcon className="seal__icon" />
    </div>
  );
}
