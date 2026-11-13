# PICK & OUT Showcase

A **separate** public-facing showcase edition of PICK & OUT.

## Keep
- Original menu layout, categories, products, prices, imagery and animations
- Original backgrounds, 3D hover, mobile animations and Arabic/English language switch
- Arcade games

## Remove
- Orders, checkout, cart, payments and order tracking
- Loyalty points, coupons, rewards, coffee passport, group orders and customer accounts
- Cashier/POS, inventory, accounts, reports, shifts and employees

## Administration
- A single admin account only
- Admin may edit menu content and manage arcade games
- No access to the original production admin or staff database

## Isolation requirements
- Source repository: `elagaza151-sudo/pickout` — **read-only reference**
- This repository: `elagaza151-sudo/pickout-showcase` — all new development here
- Deploy separately from `pickandoutt.pages.dev`
- Do not connect to the production Supabase project, storage, authentication or credentials
- Never write to production data

## Status
Specification initialized; application copy and independent backend have **not yet been implemented**. Do not deploy as complete.
