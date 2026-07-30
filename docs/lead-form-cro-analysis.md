# Lead Capture Form Analysis

**Scope:** `components/forms/lead-form-consent.tsx` → `app/property-info/property-info-form.tsx` → `app/property-details/property-details-form.tsx` → `app/bookings/page.tsx`, plus supporting files read for context: `app/property-info/page.tsx`, `app/property-details/page.tsx`, `components/progress/PropertyProgress.tsx`, `components/forms/multi-step-lead-form.tsx`, `app/api/offers/route.ts`.

Analysis only — no implementation, no rewritten components. Short illustrative snippets (≤10 lines) are included only where necessary to support a claim.

---

## 1. Executive Summary

- **The single biggest risk is not abandonment mid-form — it's that *nothing is captured until the very last click of the very last step.*** No field is sent to any CRM/database until `property-details-form.tsx:136` (the final submit). Abandon anywhere in step 1, step 2 (4 sub-pages), or even step 3 before clicking submit, and the business has **zero** record of the visitor.
- **Worse: even a successful click doesn't guarantee capture.** The webhook `fetch()` at `property-details-form.tsx:136-143` has no `response.ok` check and its `catch` only logs to console — the user is redirected to `/bookings` (line 157) regardless of whether the CRM webhook actually succeeded. A GHL outage or 4xx/5xx response currently produces a *silent* lost lead with a *visible* success screen.
- **Contact info is asked last, after ~19 property/situation fields.** The form collects address, 9 property-detail fields, condition, repairs, situation, and asking price — all before asking for name, phone, or email. This is the opposite of a fail-safe order for a form worried about abandonment.
- **`lead-form-consent.tsx` doesn't collect consent.** Despite the filename, step 1 only collects an address; `smsConsent` is a hidden field defaulted to `false`. Real SMS consent and the required Terms/Privacy checkbox live at the very end (`property-details-form.tsx:305-351`) — meaning all the Google Places and RentCast lookups on the address happen before any consent is captured.
- **No step-level analytics exist.** The only conversion event in the whole funnel fires on a GHL *booking* postMessage (`app/bookings/page.tsx:69-77,96-113`) — two steps downstream of actual lead capture. There is currently no way to see where users drop off.
- **Two schema fields are dead code**: `repairsEstimate` (state + `setValue` exist, no slider is rendered — `property-info-form.tsx:372,379`) and `fairPrice` (in the zod schema and forwarded via URL, but no input renders it anywhere). If the business believes it's collecting these, it isn't.
- **PII and financial data travel in the URL query string** for the entire funnel (address, name, phone, email, askingPrice, RentCast/AVM output). This is how state persists across steps, but it means this data lands in browser history, server logs, and any referrer-passing request — including three third-party iframes on this flow (Google Maps, YouTube, GHL widgets).
- **Step 1's "~2 minutes" promise** (`lead-form-consent.tsx:239`) undersells the real form: a minimum of ~17 required interactions across 6 screens before anything is submitted.
- **One content bug**: the repairs checklist on step 2 asks *"What has been upgraded in the last 10 years?"* but the checkbox options (Roof, HVAC, Foundation, Plumbing…) read like *repairs needed*, not upgrades completed (`property-info-form.tsx:1158-1172`). This is a real ambiguity risk for data quality, not just UX polish.
- **What's already solved well**: address autocomplete + auto-prefill from RentCast meaningfully reduces typing (`property-info-form.tsx:582-688`); the step-2 sub-pages update via `history.replaceState` without full navigation or field loss (`handleGoToPage2/3/4`); URL-based state means back/forward and reload don't lose data mid-flow; a real (if unused) multi-step wrapper (`components/forms/multi-step-lead-form.tsx`) already exists as a foundation for a client-side, no-navigation flow.
- **Top 3 highest-impact actions**: (1) move name+phone (or phone alone) to step 1 and persist it server-side immediately on entry, so an abandoned form still yields a usable lead; (2) fix the silent webhook-failure bug so a failed CRM push doesn't show a false success screen; (3) instrument step/field-level analytics so the rest of this backlog can be prioritized with real data instead of assumptions.

---

## 2. Current Flow Map

### 2.1 Step-by-step field inventory

| Step | File | Field | Input type | Required? | Validation |
|---|---|---|---|---|---|
| 1. Address | `lead-form-consent.tsx` | `address` | text + Google Places autocomplete | **Yes** (min 5 chars) | zod `min(5)` |
| 1. Address | `lead-form-consent.tsx` | `city` | hidden (auto-filled) | No | none |
| 1. Address | `lead-form-consent.tsx` | `state` | hidden (auto-filled) | No | none |
| 1. Address | `lead-form-consent.tsx` | `zipCode` | hidden (auto-filled) | No | regex if present |
| 1. Address | `lead-form-consent.tsx` | `smsConsent` | hidden, default `false` | No | — (no visible UI, not real consent) |
| 2.1 Property Info | `property-info-form.tsx` | `garage` | select | No | — |
| 2.1 | | `basement` | select | No | — |
| 2.1 | | `ownerName` | text | No | — |
| 2.1 | | `yearsOwned` | free text | No | — |
| 2.1 | | `propertyType` | select | No | — |
| 2.1 | | `bedrooms` | number | No | — |
| 2.1 | | `bathrooms` | number (step 0.25) | No | — |
| 2.1 | | `squareFootage` | number | No | — |
| 2.1 | | `yearBuilt` | number | No | — |
| 2.2 Condition & Repairs | | `condition` | custom color wheel (`RehabConditionWheel`) | **Yes** | zod `min(1)` |
| 2.2 | | `repairsChecklist` | checkbox group (8 options) | No | — |
| 2.2 | | `repairsNotes` | textarea | No | — |
| 2.2 | | `listedWithRealtor` | select (Yes/No) | **Yes** | zod `min(1)`, gated by `trigger()` before advancing |
| 2.3 Your Situation | | `closingTimeline` | select | No | — |
| 2.3 | | `ultimateGoal` | select | **Yes** | zod `min(1)`, gated by `trigger()` |
| 2.3 | | `occupied` | select (Yes/No/Rental) | **Yes** | zod `min(1)`, gated by `trigger()` |
| 2.4 Asking Price | | `askingPrice` | number | **Yes** | zod `min(1)` |
| 2.4 | | `fairPrice` | *(schema field, no rendered input anywhere — dead)* | No | — |
| 2.x (dead) | | `repairsEstimate` | *(state + schema, no rendered slider — dead)* | No | — |
| 3. Your Info | `property-details-form.tsx` | `firstName` | text | **Yes** | min 2 |
| 3. | | `lastName` | text | **Yes** | min 2 |
| 3. | | `phone` | tel | **Yes** | min 10 + regex |
| 3. | | `email` | email | **Yes** | valid email |
| 3. | | `smsConsent` | checkbox (the real one) | No | — |
| 3. | | `privacyConsent` | checkbox | **Yes** | must be `true` |
| 4. Bookings | `app/bookings/page.tsx` | *(calendar date/time inside a cross-origin GHL iframe)* | third-party widget | Unknown | Not auditable from this codebase — see §8 |

**Totals**: ~26 distinct fields across the funnel (2 of which — `repairsEstimate`, `fairPrice` — are dead/unrendered). Only **9 are required**: `address`, `condition`, `listedWithRealtor`, `ultimateGoal`, `occupied`, `askingPrice`, `firstName`, `lastName`, `phone`, `email`, `privacyConsent` — 11 actually, correcting the count above.

### 2.2 Interaction count (required-path minimum, ignoring optional fields)

| Step | Screens | Required fills | Required "Next" taps | Min. interactions |
|---|---|---|---|---|
| 1. Address | 1 | 1 (address) | 1 (submit) | 2 |
| 2. Property Info | 4 sub-pages | 5 (condition, listedWithRealtor, ultimateGoal, occupied, askingPrice) | 4 (Next × 3 + submit) | 9 |
| 3. Your Info | 1 | 5 (firstName, lastName, phone, email, privacyConsent) | 1 (submit) | 6 |
| **Total (form only, excludes booking widget)** | **6 screens** | **11** | **6** | **~17** |

This is the *floor*. In practice most users will also fill several of the 15 optional property fields, since several are pre-populated by RentCast and visually indistinguishable from user-entered data (see §3).

### 2.3 State management between steps

- State is **not** kept in React context/a store across routes — it's serialized into the URL (`URLSearchParams`) and read back via `useSearchParams()`/`initialParams` on each page (`property-info-form.tsx:227-239`, `property-details-form.tsx:59-69`).
- Step 2 is a single Next.js route (`/property-info`) with 4 internal "pages" tracked by a `propInfoStep` query param and swapped via `window.history.replaceState` (`property-info-form.tsx:394-462`) — no full navigation, so sub-step transitions are fast and don't remount the form.
- Steps 1→2 and 2→3 **are** full route changes (`router.push('/property-info?...')`, `router.push('/property-details?...')`), each carrying the full accumulated query string forward.
- Going "Back" from step 3 to step 2 explicitly re-saves the in-progress `firstName/lastName/phone/email` values into the URL first (`property-details-form.tsx:203-216`) so they survive the round trip — a deliberate, working safeguard.
- **No persistence exists that survives closing the tab or losing the URL.** There is no localStorage/sessionStorage draft, no server-side draft record, no email/SMS resume link. `sessionStorage` is used exactly once, to carry `sellerName` into `/bookings` for display (`property-details-form.tsx:148-154`), and even that read is wrapped in a try/catch because it "can throw in private-browsing modes" (comment, same file).
- An unused component, `components/forms/multi-step-lead-form.tsx`, already implements a fully client-side (no navigation) 3-step flow via an `onNext` callback that both `LeadFormConsent` and `PropertyInfoForm` already support as props — but no page in the app currently renders it. Every current entry point (9+ marketing pages) calls `<LeadFormConsent />` with no `onNext`, so the app always takes the route-navigation path, not the in-memory one.

### 2.4 What's sent to the backend, and when

| Step | Network call | Purpose | Persists lead data? |
|---|---|---|---|
| 1. Address submit | None (just a 1.5s `setTimeout` before navigating — `lead-form-consent.tsx:164-171`) | UX delay only | No |
| 2.4 Asking Price submit | `POST /api/offers` (`property-info-form.tsx:526-530`) | Computes ARV/repair cost/cash offer via RentCast, server-side | No — compute only, no storage |
| 2.1 (on address confirm) | `GET /api/rentcast` (`property-info-form.tsx:599`) | Pre-fills property fields | No — read-only |
| 3. Your Info submit | `POST https://services.leadconnectorhq.com/hooks/.../webhook-trigger/...` (`property-details-form.tsx:136-143`) | **The only point the full lead record is sent anywhere** | Yes — but unverified (see §1, §3) |
| 4. Bookings | GHL calendar iframes (cross-origin) | Appointment booking | Handled entirely inside GHL, outside this codebase |

There is **no partial/incremental submission** anywhere in the flow — everything is held client-side (in the URL) and sent in one shot at the very end.

---

## 3. Friction Diagnosis

### 3.1 Point of no return

**The point of no return is the entire form.** Because no network call persists anything until `property-details-form.tsx:136`, every one of the 6 screens preceding it — and even a failed webhook call on the 6th — can lose the lead completely. There is no intermediate point at which "at least we have their phone number" is true. This is the most consequential finding in this review and should anchor the redesign in §4.

### 3.2 Cognitive load

- **`yearsOwned`** (`property-info-form.tsx:1007-1016`) is a free-text field with placeholder `"e.g. 5 years, inherited, just bought…"` — it's actually being used as a catch-all for both a duration *and* an acquisition story ("inherited"). That's two different data shapes crammed into one text field, which will produce inconsistent, hard-to-parse data (`"5"`, `"5 years"`, `"since 2015"`, `"inherited from my mother"` all plausible answers to the same box).
- **Repairs checklist wording mismatch** (`property-info-form.tsx:1158`): the label reads *"What has been upgraded in the last 10 years? Please select all that apply,"* immediately above checkboxes named Roof/HVAC/Foundation/Plumbing/Electrical/Windows-Doors/Interior/Other. The field is named `repairsChecklist` internally, and the surrounding UX (paired with `condition` — a "how bad is it" wheel) strongly suggests it's meant to capture *what needs work*, not *what was upgraded*. Whichever meaning is intended, the copy and the field name currently disagree, and users will answer inconsistently.
- **`condition`** is answered via a custom "color wheel" (`RehabConditionWheel`) with internal IDs `turnkey / cosmetic / mid-light / mid-heavy / major / full-gut` — none of which are visible as plain-language labels in the excerpt reviewed (component itself wasn't read in full — see §8). If the wheel relies on color/position alone without a visible text label per segment, that's a comprehension and accessibility risk for a required field.
- **`ownerName`** (step 2.1, optional) asks the visitor to state the property's "Current Owner" as if it might differ from themselves — reasonable for inherited/trust situations, but for the common case (the visitor *is* the owner) it reads as a strange, faintly suspicious question this early, before any relationship has been established.
- **Auto-prefilled fields aren't marked as auto-filled.** RentCast silently populates `bedrooms`, `bathrooms`, `squareFootage`, `propertyType`, `garage`, `basement`, `askingPrice`, `yearBuilt`, `ownerName`, `yearsOwned` (`property-info-form.tsx:613-672`) with no visual distinction from user-typed values (no "auto-filled from public records, please verify" badge). Two consequences: (a) users may not notice or trust unexpected pre-filled values and re-type them anyway, defeating the purpose; (b) stale/wrong public-record data (e.g., an old `askingPrice` seeded from `lastSalePrice`) can silently poison a required field the user never looked at.
- **Language inconsistency**: the RentCast prefill loading indicator reads *"Obteniendo datos de la propiedad…"* (Spanish) in an otherwise fully English UI (`property-info-form.tsx:944`). Minor on its own, but it's the kind of detail that erodes trust in a moment ("did I load a broken page?").

### 3.3 Order of questions

Effort is heavily front-loaded and contact capture is pushed to the very end:

```
Address → 9 property fields → condition/repairs → situation → asking price → NAME/PHONE/EMAIL → consent
```

This is backwards for a business explicitly worried about losing leads to abandonment. The heaviest-effort, most speculative questions (condition, repairs, "ultimate goal", asking price — several of which require the user to know or guess things they may not have on hand) sit *before* the two fields (phone, email) that alone make a visitor "a lead" the business can follow up with.

### 3.4 Redundant or derivable fields

- `city`, `state`, `zipCode` are already derived from the Google Places selection (`lead-form-consent.tsx:120-136`) — good, no complaint there.
- `askingPrice` (required) and RentCast's AVM/`lastSalePrice` (already fetched automatically, `property-info-form.tsx:652-656`) overlap substantially in purpose. If the goal is "what does the seller want," it's a legitimate distinct question — but if RentCast's AVM is trustworthy enough to prefill it, the field's required-ness is worth reconsidering (see 3.5).
- `yearBuilt`, `propertyType`, `bedrooms`, `bathrooms`, `squareFootage`, `garage`, `basement` are all fields RentCast is already attempting to supply automatically. Asking users to fill/confirm all seven, un-differentiated from the four that stay genuinely subjective (`condition`, repairs, `occupied`, `ultimateGoal`), adds bulk to a step that's mostly redundant with data the system already fetched.

### 3.5 Unjustified required fields

- **`askingPrice`** is required (`property-info-form.tsx:52`) even though the copy directly under it says *"even a rough estimate is helpful"* (line 1317) — the copy concedes the field doesn't need precision, but the schema still blocks submission without a value. Given RentCast already supplies an AVM-based estimate as a fallback, this is a candidate to make optional or to default from the AVM value with an editable override.
- **`listedWithRealtor`**, **`ultimateGoal`**, **`occupied`** are reasonable to keep required for lead qualification, but note they currently block progress *before* the business has captured any way to reach the person answering them — see 3.1.
- **`condition`** (the wheel) is required and is arguably the single most valuable qualification signal in step 2 (it drives the offer math) — reasonable to keep required, but its visual-only nature (3.2) needs a comprehension check.

### 3.6 Validation and error handling

- Step 1: only one validated field (`address`), with a standard inline `FieldError` (`lead-form-consent.tsx:33-40`) — clean, low-risk.
- Step 2: validation is **inconsistent by sub-page**. Sub-page 1 (9 fields) has **no forward-gate at all** — `handleGoToPage2` never calls `trigger()` (`property-info-form.tsx:394-403`), so a user can advance with everything blank. Sub-pages 2–4 do gate on their required fields via `trigger([...])` before allowing "Next" (lines 417, 441). This inconsistency isn't harmful by itself (sub-page 1 has no required fields), but it does mean the *only* validation feedback pattern in this step is per-sub-page-on-advance, not real-time — mode is `onChange` for the form (line 278) so errors do clear reactively once fixed, that part is fine.
- Step 2 submit: if `/api/offers` fails, the code only `console.error`s (`property-info-form.tsx:547`) and continues to `/property-details` with the offer fields simply omitted — **the user is never told** their cash-offer computation failed, even though the whole funnel's stated purpose is "get an instant cash offer."
- Step 3 (the actual lead-capture submit): as covered in §1, the webhook call has **no success check** (`response.ok` is never inspected) and a caught network error still results in `router.push("/bookings")` (`property-details-form.tsx:135-157`). This is the highest-severity validation/error-handling gap in the whole flow — a real lead can vanish while the UI tells the user they succeeded.

### 3.7 Consent

- Positioning: real consent (`privacyConsent`, `smsConsent`) is collected at the *very last* moment, immediately before the final submit (`property-details-form.tsx:305-351`). From a legal-hygiene standpoint this is actually **defensible or even preferable** for the required Terms/Privacy checkbox — it sits right next to the action it gates (submitting PII), which is a common, reasonable pattern.
- However, the *file and step named* "consent" (`lead-form-consent.tsx`) collects none — it only takes an address and silently defaults `smsConsent` to `false`. This is a naming/expectation mismatch for future maintainers more than an end-user problem, but it means anyone assuming step 1 already handles consent (e.g., when reasoning about what data can legally be processed early) would be wrong.
- Substantively: address lookups (Google Places) and property-data lookups (RentCast, triggered automatically once an address is set — `property-info-form.tsx:582-688`) all happen *before* the user has agreed to any privacy policy. Address alone is unlikely to be treated as sensitive PII requiring prior consent under most US frameworks, but this is a legal question, not a CRO one — flagged explicitly for that review (see §7).
- TCPA-relevant SMS consent is implemented correctly as a genuinely optional, clearly-worded checkbox with opt-out instructions (`property-details-form.tsx:314-322`) — this part is solid.

### 3.8 Mobile

- Keyboard types are set correctly where it matters: `type="tel"` for phone (line 271), `type="email"` for email (line 290), `type="number"` for numeric property fields — good baseline hygiene.
- Native `<select>` dropdowns (7 of them: garage, basement, propertyType, closingTimeline, ultimateGoal, occupied, listedWithRealtor) render as OS-native pickers on mobile, which is the right choice for touch — no complaint there.
- **`PropertyProgress` labels are hidden below the `sm` breakpoint** (`hidden sm:inline` per the component review) — on mobile, precisely the device most likely to be used for this funnel, the progress indicator degrades to unlabeled dots, weakening the "how far am I" signal exactly where it's needed most.
- The custom `RehabConditionWheel` (condition picker) wasn't read in full in this review — its touch-target sizing on small screens is an open question (§8), but as a required field on a purpose-built visual control it's worth a dedicated tap-target/accessibility check.
- Scroll length per screen: step 2's sub-page 1 (9 fields + a live map embed + an editable address summary block) is the longest single screen in the funnel and is worth a real-device scroll-depth check.

### 3.9 Perceived progress

- `PropertyProgress` (6 labeled steps: Location, Property Info, Condition, Situation, Asking Price, Your Info) is **honest** — it derives state from real query params (`step2Complete`, `step3Complete`, `propInfoStep`) rather than being purely cosmetic, per the component review. This is a genuine strength to preserve in any redesign.
- It never states an absolute count ("Step 3 of 6") or a time estimate, so users can see *relative* position but not *how much is left* in concrete terms — compounding the mismatch with the "~2 minutes" promise made at the very start (`lead-form-consent.tsx:239`).
- Three of the six labeled steps (Condition, Situation, Asking Price) are sub-divisions of a single underlying route/step (`/property-info`) — accurate to the code, but it means the visual weight of "6 steps" somewhat overstates how distinct these stages actually are, which cuts both ways: it could increase perceived effort (bad for abandonment) or increase perceived thoroughness (good for trust in the resulting offer). Worth an A/B test rather than an assumption (see §6).

### 3.10 Accessibility

- Labels: mostly solid — visible `<label htmlFor>` on step 2/3 fields, and `sr-only` labels + `aria-describedby`/`aria-invalid` wiring on step 1 and step 3's text inputs (e.g. `property-details-form.tsx:240-241`). `FieldError` uses `role="alert"` consistently across all three files, which is correct for announcing validation errors to screen readers.
- The `condition` wheel is exposed to the form only via a `<input type="hidden">` (`property-info-form.tsx:1152`) with the actual interactive control being a custom component not reviewed in full — whether that component itself exposes proper roles/labels/keyboard operation for a *required* field is an open question worth a dedicated audit (§8).
- Checkbox groups (repairs checklist, step 2.2) use plain `<label><input type="checkbox">` pairs — accessible by default, no issue.
- No skip-link or explicit `aria-live` region announcing *step changes* (as opposed to individual field errors) was found — a screen-reader user advancing from sub-page 1 to 2 gets no explicit announcement that the content changed, though the `<h3>` heading text does change per sub-page, which partially mitigates this if focus management moves appropriately (not verified — component doesn't appear to manage focus on step change).

---

## 4. Redesign Proposal

### 4.1 Field classification

| Field | Current step | Classification | Rationale |
|---|---|---|---|
| `address` | 1 | **Imprescindible now** | Needed to compute an offer at all; low friction (autocomplete). |
| `phone` | 3 | **Imprescindible now — move earlier** | This *is* the lead. Should gate as early as possible, not last. |
| `firstName` | 3 | **Imprescindible now — move earlier** | Needed to personalize follow-up; pairs naturally with phone. |
| `email` | 3 | **Diferible to right after phone, same early screen** | Useful but a phone number alone is already a usable lead; keep the field but don't let it block if phone is present, or ask both together right after address. |
| `lastName` | 3 | **Diferible** | Nice for CRM hygiene, not required to start a follow-up call/text. |
| `privacyConsent` | 3 | **Imprescindible now, wherever contact fields land** | Must gate any collection/use of phone/email, keep adjacent to that submit. |
| `smsConsent` | 3 | **Diferible / keep optional** | Already correctly optional; keep near phone if phone moves earlier. |
| `condition` | 2.2 | **Imprescindible now** | Primary driver of the offer calculation; keep required. |
| `askingPrice` | 2.4 | **Diferible** | Copy itself says "a rough estimate is helpful"; RentCast AVM can pre-fill it as an editable default instead of demanding entry. |
| `listedWithRealtor` | 2.2 | **Imprescindible now** | Cheap to answer (Yes/No), materially qualifies the lead. |
| `occupied` | 2.3 | **Imprescindible now** | Cheap, materially affects offer/closing logistics. |
| `ultimateGoal` | 2.3 | **Imprescindible now** | Cheap (single select), high value for the follow-up call's framing. |
| `closingTimeline` | 2.3 | **Diferible** | Low cost either way, but genuinely optional info the call can capture. |
| `bedrooms`, `bathrooms`, `squareFootage`, `propertyType`, `yearBuilt`, `garage`, `basement` | 2.1 | **Diferible** | Already auto-fetched by RentCast in the background; show as a *confirm/edit* summary rather than 7 blank inputs to fill. |
| `ownerName` | 2.1 | **Diferible / move to follow-up call** | Low value pre-call for the common case; sensitive-sounding this early. |
| `yearsOwned` | 2.1 | **Diferible, and split** | If kept, split into a structured "how did you acquire it" select + optional year, rather than one free-text box (see 3.2). |
| `repairsChecklist` | 2.2 | **Diferible** | Useful detail, not blocking; fix the wording ambiguity (3.2) regardless of whether it stays required or becomes deferred. |
| `repairsNotes` | 2.2 | **Diferible** | Freeform detail, naturally suited to the follow-up call instead. |
| `fairPrice` | 2.4 (dead) | **Eliminable** | No UI renders it; either build the intended UI or remove the schema/forwarding code. |
| `repairsEstimate` | 2.2 (dead) | **Eliminable** | Same — state and `setValue` exist with no control; remove or finish it. |

### 4.2 Proposed reordering

```
1. Address                     (unchanged — already minimal, autocomplete-driven)
2. Phone + First name          (NEW early gate — see 4.3)
   + privacyConsent checkbox
3. Property snapshot            (RentCast-prefilled summary: bed/bath/sqft/type/year —
                                  "confirm or edit" rather than blank inputs)
4. Condition (wheel, required) + Listed-with-realtor (required)
5. Situation: occupied + ultimate goal (required) + closing timeline (optional)
6. Asking price (optional, AVM-prefilled, editable) + email/last name (optional)
7. Confirmation / booking (unchanged flow into /bookings)
```

Logic behind each move:
- **Phone+name pulled to position 2**, right after address, because address alone isn't enough to start a follow-up, but address+phone is. This is the single change that most directly addresses the "no data if abandoned" problem, short of building full incremental persistence (4.3).
- **Property snapshot reframed as confirm/edit** instead of 9 blank fields, since RentCast already fetches these values — this cuts perceived step 2.1 effort roughly in half without losing data quality (arguably improving it, since it's sourced from public records rather than user recall).
- **Condition and listing status kept early in the qualification block** since they're cheap, required, and materially change the offer.
- **Asking price and email demoted to optional/late** since a phone-having lead is already actionable; both can be captured on the follow-up call if skipped.

### 4.3 Early-capture strategy (the core recommendation)

Two complementary approaches, ordered by effort:

1. **Minimum-viable fix (low effort):** reorder fields per 4.2 so phone becomes reachable by field #2 instead of field #20+. This alone doesn't persist anything server-side, but it means a much larger share of abandoners will have already typed a phone number into a field the app *could* capture — see #2 below.
2. **Incremental capture (structural change):** add a lightweight persistence call the moment `phone` (or `email`) passes validation on the new early screen — e.g., a `POST` to a "partial lead" endpoint or directly to a CRM-side "partial" webhook, distinct from the final full-record webhook at step 3. This is the only approach that actually solves "we lose everything if they don't finish," since URL-based state alone never leaves the visitor's browser.
   - This requires a decision on where partial leads land (a lightweight endpoint, a second GHL webhook tagged "partial," etc.) — flagged as an open question in §8 since it's a backend/CRM decision, not a form-UX one.
   - A `beforeunload`/`visibilitychange`-triggered "best-effort" submit of whatever's filled so far is a viable low-effort supplement, but should not be the *only* mechanism — it's unreliable (mobile Safari and background tabs routinely skip these events).

### 4.4 Abandonment recovery

- **Resume-by-link**: once phone/email is captured early (4.3), a "finish getting your offer" SMS/email with a link carrying the existing URL query string would let a user resume exactly where they left off, since the flow already reconstructs full state from `URLSearchParams`. This is a natural fit for the current architecture and requires no new state-restoration logic — only a delivery mechanism.
- **Assisted continuation**: because the follow-up call already exists as a planned touchpoint (per the "Why Spencer" content shown to users), a rep calling a phone-only partial lead *is* a form of recovery — this is arguably a bigger lift-to-value win than building automated resume links, and should be sequenced after 4.3 makes partial leads exist at all.

### 4.5 Friction-reduction techniques applicable here

- **Progressive disclosure**: the property snapshot (4.2 step 3) as a compact summary card with an "edit details" expander, rather than 9 open fields, is the most direct application — the data (from RentCast) is already there, the UI just needs to stop presenting it as a blank form.
- **Sensible defaults**: `askingPrice` defaulting to the RentCast AVM value (already fetched, `property-info-form.tsx:652-656`) instead of requiring manual entry — user edits only if they disagree.
- **Selectable options over free text**: `yearsOwned` (3.2) is the clearest candidate — replace with a short select ("Less than 1 year / 1–5 years / 5+ years / Inherited") plus an optional year field, rather than one ambiguous text box.
- **Conditional logic**: if `listedWithRealtor = Yes`, the flow could skip or soften `askingPrice`/`ultimateGoal` framing (a listed property already has different logistics) — not currently done anywhere in the form; every question is shown to every user regardless of prior answers.
- **Visual grouping**: already reasonably well done via `SectionHeading` components; no major complaint here.

### 4.6 Capturing rich property data without lengthening the form

This is explicitly the hard part — shortening the form without losing signal:

- **Photo upload as an optional, incentivized micro-step** after the required fields are done (e.g., on the `/bookings` confirmation screen, framed as "upload a few photos to speed up your offer review") — this defers effort to a moment when the user has already committed, and photos are arguably higher-signal for repair/condition estimation than several of the current select fields combined.
- **Post-submit enrichment**: since RentCast is already integrated and called automatically, its response (`avmResult` state, currently only used to prefill inputs and otherwise discarded — `property-info-form.tsx:244,609`) could be captured and stored in full alongside the lead record even when the corresponding form fields were left blank/skipped by the user — the raw API response already contains more than what's mapped into form fields today.
- **The follow-up call as the primary rich-data channel**: fields explicitly marked "Diferible" in 4.1 (repairs notes, owner name, exact closing timeline) are naturally suited to a live conversation, where a rep can ask follow-ups and capture nuance a form field can't — this is consistent with how the business already frames the process ("one of our home buying specialists will reach out").
- **Optional deep-dive step, clearly labeled skippable**: for users who *do* want a more precise offer up front, keep the full repairs checklist/notes available as an explicitly optional "Get a more precise offer" expander rather than removing it — this preserves the option for motivated sellers without imposing it on everyone.

---

## 5. Prioritization Table

| # | Recommendation | Conversion impact | Effort | Risk | Wave | Priority |
|---|---|---|---|---|---|---|
| 1 | Fix silent webhook-failure bug — check `response.ok`, surface a real error/retry, don't redirect to a false success screen (`property-details-form.tsx:136-157`) | High (protects leads already at the finish line) | Low | Low | Quick win | **P0** |
| 2 | Instrument step/field-level analytics (see §6) | High (unblocks every future decision) | Low–Med | Low | Quick win | **P0** |
| 3 | Fix repairs-checklist wording ambiguity (`property-info-form.tsx:1158`) | Low–Med (data quality, not conversion) | Low | Low | Quick win | P1 |
| 4 | Fix Spanish string in prefill loader (`property-info-form.tsx:944`) | Low | Low | None | Quick win | P2 |
| 5 | Remove or finish dead fields `repairsEstimate`/`fairPrice` | Low | Low | Low | Quick win | P2 |
| 6 | Mark auto-prefilled fields as "auto-filled, please verify" | Med (trust, data quality) | Low | Low | Quick win | P1 |
| 7 | Default `askingPrice` from RentCast AVM and make it optional | Med | Low–Med (schema + copy change) | Low | Quick win | P1 |
| 8 | Show `PropertyProgress` labels on mobile, or add "Step X of 6" text | Low–Med | Low | Low | Quick win | P2 |
| 9 | Reorder fields: pull phone+first name to position 2 (4.2) | High | Med (schema/flow restructure across 2 files) | Med (changes what "step 1" means for every marketing page linking here) | Structural | **P0** |
| 10 | Turn step 2.1's 9 property fields into a confirm/edit summary instead of blank inputs | Med–High | Med | Low | Structural | P1 |
| 11 | Add conditional logic (e.g., skip/soften fields when `listedWithRealtor = Yes`) | Low–Med | Med | Low | Structural | P2 |
| 12 | Adopt the existing (unused) `MultiStepLeadForm` for a true single-page, no-navigation flow | Med (perceived speed) | Med | Med (behavior change across 9+ entry pages) | Structural | P2 |
| 13 | Incremental server-side capture on early phone/email entry (4.3) | **Highest** — directly solves the "zero leads on abandonment" problem | High (needs a backend/CRM decision — see §8) | Med (partial-lead handling process must exist on the sales-ops side) | Major bet | **P0** |
| 14 | Resume-by-link for abandoned partial leads (4.4) | Med–High | Med (depends on #13 existing first) | Low | Major bet | P1 |
| 15 | Photo-upload micro-step post-submit | Med (data richness, not raw conversion) | Med–High (needs upload infra + storage decision) | Low | Major bet | P2 |
| 16 | Full split of `yearsOwned` into structured select + optional year | Low | Low–Med | Low | Quick win | P2 |

---

## 6. Measurement Plan

### 6.1 Events to instrument

| Event | Fires when | Why |
|---|---|---|
| `lead_step_view` (with `step`, `substep`) | Each screen/sub-page mount | Baseline funnel view counts per step — currently completely absent |
| `lead_step_complete` | Each "Next"/submit that successfully advances | Step-level completion rate |
| `lead_field_blur_empty` (with `field`) | A required field is blurred still empty, or a validation error is shown | Field-level friction — which specific fields cause hesitation/errors |
| `lead_form_abandon` | `beforeunload`/`visibilitychange` fires while a form step is active and unsubmitted | Best-effort abandonment signal (supplement, not primary — see 4.3 caveat) |
| `lead_partial_captured` | The early phone/email capture (once built, §4.3) succeeds | The metric that directly answers "did we stop losing leads" |
| `lead_webhook_result` (success/failure) | Immediately after the step-3 webhook call, based on `response.ok` | Currently invisible — needed the moment the bug in Rec. #1 is fixed |
| `offer_calc_result` (success/failure) | After `/api/offers` resolves | Surfaces the silently-swallowed failure path noted in §3.6 |

### 6.2 Before/after metrics

- **Completion rate**: sessions reaching the final step-3 submit ÷ sessions starting step 1.
- **Contact-capture rate** (new north star post-4.3): sessions where phone or email was ever captured (partial or full) ÷ sessions starting step 1 — this is the metric that should move most from the early-capture change, independent of full completion.
- **Time-to-complete**: median wall-clock time from step 1 start to step 3 submit, to check the "~2 minutes" claim against reality.
- **Property-profile completeness**: average % of optional property fields filled per completed lead — watch this after deferring fields (4.1) to confirm rich data isn't being lost, only relocated (to the call, to post-submit steps).
- **Lead quality**: a sales-ops-side metric (e.g., % of leads that reach a booked appointment, or that the team rates as "real/qualified") — needed to check the tradeoff called out in §7 (shorter form ≠ automatically better leads).
- **Webhook success rate**: % of step-3 submits where the CRM webhook actually returned success — currently unmeasured and, per §1, possibly not 100%.

### 6.3 Hypotheses worth an A/B test before committing

| Hypothesis | Variant to test | What it validates |
|---|---|---|
| Moving phone+name earlier increases contact-capture rate without tanking full completion | Current order vs. reordered per §4.2 | Whether front-loading contact info costs more full-completions than it gains in partial captures |
| RentCast auto-prefill increases trust/completion when explicitly labeled | Unlabeled prefill (current) vs. "auto-filled from public records — please confirm" badge | Whether users are silently distrusting/overwriting good data |
| Making `askingPrice` optional (AVM-defaulted) doesn't reduce lead quality | Required (current) vs. optional+AVM-default | Whether the required-ness was actually load-bearing for qualification, or just friction |
| A visible "Step X of 6, ~N min left" increases completion vs. the current unlabeled progress bar | Current `PropertyProgress` vs. same component + explicit count/time | Whether the honesty of the indicator (already good) is being undermined by its vagueness |

---

## 7. Risks and Trade-offs

- **Shortening/deferring fields means less pre-call context for the sales team.** Every field moved to "Diferible" (repairs notes, owner name, exact timeline) shifts that data-gathering burden onto the phone call, which costs rep time and depends on reaching the person — a lead who never picks up now yields a thinner profile than today's form would have produced, if they'd completed it.
- **Early phone/email capture without full completion changes what "a lead" means operationally.** If sales ops today expects every inbound lead to have condition/situation/price context attached, a wave of phone-only partial leads (from §4.3) will look different from what they're used to processing, and needs a workflow decision (how are partial leads triaged vs. full ones?) before shipping — this is explicitly called out as open in §8.
- **Incremental/partial capture (Rec. #13) means collecting and storing PII (name, phone, email) before the user has seen the final Terms/Privacy checkbox**, if that checkbox stays at its current position. Moving contact capture earlier without also moving (or duplicating) consent capture earlier creates a real sequencing question with legal weight, not just a UX one — recommend explicit legal sign-off before implementing 4.3, specifically on whether consent needs to move with it or can remain a separate, later gate for *marketing use* while collection itself is permissible.
- **The webhook-failure fix (Rec. #1) will, by design, start surfacing failures that were previously invisible.** Expect the *reported* success rate to look worse immediately after shipping it — that's the fix working, not a regression, but it should be communicated to stakeholders in advance so a metrics dip isn't misread as a new problem.
- **Deferring `askingPrice` to optional risks lower-quality initial offers**, since the whole `/api/offers` computation currently assumes a value is present; making it optional requires deciding a sane fallback (pure-AVM-based offer) and being explicit with the user that the offer is preliminary until a price is provided.
- **Adopting the unused `MultiStepLeadForm` (Rec. #12)** changes routing behavior across 9+ existing marketing entry points simultaneously — worth a phased rollout (one entry page first) rather than a global switch, given how many pages currently depend on the route-based behavior.

---

## 8. Assumptions and Open Questions

- **The GHL booking-widget calendar (step 4, inside a cross-origin iframe) was not auditable from this codebase** — its own field count, required info, and abandonment behavior are unknown and outside this review's scope. If the business wants a full-funnel view (through actual appointment booking, not just lead capture), that widget needs its own audit via GHL's own analytics/config.
- **`components/ui/rehab-condition-wheel.tsx`** (the custom `condition` control) was not read in full during this review — its accessibility (keyboard operability, ARIA roles, visible text labels per option) and mobile tap-target sizing are assumed adequate but unverified; flagged as a follow-up.
- **Where partial-lead data (§4.3) should land** — a new lightweight endpoint, a second GHL webhook, or something else — is a backend/CRM-ops decision outside this form-UX review; the recommendation assumes *some* such destination will be decided, not which one.
- **Whether GHL/leadconnectorhq enforces its own dedup or partial-record merging** if the same lead is submitted twice (once partial, once full) is unknown — needs confirmation with whoever owns the GHL configuration before implementing incremental capture, to avoid creating duplicate contact records.
- **The precise legal requirement around consent timing** for collecting address/phone before a Terms/Privacy checkbox is agreed to is a jurisdiction-specific legal question (this review assumes Tennessee/Mississippi-focused operations per `CLAUDE.md`, but did not attempt a legal determination) — flagged explicitly in §7 for legal review, not answered here.
- **Whether `smsConsent`'s current hidden-default-false field in step 1 (`lead-form-consent.tsx:26,65`) is intentional scaffolding for a future step-1 SMS opt-in, or simply vestigial**, wasn't determinable from the code alone — worth a quick confirmation with whoever last touched that file.
- **No test suite exists in this repo** (confirmed via `CLAUDE.md`), so none of the recommendations above could be validated against existing automated coverage — any implementation of §4/§5 should budget time for manual QA across the reordered flow.
