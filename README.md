# 🏎️ Apex Racing – F1-Inspired Streetwear E-commerce Website (Framer)

A minimal yet immersive e-commerce prototype built on **Framer** and **Next.js App Router** for an **F1-inspired streetwear brand**. This project emphasizes **structure**, **UX clarity**, and **smart time use**, with an authentic design system and production-ready thinking.

---

## 🚀 Live Preview
> Coming Soon – [Framer Link]

---

## 📸 Screenshots 

### 📱 Mobile View

<table>
  <tr>
    <td><img width="388" height="872" src="https://github.com/user-attachments/assets/6613dde1-9b31-4a75-98b0-8f529d9183a7" /></td>
    <td><img width="387" height="868" src="https://github.com/user-attachments/assets/5e547474-8aaf-4d41-b77e-6ad90f54d375" /></td>
    <td><img width="574" height="828" src="https://github.com/user-attachments/assets/5552fa36-0bfa-416f-9a87-c2ae3d9c7581" /></td>
  </tr>
  <tr>
    <td><img width="390" height="870" src="https://github.com/user-attachments/assets/fd61f1de-a0ae-456d-a936-f76ceda3a5d2" /></td>
    <td><img width="394" height="869" src="https://github.com/user-attachments/assets/6bba7ef0-4eb9-4724-a048-07734baea273" /></td>
  </tr>
</table>


> 📽️ **Demo Video**: [Watch Here](https://github.com/user-attachments/assets/95557785-fd64-4a6d-a595-fe89fe07ecbb)



---

## 🛒 Features Implemented

### ✅ Home Page
- Hero section with "VIEW ALL PRODUCTS" button → Products page  
- Categories section with 5+ items (Racing Tees, Speed Jackets, Victory Caps, Track Gear, Limited Drops)  
- First category functional, others are styled placeholders  
- **Bonus**: Particle background, custom F1 cursor, smooth animations

### ✅ Category/Products Page
- Grid/list toggle for products  
- Product cards with placeholder images  
- Clicking on product opens its page  
- **Bonus**: “Coming soon” products with progress bars, fuzzy search

### ✅ Product Page
- Dynamic routing  
- Product details and imagery  
- **Missing**: Dedicated search on individual product page (tradeoff for scope focus)

### ✅ Cart Page
- Cart drawer showing added items  
- Quantity adjustment and subtotal calculation  
- Checkout CTA (non-functional as per brief)  
- **Bonus**: Persistent cart state, loading animations

### ✅ Auth Pages
- Login, Signup, Forgot Password  
- OTP-based reset flow (simulated)  
- Google Sheets integration for user data  
- **Bonus**: Authentication state persistence

### ✅ Additional Touches
- Profile/Wishlist icons (visual only)  
- Consistent F1 dark theme styling  
- Tailored empty states like “TIRES LOCKED UP!”  
- Custom cursors, holographic nav bars, smooth transitions

---

## 🧠 What Makes It Stand Out

### 🧩 Technical Excellence
- Advanced **state management** using React Context:
  - `CartContext` for cart logic
  - `LoadingContext` for navigation state
  - Persistent auth and Google Sheet capture
- Fuzzy search logic  
- Dynamic routing using `[slug]` and `[id]`  
- Componentized, scalable folder architecture  
- Real-time data updates + optimistic UI practices

### 🎨 Authentic F1 Design Language
- **Visual Identity**: Red/black theme, motion trails, typography  
- **F1 Terminology**: “Grid”, “Pit Crew”, “Apex Racing”, “Championship Pieces”  
- **Visual Elements**: Custom cursor, racing-themed placeholders, progress trackers

### 💡 Advanced UX Patterns
- Custom micro-interactions  
- F1-style page transitions  
- Particle FX + cursor trails  
- Loading spinners between route changes  
- Responsive + accessible layouts

### ⚙️ Smart Dev Choices
- Built with:
  - **Next.js App Router**
  - **TypeScript** for safety
  - **Framer Motion** for animation
  - **Tailwind CSS** for maintainable styles
- Clean separation of UI + logic  
- Future-proof structure with scoped folders

---

## 🎯 Unique Value Proposition

1. **Authentic F1 Immersion**
   - Not a generic racing theme – the UI/UX *feels* like real F1 merch branding
   - From copywriting to cursor effects, the entire site breathes racing DNA

2. **Production-Level Polish**
   - Integration with Google Sheets  
   - Persistent cart and auth state  
   - Real error handling  
   - Dynamic navigation & animated loaders

3. **Beyond MVP Thinking**
   - “Coming Soon” product statuses with progress
   - Empty search results with race-themed messages
   - Grid/List toggle for browsing flexibility

4. **Perfect Scope Balance**
   - You delivered more than asked, *without bloating*
   - Kept the focus sharp and built features with care, not fluff

---

## 🧪 How to Test It (Manually)

Go to Home Page

Click “View All” → should route to Category Page

Click on “Tees” category (only functional one)

On Product Grid:

Try searching for “Red” → should filter items

Search something random → should show empty state

Click on a Product → Go to Product Page

Add to Cart → Go to Cart

Adjust quantity → Subtotal updates accordingly

Proceed to Checkout → CTA only, no flow

Go to Login → Try Login/Signup/Forgot Password

On Forgot Password → simulate OTP → reset password screen

Check Google Sheet for captured email/credentials


---

## 🗂 Project Structure

<details>
<summary><strong>📁 app</strong> — Contains all the route-based pages for the application</summary>

- `cart/`, `category/[slug]/`, `product/[id]/`, `login/`, `signup/` – Dynamic and static pages  
- `layout.tsx` – App layout wrapper  
- `globals.css` – Global styles  
- `page.tsx`, `loading.tsx` – Root-level pages and loaders  

</details>

<details>
<summary><strong>📁 components</strong> — Reusable UI components across the app</summary>

- `ui/` – Components like drawers, loaders, and theme providers  

</details>

<details>
<summary><strong>📁 contexts</strong> — Global context providers</summary>

- `CartContext.tsx` – Manages cart state  
- `LoadingContext.tsx` – Manages loading states  

</details>

<details>
<summary><strong>📁 hooks</strong> — Custom React hooks</summary>

- Logic extracted into reusable hook functions  

</details>

<details>
<summary><strong>📁 lib</strong> — Utility and service functions</summary>

- `googleSheets.ts` – Google Sheets integration  
- `utils.ts` – General-purpose utilities  

</details>

<details>
<summary><strong>📁 public</strong> — Static assets</summary>

- Images and background files used across the site  

</details>


---

## 🛠 Built With

- **Next.js App Router**
- **Framer** (for prototyping)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Google Sheets API**
- **Custom Cursor & Particle.js**

---

## 🙌 Credits

Designed and Developed by [Aafreen Khan]  
Inspired by the speed, precision, and aesthetic of Formula 1.

---

## 📬 Contact

📧 aafreen22k@gmail.com
🔗 [LinkedIn](www.linkedin.com/in/aafreenkhan-m2204) | [Portfolio](https://yourportfolio.com)
