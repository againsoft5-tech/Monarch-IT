# Combo Campaign মডিউল — কীভাবে কাজ করে

এই ডকুমেন্টে **Combo Campaign** ফিচারটা (কম্বো ডিসকাউন্ট সিস্টেম) ভেতর থেকে কীভাবে কাজ করে তার একটা পূর্ণাঙ্গ বিবরণ দেওয়া আছে — ডেটা কোথায় থাকে, অ্যাডমিন প্যানেল থেকে কীভাবে ম্যানেজ করা হয়, স্টোরফ্রন্টে কাস্টমার কীভাবে দেখে, আর প্রাইসিং হিসাবটা ঠিক কীভাবে হয়।

---

## ১. মূল ধারণা

একটা **Combo Campaign** হলো কয়েকটা প্রোডাক্ট গ্রুপের (যেমন: Laptop, Monitor, Headphone) সমষ্টি, যেখানে কাস্টমার প্রতিটা গ্রুপ থেকে একটা করে (বা একাধিক, যদি অনুমতি থাকে) প্রোডাক্ট বেছে নিয়ে একসাথে কিনলে বাড়তি ছাড় ("Combo Bonus") পায়।

দুই লেয়ারে ছাড় কাজ করে:
1. **প্রোডাক্ট-লেভেল ছাড়** — প্রতিটা প্রোডাক্টের নিজস্ব `priceOld` থেকে `discountValue` (fixed ৳ বা %) বাদ দিয়ে `priceNew` হয়।
2. **কম্বো বোনাস** — কতগুলো গ্রুপ থেকে প্রোডাক্ট সিলেক্ট করা হয়েছে তার উপর ভিত্তি করে (২+, ৩+, ৪+ ইত্যাদি) বাড়তি একটা ছাড় (fixed ৳ বা %) — এটাকে **Bonus Tier** বলে।

---

## ২. ডেটা মডেল (`src/data/comboData.ts`)

```ts
type DiscountType = 'percent' | 'fixed'

type ComboProduct = {
  id: string
  name: string
  image: string
  brand: string
  priceOld: number
  discountType: DiscountType
  discountValue: number
  specs?: string[]
  slug?: string   // মূল ক্যাটালগ প্রোডাক্টের slug (ক্যাটালগ থেকে ইমপোর্ট করা হলে)
}

type ComboGroup = {
  key: string           // যেমন 'laptop', 'monitor'
  label: string         // UI-তে যা দেখা যায়
  required: boolean     // এই গ্রুপ থেকে অন্তত একটা প্রোডাক্ট বাধ্যতামূলক কিনা
  maxQuantity: number   // এই গ্রুপ থেকে সর্বোচ্চ কয়টা প্রোডাক্ট নেওয়া যাবে
  products: ComboProduct[]
}

type ComboBonusTier = {
  minGroups: number     // অন্তত এতগুলো গ্রুপ থেকে সিলেকশন থাকলে এই টায়ার প্রযোজ্য
  bonusType: DiscountType
  bonusAmount: number
}

type ComboCampaign = {
  id: string
  name: string
  active: boolean       // false হলে স্টোরফ্রন্টে দেখা যাবে না
  startDate?: string
  endDate?: string
  themeColor?: string
  bannerImage?: string
  groups: ComboGroup[]
  bonusTiers: ComboBonusTier[]
  createdAt: string
  updatedAt: string
}
```

**হেল্পার ফাংশন:**
- `priceNewOf(product)` — প্রোডাক্টের ডিসকাউন্ট-পরবর্তী দাম বের করে।
- `discountAmountOf(product)` — `priceOld - priceNewOf(product)`, অর্থাৎ কত টাকা ছাড় হচ্ছে।

**`DEFAULT_CAMPAIGNS`** — প্রথমবার লোড হলে seed হিসেবে বসে যাওয়া ডেমো ক্যাম্পেইন (বর্তমানে "NAS Combo Builder", real প্রোডাক্ট ইমেজসহ)।

---

## ৩. ডেটা কোথায় থাকে (`src/lib/comboStore.ts`)

⚠️ **কোনো ডেটাবেজ নেই।** সব ক্যাম্পেইন ডেটা ব্রাউজারের **`localStorage`**-এ থাকে, key: `monarch_combo_campaigns`।

- প্রথমবার কেউ সাইটে আসলে (localStorage খালি থাকলে) `DEFAULT_CAMPAIGNS` সিড হিসেবে সেভ হয়ে যায়।
- একই ব্রাউজারের একাধিক ট্যাব সিঙ্কে রাখতে **`BroadcastChannel`** ব্যবহার হয় (`monarch-combo-sync` চ্যানেল) — এক ট্যাবে অ্যাডমিন প্যানেলে কিছু বদলালে অন্য ট্যাবের স্টোরফ্রন্ট সাথে সাথে আপডেট হয়ে যায়।
- `useComboStore()` — একটা React hook, পুরো DB (`Record<campaignId, ComboCampaign>`) রিটার্ন করে এবং যেকোনো পরিবর্তনে re-render ট্রিগার করে।

**⚠️ গুরুত্বপূর্ণ সীমাবদ্ধতা:** যেহেতু localStorage per-browser, তাই এক ব্রাউজারে বানানো ক্যাম্পেইন অন্য ব্রাউজার/ডিভাইসে দেখা যাবে না। এটা প্রোডাকশন-রেডি ডেটাবেজ সিস্টেম না, বরং একটা ডেমো/প্রোটোটাইপ ইমপ্লিমেন্টেশন।

### CRUD ফাংশনসমূহ
| ফাংশন | কাজ |
|---|---|
| `createCampaign(name)` | নতুন ক্যাম্পেইন বানায় (id = slugified name) |
| `deleteCampaign(id)` | ক্যাম্পেইন মুছে ফেলে |
| `duplicateCampaign(id)` | কপি বানায় |
| `updateCampaignMeta(id, patch)` | নাম, তারিখ, থিম কালার ইত্যাদি বদলায় |
| `setCampaignStatus(id, active)` | Active/Inactive টগল করে |
| `updateBonusTiers(id, tiers)` | বোনাস টায়ার লিস্ট বদলায় |
| `addGroup` / `updateGroup` / `deleteGroup` | গ্রুপ ম্যানেজমেন্ট |
| `addCatalogProductToGroup(id, groupKey, product)` | মূল ক্যাটালগ থেকে সার্চ করে একটা প্রোডাক্ট গ্রুপের **শুরুতে** যোগ করে (slug-সহ) |
| `importCategoryIntoGroup(id, groupKey, categorySlug)` | একটা পুরো ক্যাটাগরির সব প্রোডাক্ট বাল্কে ইমপোর্ট করে (slug-সহ, ডুপ্লিকেট স্কিপ করে) |
| `updateProduct` / `removeProduct` | গ্রুপের ভেতর প্রোডাক্ট এডিট/রিমুভ |

---

## ৪. প্রাইসিং ইঞ্জিন — `computeComboPricing(campaign, selections)`

এটাই পুরো সিস্টেমের হৃদয়। `selections` মানে `{ [groupKey]: ComboProduct[] }` — কাস্টমার কোন গ্রুপ থেকে কী বেছেছে।

```
subtotal      = সিলেক্ট করা সব প্রোডাক্টের priceNewOf যোগফল
regularTotal  = সিলেক্ট করা সব প্রোডাক্টের priceOld যোগফল
productDiscount = regularTotal - subtotal
unlockedGroups  = কতগুলো গ্রুপ থেকে অন্তত ১টা প্রোডাক্ট সিলেক্ট করা হয়েছে
```

**Bonus Tier সিলেকশন নিয়ম:** `unlockedGroups`-এর ভিত্তিতে যতগুলো টায়ার যোগ্য (`minGroups <= unlockedGroups`), তাদের মধ্যে **সবচেয়ে বেশি `minGroups`-ওয়ালা টায়ার**টাই প্রযোজ্য হয় — সবচেয়ে বেশি *ছাড়*-ওয়ালা টায়ার না। অর্থাৎ "2+ groups → 5% off" আর "3+ groups → ৳200 off" থাকলে, ৩টা গ্রুপ সিলেক্ট করলে ৳200-ই প্রযোজ্য হবে, ৫% যতই বড় সংখ্যা হোক না কেন।

```
comboBonus = bestTier.bonusType === 'percent' ? subtotal * bonusAmount/100 : bonusAmount
total      = subtotal - comboBonus
```

---

## ৫. অ্যাডমিন প্যানেল (`/admin/combo`)

| রুট | কাজ |
|---|---|
| `/admin/combo` | সব ক্যাম্পেইনের লিস্ট, নতুন বানানো / Activate-Deactivate / Duplicate / Delete |
| `/admin/combo/[campaignId]` | একটা ক্যাম্পেইন এডিট করার পেজ (`ComboCampaignEditor.tsx`), ৪টা ট্যাব: |

**Setup** — নাম, campaign ID (slug), তারিখ, থিম কালার, ব্যানার ইমেজ।

**Groups** — কতগুলো গ্রুপ (Laptop/Monitor/...) থাকবে, required কিনা, কতগুলো নেওয়া যাবে।

**Products** — প্রতিটা গ্রুপের প্রোডাক্ট ম্যানেজ করার জায়গা:
- **Import from category** — পুরো ক্যাটাগরি (যেমন 'laptop') একসাথে ইমপোর্ট।
- **Import from product** — নাম দিয়ে সার্চ করে নির্দিষ্ট একটা প্রোডাক্ট ইমপোর্ট (dropdown-এ রেজাল্ট দেখায়, ক্লিক করলে গ্রুপের শুরুতে যোগ হয়)।
- **Search products in this group** — এই গ্রুপে ইতিমধ্যে যোগ করা প্রোডাক্টের মধ্যে সার্চ/ফিল্টার।
- প্রতিটা প্রোডাক্ট রো-তে নাম/দাম/ডিসকাউন্ট টাইপ-ভ্যালু সরাসরি এডিট করা যায়।

**Bonus & Publish** — Bonus Tier যোগ/মুছা (Fixed ৳ বা Percent % বেছে নেওয়া যায়), আর Activate/Deactivate বাটন।

---

## ৬. স্টোরফ্রন্ট (`/combo`)

| রুট | কম্পোনেন্ট | কাজ |
|---|---|---|
| `/combo` | `ComboGallery.tsx` | সব active ক্যাম্পেইনের গ্যালারি |
| `/combo/[campaignId]` | `ComboBuilderPage.tsx` | মূল "Build Your Own Combo" পেজ |

`ComboBuilderPage`-এর ভেতরে:
- **`CategoryTabs`** — গ্রুপ বদলানোর ট্যাব (কতটা সিলেক্ট করা হয়েছে তার ব্যাজসহ)।
- **`ProductGrid`** — একটা গ্রুপের প্রোডাক্ট লিস্ট (ব্র্যান্ড ফিল্টার, সর্ট, সার্চ বক্স — ট্যাব বদলালে `key={group.key}` দিয়ে রিমাউন্ট হয়ে সব ফিল্টার/সার্চ রিসেট হয়ে যায়)।
- **`SuggestedCombos`** — ট্যাবের উপরে অটো-জেনারেটেড ২টা কার্ড: **Budget Combo** (প্রতি গ্রুপ থেকে সবচেয়ে সস্তা প্রোডাক্ট) আর **Premium Combo** (সবচেয়ে দামি) — সরাসরি cart-এ অ্যাড অথবা বিল্ডারে লোড করার অপশনসহ।
- **`ComboSummarySidebar`** — ডানপাশের সামারি (Regular Price / Combo Savings / Subtotal), "Add all to cart" বাটন ২+ গ্রুপ সিলেক্ট না হওয়া পর্যন্ত disabled থাকে।

**Cart-এ যাওয়ার সময়:** কম্বো বোনাসটা প্রতিটা আইটেমের দামে *প্রোপোরশনালি* ভাগ করে বসিয়ে দেওয়া হয় (`commitSelectionsToCart` / `handleAddToCart`), যাতে cart আর checkout পেজে ঠিক সেই Subtotal-ই দেখা যায় যেটা বিল্ডারে দেখানো হয়েছিল।

---

## ৭. প্রোডাক্ট পেজে অটো-কম্বো (`ProductComboSection.tsx`)

যেকোনো প্রোডাক্টের ডিটেইল পেজে (`/[slug]`) এই সেকশন **অটোমেটিক** দেখা যায়, যদি সেই প্রোডাক্টটা কোনো active combo campaign-এর কোনো গ্রুপে থাকে (ক্যাটালগ থেকে ইমপোর্ট করা হয়ে থাকলে)।

- **`findBestComboForProductSlug(db, slug)`** (`comboStore.ts`) — সব active ক্যাম্পেইন ঘুরে দেখে, কোথায় এই slug ম্যাচ করে।
  - প্রোডাক্ট নিজে যে গ্রুপে আছে সেটা "লক" থাকে (Currently Viewing, checkbox বন্ধ)।
  - বাকি প্রতিটা গ্রুপ থেকে **সবচেয়ে বেশি discount** (`discountAmountOf`) দেওয়া প্রোডাক্টটা অটো-সিলেক্ট হয় ("Best Deal" লজিক)।
  - একই প্রোডাক্ট **একাধিক ক্যাম্পেইনে** থাকলে, যেই ক্যাম্পেইন **সবচেয়ে বেশি মোট savings** (Regular Price − Subtotal) দেয়, সেটাই দেখানো হয়।
  - পুরনো ডেটা (যেগুলোতে `slug` ফিল্ড নেই) ব্যাকওয়ার্ড-কম্প্যাটিবলভাবে সাপোর্ট করে — `id`-এর প্যাটার্ন (`${groupKey}-${slug}`) থেকে slug বের করার চেষ্টা করে।
- সেকশনে "Currently Viewing" আইটেমটা সবসময় লিস্টের **সবার উপরে** দেখানো হয়, তার গ্রুপ ক্যাম্পেইনে যেখানেই থাকুক না কেন।
- checkbox দিয়ে অন্য আইটেম বাদ/যোগ করলে দাম রিয়েল-টাইমে রিক্যালকুলেট হয়।
- "Build your own combo →" লিংক পূর্ণাঙ্গ `ComboBuilderPage`-এ নিয়ে যায়।

---

## ৮. ফাইল ম্যাপ

```
src/data/comboData.ts              ← টাইপ + priceNewOf/discountAmountOf + DEFAULT_CAMPAIGNS সিড
src/lib/comboStore.ts              ← localStorage store, CRUD, pricing engine, product-page matcher

src/app/admin/combo/page.tsx                    ← অ্যাডমিন: ক্যাম্পেইন লিস্ট
src/app/admin/combo/[campaignId]/page.tsx       ← অ্যাডমিন: এডিটর রুট
src/components/admin/combo/ComboCampaignEditor.tsx  ← অ্যাডমিন: এডিটর UI (Setup/Groups/Products/Bonus)

src/app/combo/page.tsx                          ← স্টোরফ্রন্ট: গ্যালারি রুট
src/app/combo/[campaignId]/page.tsx             ← স্টোরফ্রন্ট: বিল্ডার রুট
src/components/combo/ComboGallery.tsx           ← গ্যালারি UI
src/components/combo/ComboBuilderPage.tsx       ← বিল্ডার পেজ (state + cart logic)
src/components/combo/CategoryTabs.tsx           ← গ্রুপ ট্যাব
src/components/combo/ProductGrid.tsx            ← গ্রুপের প্রোডাক্ট লিস্ট (ব্র্যান্ড/সর্ট/সার্চ)
src/components/combo/SuggestedCombos.tsx        ← Budget/Premium অটো-কার্ড
src/components/combo/ComboSummarySidebar.tsx    ← ডানপাশের সামারি + cart বাটন

src/components/product/ProductComboSection.tsx  ← প্রোডাক্ট পেজে অটো "Combo Up" সেকশন
src/components/product/ProductDetailPage.tsx    ← এখানে ProductComboSection বসানো আছে
```

---

## ৯. মনে রাখার মতো কিছু জিনিস

- **ডেটাবেজ নেই** — সব কিছু localStorage-ভিত্তিক, ডেমো/প্রোটোটাইপ স্কেলের জন্য উপযুক্ত, প্রোডাকশনে আসল ডেটাবেজ লাগবে।
- Combo campaign-এর প্রোডাক্ট আর মূল স্টোরের প্রোডাক্ট **আলাদা রেকর্ড** — লিংক থাকে শুধু `slug` ফিল্ড দিয়ে, আর সেটা তখনই বসে যখন অ্যাডমিন "Import from category" বা "Import from product" দিয়ে ক্যাটালগ থেকে যোগ করে। হাতে-লেখা (custom/seeded) কম্বো প্রোডাক্টের কোনো real product page না-ও থাকতে পারে।
- Admin dashboard-এর (`/admin`) stat card ও sidebar badge-এ combo campaign সংখ্যা/active campaign count সরাসরি এই store থেকেই আসে (`useComboStore()`)।
