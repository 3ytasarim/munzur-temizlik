import { Check, Sparkles } from "lucide-react";
import { images } from "@/data/site";

export type Block = {
  t: string;
  v?: string;
  items?: string[];
  title?: string;
  text?: string;
};

function Rich({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

function GreenBox({ block }: { block: Block }) {
  const items = block.items ?? [];
  const half = Math.ceil(items.length / 2);
  const cols = [items.slice(0, half), items.slice(half)];
  return (
    <div className="relative mt-24 rounded-[2.2rem] bg-primary px-6 pb-10 pt-20 text-center md:px-12 md:pb-14">
      {/* notch icon */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2">
        <div className="relative flex h-32 w-28 flex-col items-center justify-end rounded-b-[2.2rem] rounded-t-2xl bg-pale pb-5">
          <img
            src={images.leaf1}
            alt=""
            aria-hidden="true"
            className="absolute -top-7 left-1/2 w-10 -translate-x-1/2"
          />
          <Sparkles className="h-9 w-9 text-primary" />
        </div>
      </div>
      <h3 className="text-2xl font-medium text-white md:text-3xl">{block.title}</h3>
      {block.text && <p className="mx-auto mt-4 max-w-xl text-white/90">{block.text}</p>}
      <div className="mt-9 grid gap-5 text-left md:grid-cols-2">
        {cols.map((col, ci) => (
          <ul key={ci} className="space-y-5 rounded-[1.6rem] bg-pale p-7 md:p-9">
            {col.map((it, i) => (
              <li key={i} className="flex items-center gap-3 font-medium text-foreground">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {it}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  const out: React.ReactNode[] = [];
  let uls: string[][] = [];

  const flushUls = (key: string) => {
    if (uls.length) {
      out.push(
        <div
          key={key}
          className={`mt-6 grid gap-x-8 gap-y-2.5 ${
            uls.length > 1 ? "sm:grid-cols-2 lg:grid-cols-" + Math.min(uls.length, 4) : ""
          }`}
        >
          {uls.map((items, i) => (
            <ul key={i} className="space-y-2.5">
              {items.map((li, j) => (
                <li key={j} className="flex gap-3 text-[1.02rem] leading-relaxed">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <Rich html={li} />
                </li>
              ))}
            </ul>
          ))}
        </div>,
      );
      uls = [];
    }
  };

  blocks.forEach((b, i) => {
    if (b.t === "ul" && b.items) {
      uls.push(b.items);
      return;
    }
    flushUls(`u${i}`);
    if (b.t === "h1")
      out.push(
        <h1 key={i} className="text-3xl md:text-5xl">
          {b.v}
        </h1>,
      );
    else if (b.t === "h2")
      out.push(
        <h2 key={i} className="mt-12 text-2xl md:text-[2rem] md:leading-snug">
          {b.v}
        </h2>,
      );
    else if (b.t === "h3")
      out.push(
        <h3 key={i} className="mt-10 text-xl md:text-2xl">
          {b.v}
        </h3>,
      );
    else if (b.t === "h4" || b.t === "h5")
      out.push(
        <h4 key={i} className="mt-8 text-lg md:text-xl">
          {b.v}
        </h4>,
      );
    else if (b.t === "h6")
      out.push(
        <p key={i} className="eyebrow mb-3 mt-10">
          {b.v}
        </p>,
      );
    else if (b.t === "greenbox") out.push(<GreenBox key={i} block={b} />);
    else if (b.t === "form") out.push(<div key={i} data-quote-form-slot />);
    else
      out.push(
        <p key={i} className="mt-4 text-[1.02rem] leading-relaxed text-foreground/80">
          <Rich html={b.v ?? ""} />
        </p>,
      );
  });
  flushUls("ulast");

  return <div className="max-w-none">{out}</div>;
}
