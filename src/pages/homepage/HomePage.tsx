import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { motion } from "framer-motion";
import HeroSlider from "../../components/heroSlider/HeroSlider";
import ProductCarousel from "../../components/productCarousel/ProductCarousel";

import Image1 from "../../assets/iphone.png";
import Image2 from "../../assets/vivo.png";
import CategorySection from "../../components/categorySection/CategorySection";
import NewArrivalProduct from "../../components/newArrival/NewArrivalProduct";
import WhyChooseUs from "../../components/whyChooseus/WhyChooseUs";
import NewsletterSignup from "../../components/newEmail/NewsletterSignup";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const SectionDivider = () => {
  return <hr className="border-t border-gray-300 dark:border-zinc-700" />;
};

const HomePage = () => {
  const [products, setProducts] = useState<any[]>([]);

  const normalizeProducts = (data: any[]) =>
    data.map((p) => ({
      id: p._id,
      name: p.productName,
      price: `$${p.productPrice}`,
      discount: p.productDiscountPrice
        ? `$${p.productDiscountPrice}`
        : undefined,
      imageSrc: p.productImage,
      imageAlt: p.productName,
      rating: 4,
      category: p.productCategory?.categoryName || "Others",
      // categoryId: p.categoryName?._id || null,
      model: p.productModel?.modelName || "Unknown",
      // modelId: p.productModel?._id || null,
    }));

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/get-products`, {
        headers: { "Content-Type": "application/json" },
      });
      if (response?.data?.success) {
        const normalized = normalizeProducts(response.data.data);
        console.log(response?.data.data);
        setProducts(normalized);
      } else {
        toast.error("Failed to fetch products.");
      }
    } catch (e) {
      console.error("Error fetching products:", e);
    }
  };

  const groupedProducts = products.reduce<Record<string, typeof products>>((
    acc,
    product
  ) => {
    const category = product.category || "Others";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Navbar />

      <FadeInSection>
        <HeroSlider />
      </FadeInSection>

      <SectionDivider />

      <FadeInSection delay={0.1}>
        <NewsletterSignup />
      </FadeInSection>

      <FadeInSection delay={0.15}>
        <CategorySection />
      </FadeInSection>

      <SectionDivider />

      {Object.entries(groupedProducts).map(([category, products], index) => (
        <div key={category}>
          <FadeInSection delay={0.2 + index * 0.05}>
            <ProductCarousel
              title={category.charAt(0).toUpperCase() + category.slice(1)}
              products={products}
            />
          </FadeInSection>
          <SectionDivider />
        </div>
      ))}

      {/* <SectionDivider /> */}

      <FadeInSection delay={0.3}>
        <NewArrivalProduct />
      </FadeInSection>

      <FadeInSection delay={0.35}>
        <WhyChooseUs />
      </FadeInSection>

      <SectionDivider />

      <FadeInSection delay={0.4}>
        <Footer />
      </FadeInSection>
    </>
  );
};

export default HomePage;

function FadeInSection({
  children,
  delay = 0.1,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
