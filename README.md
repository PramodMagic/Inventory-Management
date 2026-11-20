# VC Inventory (DF + India)

Static web app: Stock In / RTV IN / Stock Out, auto Final Barcode (SKU + Bin), new-bin auto-add,
date-wise sum, two inventories. No build step.

## GitHub par daalna
```bash
cd vc-inventory
git init
git add .
git commit -m "VC inventory app"
git branch -M main
git remote add origin https://github.com/<your-username>/vc-inventory.git
git push -u origin main
```

## Vercel par deploy
1. vercel.com -> Add New -> Project -> GitHub repo `vc-inventory` import karein.
2. Framework Preset: **Other**. Build Command aur Output Directory khali chhodein.
3. Deploy dabayein. Link mil jayega.

## Pehli baar use
1. "Import Excel (base)" se `VC_Inventory_Management_Nov26.xlsx` load karein (DF Inventory + India Inventory sheets).
2. Entry tab se data dalein, "Upload Excel" se IN/OUT file upload karein (template download kar sakte hain) ya SKU, Bin, Qty paste karein. Duplicate rows (same date + inventory + type + barcode) auto-sum hoke unique ho jati hain.
3. Export Excel se backup/report lein.

## Dhyan dein
Data browser ke localStorage mein save hota hai (har device/browser ka alag). Multi-user ya shared
data ke liye backend (Supabase / Vercel Postgres) chahiye.

## Upstash (cloud storage) connect karna
1. Upstash console -> aapka Redis database kholein -> **REST API** section se 2 cheezein copy karein:
   `UPSTASH_REDIS_REST_URL` aur `UPSTASH_REDIS_REST_TOKEN`.
2. Vercel -> Project -> Settings -> Environment Variables mein ye add karein (Production + Preview):
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
   - `APP_PASSWORD` (optional, app ka password; na dena ho to khali chhodein)
3. Deployments -> latest deploy -> **Redeploy** (env vars redeploy ke baad hi lagte hain).
4. App kholein: header mein "Cloud synced" dikhna chahiye. Password lagaya ho to pehli baar poochega.

Kaise kaam karta hai: har change ke 1.5 second baad poora data `/api/state` ke through Upstash mein save hota hai
(400KB ke chunks mein). App khulte hi cloud se load hota hai. Token browser tak nahi jata.
Agar cloud khali ho aur browser mein data ho, to wo pehli baar cloud par upload ho jata hai.
Ek time par ek hi user edit kare (last save jeetta hai).
