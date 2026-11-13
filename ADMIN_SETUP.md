# Showcase admin setup (username + password)

The Showcase uses an independent Supabase project: `lhkevukjvtyemleriskz`.

## Create the one admin

1. Pick a username containing 3–32 lowercase letters, digits, or underscores.
2. In **Supabase Dashboard → Authentication → Users → Add user**, create a user using an internal email **`<username>@login.pickout-showcase.invalid`** and a strong password. This internal email is never shown in the Showcase admin login form. If Supabase refuses the reserved `.invalid` domain, use a verified mailbox domain instead and change the username mapping in `admin.html` to match before attempting login.
3. Copy the new user's **UUID** (not the password).
4. In the **new Showcase project only**, run this in SQL Editor, replacing the UUID:

```sql
insert into public.showcase_admins(user_id)
values ('REPLACE-WITH-NEW-AUTH-USER-UUID');
```

5. Open `admin.html` on the **new Showcase deployment**, and sign in using only the username and password. The browser maps the username to the internal Supabase Auth identifier; RLS enforces all editing rights server-side.

**Do not** insert usernames or passwords into SQL, source code, or GitHub. Never expose a Supabase secret/service-role key in the browser. Do not modify the original PICK & OUT Supabase project.

## Deployment

Connect `elagaza151-sudo/pickout-showcase` to a **new Cloudflare Pages project**, with build command empty and output directory `/`. Do not connect the existing `pickandoutt.pages.dev` project to this repository.

## Current state

- Independent Supabase tables `showcase_products`, `showcase_games`, and `showcase_admins` with RLS.
- Public storefront reads product and game visibility from the new project; static menu is a fallback when unavailable.
- Admin requires a specifically authorized Supabase Auth user. No default password exists.
- This site has not yet been browser-tested or deployed.
