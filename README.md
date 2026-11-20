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
