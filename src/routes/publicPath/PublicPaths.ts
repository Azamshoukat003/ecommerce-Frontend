import { RouteItem } from "../types.ts";
import HomePage from "../../pages/homepage/HomePage.tsx";
import Contact from "../../pages/contact/Contact.tsx";
import About from "../../pages/about/About.tsx";

import ShopPage from "../../pages/shop/ShopPage.tsx";
import ProductDetailPage from "../../pages/productDetails/ProductDetailPage.tsx";

// import AboutPage from '@/pages/About/AboutPage'

const PublicPaths: RouteItem[] = [
  { path: "/", Content: HomePage },
  { path: "/contact", Content: Contact },
  { path: "/about", Content: About },

  { path: "/shop", Content: ShopPage },
  { path: "/product/:id", Content: ProductDetailPage },
];

export default PublicPaths;
