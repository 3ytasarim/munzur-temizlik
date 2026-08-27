export type Block = { t: string; v: string };

export function Blocks({ blocks }: { blocks: Block[] }) {
  const out: React.ReactNode[] = [];
  let list: string[] = [];

  const flush = (key: string) => {
    if (list.length) {
      out.push(
        <ul key={key} className="my-5 space-y-2.5 pl-1">
          {list.map((li, i) => (
            <li key={i} className="flex gap-3 text-[1.02rem] leading-relaxed">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{li}</span>
            </li>
          ))}
        </ul>,
      );
      list = [];
    }
  };

  blocks.forEach((b, i) => {
    if (b.t === "li") {
      list.push(b.v);
      return;
    }
    flush(`l${i}`);
    if (b.t === "h2")
      out.push(
        <h2 key={i} className="mt-12 text-2xl md:text-3xl">
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
        <h3 key={i} className="mt-8 text-lg md:text-xl">
          {b.v}
        </h3>,
      );
    else
      out.push(
        <p key={i} className="mt-4 text-[1.02rem] leading-relaxed">
          {b.v}
        </p>,
      );
  });
  flush("last");

  return <div className="max-w-none">{out}</div>;
}
