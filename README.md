# Monarch IT — Next.js প্রজেক্ট ডকুমেন্টেশন (বাংলা)

এটা **Monarch IT** নামের একটা বাংলাদেশি e-commerce সাইটের সোর্স কোড, যেটা তৈরি হয়েছে **Next.js (App Router)**, **React 19**, **TypeScript** আর **Tailwind CSS v4** দিয়ে।

## শুরু করার নিয়ম

```bash
npm install
npm run dev
```

তারপর ব্রাউজারে [http://localhost:3000](http://localhost:3000) ওপেন করলেই সাইট দেখা যাবে।

অন্যান্য কমান্ড:

```bash
npm run build   # প্রোডাকশন বিল্ড তৈরি করে
npm run start   # প্রোডাকশন বিল্ড রান করে
```

---

## ফোল্ডার স্ট্রাকচার — কোথায় কী থাকে

Next.js-এর **App Router** সিস্টেমে **ফোল্ডার নিজেই URL ঠিক করে** — অর্থাৎ `src/app/` এর ভেতরের প্রতিটা ফোল্ডার সরাসরি একটা URL path বোঝায়, আর সেই ফোল্ডারের ভেতরে থাকা `page.tsx` ফাইলটাই আসলে সেই route-এ রেন্ডার হয়।

```
src/
├── app/                    ← রাউট (URL ↔ ফোল্ডার)
│   ├── layout.tsx           → root layout, প্রতিটা পেজকে র‍্যাপ করে (Header/Footer/SideMenu এখানে বসানো)
│   ├── page.tsx              →  /            (হোম পেজ)
│   ├── globals.css           → গ্লোবাল CSS, Tailwind এর এন্ট্রি পয়েন্ট
│   ├── checkout/
│   │   ├── page.tsx           →  /checkout
│   │   └── cart/page.tsx       →  /checkout/cart
│   ├── compare/page.tsx      →  /compare
│   ├── login/page.tsx        →  /login
│   ├── register/page.tsx     →  /register
│   ├── order-track/page.tsx  →  /order-track
│   ├── pc-builder/page.tsx   →  /pc-builder
│   └── [slug]/page.tsx       →  ডাইনামিক রাউট, যেমন /processor, /amd-ryzen-5-5600
│
├── components/              ← UI কোড (এগুলো রাউট না)
│   ├── layout/                → Header, MobileHeader, Footer, SideMenu (সব পেজে শেয়ার্ড)
│   ├── home/                  → শুধু হোম পেজের সেকশনগুলো
│   ├── category/              → CategoryPage, Breadcrumbs
│   ├── product/                → ProductDetailPage এবং সংশ্লিষ্ট কম্পোনেন্ট
│   ├── pcbuilder/               → PC Builder ফিচারের সব কোড
│   ├── chat/                    → ChatWidget (পপআপ চ্যাট মডিউল)
│   └── ui/                      → জেনেরিক reusable অংশ (Toast, CartDrawer)
│
├── context/                 ← React Context (গ্লোবাল state, ক্লায়েন্ট সাইড)
│   ├── CartContext.tsx
│   ├── AuthContext.tsx
│   ├── WishlistContext.tsx
│   └── CompareContext.tsx
│
└── data/                    ← স্ট্যাটিক/mock ডেটা (কোনো ডেটাবেজ নেই — সব ডেটা কোডেই লেখা)
    ├── products.ts, categoryProducts.ts, categoryRegistry.ts
    ├── productDetail.ts, searchIndex.ts, brands.ts, coupons.ts
    ├── bdLocations.ts, cart.ts
    └── pcBuilderData.ts
```

**সহজ নিয়ম:** `app/` ঠিক করে *কোন URL-এ কী রেন্ডার হবে*; `components/` এ থাকে আসল UI; আর `page.tsx` ফাইলগুলো সাধারণত খুবই পাতলা হয় — শুধু দরকারি ডেটা বেছে নিয়ে `components/` থেকে একটা কম্পোনেন্ট রেন্ডার করে।

---

## রাউটিং কনভেনশন

| Path প্যাটার্ন | মানে কী |
|---|---|
| `app/page.tsx` | `/` রাউট (হোম পেজ) |
| `app/checkout/page.tsx` | `/checkout` রাউট |
| `app/checkout/cart/page.tsx` | নেস্টেড ফোল্ডার → নেস্টেড URL: `/checkout/cart` |
| `app/[slug]/page.tsx` | **ডাইনামিক সেগমেন্ট** — `[slug]` যেকোনো একটা path অংশের সাথে ম্যাচ করে, যেমন `/anything-here`। আসল ভ্যালুটা `params` প্রপ থেকে পড়া হয়। |
| `app/layout.tsx` | এটা নিজে কোনো রাউট না — এটা একটা **শেয়ার্ড wrapper**, যার ভেতরে প্রতিটা পেজ রেন্ডার হয়। |

### উদাহরণ: `app/[slug]/page.tsx`

তুমি এখন যেটা খুলেছ (README.md) তার আগে যেটা খুলেছিলে — এই একটামাত্র ডাইনামিক রাউট **প্রোডাক্ট পেজ** এবং **ক্যাটাগরি পেজ** — দুটোরই কাজ করে। slug-টা প্রথমে প্রোডাক্ট কিনা চেক করে, না হলে ক্যাটাগরি কিনা চেক করে:

```tsx
export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const product = getProductDetail(slug)
  if (product) return <ProductDetailPage product={product} />   // যেমন /amd-ryzen-5-5600

  const info = getCategoryInfo(slug)
  if (!info) notFound()
  return <CategoryPage categoryName={info.name} products={...} />  // যেমন /processor
}
```

লক্ষ্য করো — `params` একটা **Promise**। এই ভার্শনের Next.js-এ dynamic route-এর params ব্যবহার করার আগে `await` করতে হয়।

### Root layout কীভাবে কাজ করে

`src/app/layout.tsx` **প্রতিটা পেজকে** র‍্যাপ করে (হোম, ক্যাটাগরি, চেকআউট — সবকিছু)। এই কারণেই `Header`, `Footer`, `SideMenu` প্রতিটা পেজে আলাদা করে import করার দরকার হয় না — এগুলো একবারই এখানে বসানো থাকে, আর `{children}` জায়গাটায় বর্তমান পেজের কন্টেন্ট বসে যায়:

```tsx
<body>
  <AuthProvider>
    <WishlistProvider>
      <CompareProvider>
        <CartProvider>
          <SideMenu />
          <Header />
          <MobileHeader />
          <main>{children}</main>   {/* এখানে বর্তমান পেজ রেন্ডার হয় */}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </CompareProvider>
    </WishlistProvider>
  </AuthProvider>
</body>
```

---

## State Management (গ্লোবাল স্টেট)

এই প্রজেক্টে আলাদা কোনো state library (যেমন Redux) ব্যবহার হয়নি — গ্লোবাল স্টেট সামলানো হয় সাধারণ **React Context** দিয়ে, প্রতিটা provider একবারই `layout.tsx`-এ বসানো:

- `CartContext` — কার্টের আইটেম, add/remove/quantity update, একসাথে অনেকগুলো আইটেম যোগ করার `addItems`
- `AuthContext` — ইউজার লগইন অবস্থা
- `WishlistContext` — উইশলিস্টে রাখা প্রোডাক্ট
- `CompareContext` — কম্পেয়ারের জন্য বেছে নেওয়া প্রোডাক্ট

যেকোনো কম্পোনেন্ট থেকে `useCart()`, `useAuth()` এই ধরনের hook দিয়ে এগুলো পড়া/আপডেট করা যায়।

---

## ডেটা লেয়ার

এই প্রজেক্টে কোনো ডেটাবেজ নেই — `src/data/*.ts` ফাইলগুলোতে সরাসরি TypeScript অবজেক্ট/অ্যারে আকারে mock ডেটা লেখা আছে (প্রোডাক্ট, ক্যাটাগরি, ব্র্যান্ড, কুপন, PC Builder-এর পার্টস ইত্যাদি)। পেজ আর কম্পোনেন্টগুলো সরাসরি এই ফাইল থেকে ইমপোর্ট করে ডেটা ব্যবহার করে।

---

## স্টাইলিং

Tailwind CSS v4 ব্যবহার হয়েছে, কনফিগার করা আছে `src/app/globals.css`-এ। কাস্টম utility class (যেমন পাতলা স্ক্রলবারের `.thin-scroll-red` / `.thin-scroll-gray`) ও এখানেই ডিফাইন করা।

---

## একটা গুরুত্বপূর্ণ নোট

⚠️ এই রিপোর নিজস্ব `AGENTS.md` ফাইলে লেখা আছে যে এটা "standard না এমন" Next.js ভার্শন, যাতে ব্রেকিং চেঞ্জ আছে, এবং কোড লেখার আগে `node_modules/next/dist/docs/` পড়তে বলা হয়েছে। কিন্তু আসল কোডবেস পরীক্ষা করে (routing, `page.tsx`/`layout.tsx` কনভেনশন, `[slug]` ডাইনামিক রাউট, `params` কে Promise হিসেবে ব্যবহার) দেখা গেছে এটা সম্পূর্ণভাবে **স্ট্যান্ডার্ড Next.js 16 App Router**-এর মতোই আচরণ করছে — কোনো fictional/কাস্টম API-র প্রমাণ পাওয়া যায়নি। তাই এই নির্দেশনাটা সতর্কতার সাথে দেখা উচিত।
