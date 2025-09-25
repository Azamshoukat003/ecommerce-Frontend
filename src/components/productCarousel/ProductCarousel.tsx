// import { useEffect, useRef, useState } from "react";
// import { EyeIcon } from "@heroicons/react/24/outline";
// import { Dialog } from "@headlessui/react";
// import { Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// const StarRating = ({ stars = 4 }) => {
//   return (
//     <div className="flex items-center gap-0.5">
//       {Array.from({ length: 5 }).map((_, i) => (
//         <svg
//           key={i}
//           className={`h-4 w-4 ${
//             i < stars ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
//           }`}
//           fill="currentColor"
//           viewBox="0 0 20 20"
//         >
//           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.947h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.444 1.286 3.947c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.36 2.444c-.785.57-1.84-.197-1.54-1.118l1.286-3.947-3.36-2.444c-.783-.57-.38-1.81.588-1.81h4.15l1.286-3.947z" />
//         </svg>
//       ))}
//     </div>
//   );
// };

// export default function ProductCarousel({ title, products }) {
//   const [index, setIndex] = useState(0);
//   const [previewImage, setPreviewImage] = useState(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const navigate = useNavigate();

//   const itemsPerPage =
//     window.innerWidth < 640 ? 2 : window.innerWidth < 768 ? 2 : 4;

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex(
//         (prev) => (prev + 1) % Math.ceil(products.length / itemsPerPage)
//       );
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [products.length, itemsPerPage]);

//   useEffect(() => {
//     if (containerRef.current) {
//       containerRef.current.scrollTo({
//         left: containerRef.current.offsetWidth * index,
//         behavior: "smooth",
//       });
//     }
//   }, [index]);

//   const handleNext = () =>
//     setIndex((prev) => (prev + 1) % Math.ceil(products.length / itemsPerPage));
//   const handlePrev = () =>
//     setIndex(
//       (prev) =>
//         (prev - 1 + Math.ceil(products.length / itemsPerPage)) %
//         Math.ceil(products.length / itemsPerPage)
//     );

//   return (
//     <div className="bg-white dark:bg-gray-900 py-10">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="flex justify-between items-center mb-6"
//         >
//           <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
//             {title}
//           </h2>

//           <div className="flex gap-2">
//             <button
//               onClick={handlePrev}
//               className="px-4 py-2 rounded border text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow transition duration-300"
//             >
//               Prev
//             </button>

//             <button
//               onClick={handleNext}
//               className="px-4 py-2 rounded border text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow transition duration-300"
//             >
//               Next
//             </button>
//           </div>
//         </motion.div>
//         <div ref={containerRef} className="overflow-hidden">
//           <div className="flex transition-transform duration-500 ease-in-out">
//             <AnimatePresence>
//               {products.map((product: any, idx: any) => (
//                 <motion.div
//                   key={idx}
//                   className="p-2 flex-shrink-0 w-1/2 md:w-1/3 lg:w-1/4"
//                   initial={{ opacity: 0, y: 30, scale: 0.95 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   exit={{ opacity: 0, y: 30, scale: 0.95 }}
//                   transition={{ duration: 0.4, delay: idx * 0.05 }}
//                 >
//                   <div className="relative group bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
//                     <img
//                       src={product.imageSrc}
//                       alt={product.imageAlt}
//                       className="w-full h-48 sm:h-64 object-contain cursor-pointer"
//                       onClick={() => navigate(`/product/${product.id}`)}
//                     />
//                     {product.discount && (
//                       <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
//                         {product.discount}% OFF
//                       </span>
//                     )}
//                     <button
//                       onClick={() => setPreviewImage(product.imageSrc)}
//                       className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
//                     >
//                       <EyeIcon className="w-5 h-5 text-gray-700" />
//                     </button>
//                   </div>
//                   <div className="mt-2">
//                     <h3 className="text-gray-900 dark:text-white text-sm font-medium">
//                       {product.name}
//                     </h3>
//                     <div className="flex items-center gap-2">
//                       <p className="text-gray-900 dark:text-white font-bold">
//                         {product.price}
//                       </p>
//                       {product.discount && (
//                         <p className="text-sm line-through text-gray-500">
//                           {product.price}
//                         </p>
//                       )}
//                     </div>
//                     <StarRating stars={product.rating || 4} />
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         </div>
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="text-center mt-6"
//         >
//           <button
//             className="bg-indigo-700 dark:bg-indigo-700 text-white dark:text-white font-semibold px-6 py-2 rounded-md shadow-md hover:bg-indigo-600 dark:hover:bg-indigo-500 transition duration-300"
//             onClick={() => navigate("/shop")}
//           >
//             View All Products
//           </button>
//         </motion.div>
//       </div>

//       {/* Preview Modal */}
//       <Dialog
//         open={!!previewImage}
//         onClose={() => setPreviewImage(null)}
//         className="relative z-50"
//       >
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
//           <Dialog.Panel className="bg-white dark:bg-gray-900 p-4 rounded shadow max-w-lg w-full">
//             <motion.img
//               src={previewImage || undefined}
//               alt="Preview"
//               className="w-full h-auto"
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.3 }}
//             />
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </div>
//   );
// }

// src/components/productCarousel/ProductCarousel.tsx
import React, { useEffect, useRef, useState } from "react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type RawProduct = Record<string, any>;

interface ProductCardShape {
  id: string;
  name: string;
  priceStr: string;
  priceNumber?: number;
  discount?: number | string;
  imageSrc?: string;
  imageAlt?: string;
  rating?: number;
}

interface Props {
  title?: string;
  products?: RawProduct[];
}

const StarRating = ({ stars = 4 }: { stars?: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`h-4 w-4 ${
          i < stars ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.947h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.444 1.286 3.947c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.36 2.444c-.785.57-1.84-.197-1.54-1.118l1.286-3.947-3.36-2.444c-.783-.57-.38-1.81.588-1.81h4.15l1.286-3.947z" />
      </svg>
    ))}
  </div>
);

function formatCurrency(n?: number) {
  if (n == null || Number.isNaN(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

/** Normalize a variety of API product shapes into a displayable shape */
function normalizeProduct(p: RawProduct): ProductCardShape {
  const id = String(
    p.id ?? p._id ?? p._id?.toString() ?? p.productId ?? Math.random()
  );
  const name = String(p.name ?? p.productName ?? p.title ?? "Untitled Product");
  // price number detection
  const priceNumber =
    typeof p.price === "number"
      ? p.price
      : p.productPrice != null
      ? Number(String(p.productPrice).replace(/[^0-9.-]+/g, ""))
      : undefined;
  // If API provides discount as percent
  const discount =
    p.discount != null
      ? p.discount
      : p.productDiscountPrice != null
      ? p.productDiscountPrice
      : undefined;
  // If productPrice exists and discount exists compute final price; otherwise show price or formatted field
  let priceStr = "$0.00";
  const finalNumber =
    typeof priceNumber === "number"
      ? discount
        ? Number(
            (priceNumber - (priceNumber * Number(discount)) / 100).toFixed(2)
          )
        : priceNumber
      : undefined;
  if (finalNumber != null) priceStr = formatCurrency(finalNumber);
  else if (p.priceStr) priceStr = String(p.priceStr);
  else if (p.productPrice && typeof p.productPrice === "string")
    priceStr = `$${p.productPrice}`;

  const imageSrc =
    p.imageSrc ??
    p.productImage ??
    p.image ??
    (p.extraImages && p.extraImages[0]) ??
    "/placeholder.svg";
  const imageAlt = p.imageAlt ?? p.productName ?? p.title ?? name;
  const rating = Number(p.rating ?? p.stars ?? 4);

  return {
    id,
    name,
    priceStr,
    priceNumber: finalNumber,
    discount,
    imageSrc,
    imageAlt,
    rating,
  };
}

export default function ProductCarousel({
  title = "Related products",
  products = [],
}: Props) {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // normalized product list
  const normalized = products.map(normalizeProduct);

  // responsive itemsPerPage & containerWidth
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      let items = 4;
      if (w < 640) items = 2;
      else if (w < 768) items = 2;
      else if (w < 1024) items = 3;
      else items = 4;
      setItemsPerPage(items);
      setContainerWidth(containerRef.current?.clientWidth ?? 0);
      // reset page if out of bounds
      const maxPage = Math.max(0, Math.ceil(normalized.length / items) - 1);
      setPage((p) => Math.min(p, maxPage));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.length]);

  // auto-play
  useEffect(() => {
    if (normalized.length <= itemsPerPage) return; // no autoplay when everything fits
    const interval = setInterval(() => {
      setPage((prev) => {
        const max = Math.max(
          0,
          Math.ceil(normalized.length / itemsPerPage) - 1
        );
        return prev >= max ? 0 : prev + 1;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [normalized.length, itemsPerPage]);

  const maxPage = Math.max(0, Math.ceil(normalized.length / itemsPerPage) - 1);

  const handleNext = () => setPage((p) => (p >= maxPage ? 0 : p + 1));
  const handlePrev = () => setPage((p) => (p <= 0 ? maxPage : p - 1));

  // compute translateX for inner track
  const translateX = containerWidth ? -(page * containerWidth) : 0;

  return (
    <div className="bg-white dark:bg-gray-900 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex justify-between items-center mb-6"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
            {title}
          </h2>

          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={normalized.length === 0}
              className="px-4 py-2 rounded border text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow transition duration-300"
            >
              Prev
            </button>

            <button
              onClick={handleNext}
              disabled={normalized.length === 0}
              className="px-4 py-2 rounded border text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow transition duration-300"
            >
              Next
            </button>
          </div>
        </motion.div>

        <div ref={containerRef} className="overflow-hidden">
          <div className="relative">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out will-change-transform"
              style={{
                transform: `translateX(${translateX}px)`,
                width: `${Math.ceil(normalized.length / itemsPerPage) * 100}%`,
              }}
            >
              {normalized.map((product, idx) => {
                // compute width fraction for each item: each page is 100% of container, so each item is (100% / itemsPerPage) of page width
                const itemWidth = `${100 / itemsPerPage}%`;
                return (
                  <motion.div
                    key={product.id}
                    className="p-2 flex-shrink-0"
                    style={{ width: itemWidth }}
                  >
                    <div className="relative group bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="w-full h-48 sm:h-64 object-contain cursor-pointer"
                        onClick={() => navigate(`/product/${product.id}`)}
                      />
                      {product.discount != null && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {String(product.discount).toUpperCase().includes("%")
                            ? product.discount
                            : `${product.discount}%`}{" "}
                          OFF
                        </span>
                      )}
                      <button
                        onClick={() =>
                          setPreviewImage(product.imageSrc || null)
                        }
                        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
                      >
                        <EyeIcon className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>
                    <div className="mt-2">
                      <h3 className="text-gray-900 dark:text-white text-sm font-medium line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-900 dark:text-white font-bold">
                          {product.priceStr}
                        </p>
                        {/* if original price available, you can show a line-through here */}
                      </div>
                      <StarRating stars={product.rating ?? 4} />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center mt-6"
        >
          <button
            onClick={() => navigate("/shop")}
            className="bg-indigo-700 dark:bg-indigo-700 text-white dark:text-white font-semibold px-6 py-2 rounded-md shadow-md hover:bg-indigo-600 dark:hover:bg-indigo-500 transition duration-300"
          >
            View All Products
          </button>
        </motion.div>
      </div>

      {/* Preview Modal */}
      <Dialog
        open={!!previewImage}
        onClose={() => setPreviewImage(null)}
        className="relative z-50"
      >
        {previewImage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white dark:bg-gray-900 p-4 rounded shadow max-w-lg w-full">
              <motion.img
                src={previewImage}
                alt="Preview"
                className="w-full h-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
              />
              <div className="mt-3 text-right">
                <Button
                  variant="contained"
                  onClick={() => setPreviewImage(null)}
                >
                  Close
                </Button>
              </div>
            </Dialog.Panel>
          </div>
        )}
      </Dialog>
    </div>
  );
}
