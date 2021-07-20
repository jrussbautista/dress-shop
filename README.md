# DRESS SHOP

### A full stack e-commerce website for clothing store.

### [Live demo](https://dress-shop.vercel.app/)

## Screenshots

![Thumbnail](dress-home-page.png)

## Stacks

- TypeScript
- Next js
- Node js
- Express js
- MongoDB
- Cloudinary (for image hosting)
- Stripe and Paypal (for payment)
- Vercel (for deployment)

### Clone Repository

```
git clone https://github.com/jrussumbrella/dress-shop-web.git
```

### Client Installation

```
cd dress-shop
cd client
npm install or yarn install
```

#### Add .env.local file to root client directory

```
NEXT_PUBLIC_PAYPAL_CLIENT_ID=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KY=
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
```

## Server Installation

```
cd server
npm install or yarn install
```

#### Add .env file to root server directory

```
DATABASE_URI=
JWT_SECRET=
STRIPE_SECRET_API_KEY=
GOOGLE_WEB_CLIENT_ID=
GOOGLE_ANDROID_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
CLIENT_PUBLIC_URL=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
```

### This will run both client and server

```
npm run dev
```

## Deploy using vercel

### Globally install vercel

```
npm i -g vercel
```

### Client

```
vercel --prod
```

## Server

```
vercel --prod
```
