/** Splits text into masked words so GSAP can reveal them. Rendered on the server. */
export function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i}>
          <span className="w"><span>{w}</span></span>{" "}
        </span>
      ))}
    </>
  );
}
