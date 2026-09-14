"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function SignupPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form)),
    });
    const data = await response.json();
    setStatus(response.ok ? "success" : "error");
    setMessage(response.ok ? "Your request is in. We’ll contact you to finish setup." : data.error);
  }

  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <Link href="/" style={styles.logo}><span style={styles.mark}>U</span> Utens<span style={{color:"#4f46e5"}}>.app</span></Link>
        <section style={styles.card}>
          <div>
            <div style={styles.badge}>14-day free trial</div>
            <h1 style={styles.title}>Put your customer replies on autopilot.</h1>
            <p style={styles.copy}>Tell us where to reach you. We’ll help connect your profiles, approved scripts, OpenAI answers, and Twilio escalation alerts.</p>
            <ul style={styles.list}>
              <li>No credit card required</li>
              <li>AI answers in your brand voice</li>
              <li>Sensitive replies escalate by SMS</li>
            </ul>
          </div>
          {status === "success" ? (
            <div style={styles.success}><div style={{fontSize:36}}>✓</div><h2>Welcome to Utens</h2><p>{message}</p><Link href="/" style={styles.button}>Back to homepage</Link></div>
          ) : (
            <form onSubmit={submit} style={styles.form}>
              <label style={styles.label}>Your name<input name="name" required minLength={2} style={styles.input} /></label>
              <label style={styles.label}>Business name<input name="business" required minLength={2} style={styles.input} /></label>
              <label style={styles.label}>Business email<input name="email" type="email" required style={styles.input} /></label>
              <label style={styles.label}>Mobile number <span style={styles.optional}>(optional)</span><input name="phone" type="tel" style={styles.input} /></label>
              <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{display:"none"}} />
              <button disabled={status === "loading"} style={styles.button}>{status === "loading" ? "Starting…" : "Start free"}</button>
              {status === "error" && <p role="alert" style={styles.error}>{message}</p>}
              <p style={styles.fine}>By continuing, you agree to be contacted about setting up your Utens trial.</p>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page:{minHeight:"100vh",background:"linear-gradient(135deg,#eef2ff,#ecfeff)",fontFamily:"Inter,system-ui,sans-serif",padding:"40px 20px",color:"#111827"},
  shell:{maxWidth:1000,margin:"0 auto"},logo:{display:"inline-flex",alignItems:"center",gap:8,fontWeight:800,fontSize:21,textDecoration:"none",color:"#111827",marginBottom:32},mark:{width:34,height:34,borderRadius:10,display:"grid",placeItems:"center",background:"linear-gradient(135deg,#4f46e5,#22d3ee)",color:"white"},
  card:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:48,background:"white",border:"1px solid #e5e7eb",borderRadius:24,padding:"clamp(28px,5vw,56px)",boxShadow:"0 30px 70px -35px rgba(79,70,229,.4)"},
  badge:{display:"inline-block",background:"#eef2ff",color:"#4338ca",padding:"6px 12px",borderRadius:999,fontSize:12,fontWeight:700},title:{fontSize:"clamp(30px,4vw,48px)",lineHeight:1.08,letterSpacing:"-.03em",margin:"20px 0"},copy:{color:"#6b7280",fontSize:17,lineHeight:1.65},list:{lineHeight:2,color:"#374151",paddingLeft:22},form:{display:"flex",flexDirection:"column",gap:16},label:{fontSize:14,fontWeight:650,color:"#374151"},optional:{color:"#9ca3af",fontWeight:400},input:{display:"block",width:"100%",boxSizing:"border-box",marginTop:7,padding:"12px 13px",border:"1px solid #d1d5db",borderRadius:10,fontSize:16},button:{display:"inline-block",border:0,borderRadius:11,background:"#4f46e5",color:"white",padding:"14px 20px",fontWeight:750,fontSize:16,textAlign:"center",textDecoration:"none",cursor:"pointer"},error:{color:"#b91c1c",background:"#fef2f2",padding:12,borderRadius:10,fontSize:14},fine:{fontSize:12,color:"#9ca3af",lineHeight:1.5,textAlign:"center"},success:{textAlign:"center",alignSelf:"center",background:"#ecfdf5",color:"#065f46",padding:32,borderRadius:18},
};
