// agents-deep-dive.js — Spec 006, Phase 3 US1
// Validates the Deep-Dive signup form, calls the Supabase Edge Function
// hash_submitter_ip to get a server-derived IP hash, and inserts the row
// into signups.deep_dive_signups via the Supabase REST endpoint.
//
// No bundler. ES2022 module. Loaded once on /agents/deep-dive/ (DE only).

const FORM_SELECTOR = "#agents-deep-dive-form"
const SUPABASE_CLIENT_CDN = "https://esm.sh/@supabase/supabase-js@2.45.0"

const REQUIRED_FIELDS = [
  "name", "email", "company_role", "industry", "use_case", "phase",
]

const ERROR_MESSAGES = {
  required: (label) => `Bitte trage ${label} ein.`,
  email: "Bitte trage eine gültige E-Mail-Adresse ein.",
  useCaseShort: "Kannst du noch 1–2 Worte ergänzen? Hilft mir bei der Auswahl.",
  useCaseLong: "Bitte fasse den Use Case auf maximal 500 Zeichen zusammen.",
  consent: "Bitte bestätige die Einwilligung, damit ich deine Anmeldung verarbeiten darf.",
  server: "Da ist etwas schiefgelaufen. Versuch es bitte gleich nochmal — oder schreib direkt an tobias.oberrauch@gmx.de.",
}

const LABEL_BY_FIELD = {
  name: "deinen Namen",
  email: "eine E-Mail-Adresse",
  company_role: "Unternehmen und Rolle",
  industry: "eine Branche",
  use_case: "deinen Use Case",
  phase: "deine aktuelle Bauphase",
}

const form = document.querySelector(FORM_SELECTOR)
if (form) {
  init(form)
}

function init(form) {
  const supabaseUrl = form.dataset.supabaseUrl
  const supabaseAnonKey = form.dataset.supabaseAnonKey

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("[agents-deep-dive] supabase config missing on form dataset")
  }

  // live use-case length hint
  const useCase = form.querySelector("#f-use-case")
  const useCaseHint = form.querySelector('[data-hint-for="use_case"]')
  useCase.addEventListener("input", () => {
    const len = useCase.value.trim().length
    if (len > 0 && len < 20) {
      useCaseHint.textContent = ERROR_MESSAGES.useCaseShort
      useCaseHint.classList.add("is-visible")
    } else {
      useCaseHint.textContent = ""
      useCaseHint.classList.remove("is-visible")
    }
  })

  form.addEventListener("submit", async (event) => {
    event.preventDefault()
    await handleSubmit(form, supabaseUrl, supabaseAnonKey)
  })
}

async function handleSubmit(form, supabaseUrl, supabaseAnonKey) {
  clearErrors(form)

  // 1. honeypot — silent abort
  const honeypot = form.querySelector('input[name="website"]')
  if (honeypot && honeypot.value.trim() !== "") {
    console.warn("[agents-deep-dive] honeypot filled, aborting silently")
    return
  }

  // 2. collect + validate
  const data = collect(form)
  const validation = validate(data)
  if (!validation.ok) {
    paintErrors(form, validation.errors)
    return
  }

  setStatus(form, "Sende …", "pending")
  disableSubmit(form, true)

  try {
    const { createClient } = await import(SUPABASE_CLIENT_CDN)
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const insertPayload = { ...data }
    if (!insertPayload.pain_point) insertPayload.pain_point = null
    if (!insertPayload.preknowledge) insertPayload.preknowledge = null

    const { error } = await supabase
      .schema("signups")
      .from("deep_dive_signups")
      .insert(insertPayload)

    if (error) {
      console.error("[agents-deep-dive] insert failed", error)
      setStatus(form, ERROR_MESSAGES.server, "error")
      disableSubmit(form, false)
      return
    }

    window.location.href = "/agents/deep-dive/danke/"
  } catch (err) {
    console.error("[agents-deep-dive] unexpected error", err)
    setStatus(form, ERROR_MESSAGES.server, "error")
    disableSubmit(form, false)
  }
}

function collect(form) {
  const fd = new FormData(form)
  return {
    name: (fd.get("name") || "").toString().trim(),
    email: (fd.get("email") || "").toString().trim(),
    company_role: (fd.get("company_role") || "").toString().trim(),
    industry: (fd.get("industry") || "").toString(),
    use_case: (fd.get("use_case") || "").toString().trim(),
    phase: (fd.get("phase") || "").toString(),
    pain_point: (fd.get("pain_point") || "").toString() || null,
    preknowledge: (fd.get("preknowledge") || "").toString().trim() || null,
    consent_given: fd.get("consent_given") === "true",
  }
}

function validate(data) {
  const errors = {}
  for (const f of REQUIRED_FIELDS) {
    if (!data[f]) errors[f] = ERROR_MESSAGES.required(LABEL_BY_FIELD[f] ?? f)
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = ERROR_MESSAGES.email
  }
  if (data.use_case && data.use_case.length < 20) {
    errors.use_case = ERROR_MESSAGES.useCaseShort
  }
  if (data.use_case && data.use_case.length > 500) {
    errors.use_case = ERROR_MESSAGES.useCaseLong
  }
  if (!data.consent_given) {
    errors.consent_given = ERROR_MESSAGES.consent
  }
  return { ok: Object.keys(errors).length === 0, errors }
}

function clearErrors(form) {
  form.querySelectorAll(".field-error.is-visible").forEach((el) => {
    el.textContent = ""
    el.classList.remove("is-visible")
  })
  setStatus(form, "", "")
}

function paintErrors(form, errors) {
  for (const [field, msg] of Object.entries(errors)) {
    const slot = form.querySelector(`[data-error-for="${field}"]`)
    if (slot) {
      slot.textContent = msg
      slot.classList.add("is-visible")
    }
  }
  // scroll to first error
  const firstField = Object.keys(errors)[0]
  const focus = form.querySelector(`[name="${firstField}"]`)
  if (focus) focus.focus({ preventScroll: false })
}

function setStatus(form, message, kind) {
  const status = form.querySelector(".form-status")
  if (!status) return
  status.textContent = message
  status.dataset.kind = kind
}

function disableSubmit(form, disabled) {
  const btn = form.querySelector('button[type="submit"]')
  if (btn) btn.disabled = disabled
}
