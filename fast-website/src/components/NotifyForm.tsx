"use client";
import { useState } from "react";

export function NotifyForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: f.get("email"), consent: f.get("consent") === "on", website: f.get("website") ?? "" }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) { setState("done"); setMsg("Thank you. We will email you once, when the iPhone app is ready."); }
      else { setState("error"); setMsg(data.error ?? "Something went wrong. Please try again."); }
    } catch { setState("error"); setMsg("No connection. Please try again."); }
  }

  if (state === "done") return <p className="formmsg" role="status">{msg}</p>;
  return (
    <form className="nform" onSubmit={submit} noValidate>
      <label className="sr" htmlFor="nemail">Email address</label>
      <input id="nemail" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} />
      <div className="hp" aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" /></div>
      <label className="consent"><input type="checkbox" name="consent" required />Email me once when iPhone is ready. I can ignore it. Nothing else.</label>
      <button className="btn" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending" : "Notify me"}</button>
      {state === "error" && <p className="formmsg err" role="alert">{msg}</p>}
    </form>
  );
}
