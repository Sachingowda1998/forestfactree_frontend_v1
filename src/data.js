const allcategories = {
  "categories": [
    {
      "name": "Wood",  // Consistent naming across all categories
      "cdescp" : "From luxurious Teak to rich Rosewood – explore a curated range of woods for all your needs",
      "cimage": "/tree2.jpg",
      "subcategories": [
        {
          "sname": "Teak Wood",
          "simage": "/tree4.jpg"
        },
        {
          "sname": "Rose Wood",
          "simage": "/tree2.jpg"
        },
        {
          "sname": "Ebony Wood",
          "simage": "/tree3.jpg"
        },
        {
          "sname": "Mahogany Wood",
          "simage": "/tree4.jpg"
        }
      ]
    },
    {
      "name": "Plants",
      "cimage": "/plant1.jpg",
      "cdescp" : "Nurture your environment with our premium collection of plants – rooted in health, beauty, and sustainability",
      "subcategories": [
        {
          "sname": "Areca Palm",
          "simage": "/plant1.jpg"
        },
        {
          "sname": "Tulsi",
          "simage": "/plant2.jpg"
        },
        {
          "sname": "Curry Leaf",
          "simage": "/plant3.jpg"
        },
        {
          "sname": "Coconut",
          "simage": "/plant4.jpg"
        }
      ]
    },
    {
      "name": "Seeds",
      "cdescp" : "Experience the joy of watching your plants grow – with seeds that promise quality and sustainability",
      "cimage": "/seed1.jpg",
      "subcategories": [
        {
          "sname": "Paddy",
          "simage": "/seed1.jpg"
        },
        {
          "sname": "Groundnut",
          "simage": "/seed2.jpg"
        },
        {
          "sname": "Sunflower",
          "simage": "/seed3.jpg"
        },
        {
          "sname": "Cotton",
          "simage": "/seed4.jpg"
        }
      ]
    },

    {
      "name": "Biochar",
      "cdescp" : "Harness the power of biochar to enrich your soil, reduce waste, and create a more sustainable farming practice.",
      "cimage": "/seed1.jpg",
      "subcategories": [
        {
          "sname": "Activated Biochar",
          "simage": "/seed2.jpg"
        },
        {
          "sname": "Wood-Based Biochar",
          "simage": "/seed3.jpg"
        },
        {
          "sname": "Agricultural Biochar",
          "simage": "/seed4.jpg"
        }
      ]
    }
  ]
}

const products = [
  {
    name: "Teak Wood",
    image: "/tree1.jpg",
    category: "Wood",
    subcategory: "Teak Wood",
    description: "High-quality teak wood known for its durability and resistance to decay, perfect for furniture and outdoor use."
  },
  {
    name: "Rose Wood",
    image: "/tree2.jpg",
    category: "Wood",
    subcategory: "Rose Wood",
    description: "Rosewood is prized for its deep color, fine grain, and strong scent, often used in luxury furniture and musical instruments."
  },
  {
    name: "Ebony Wood",
    image: "/tree3.jpg",
    category: "Wood",
    subcategory: "Ebony Wood",
    description: "A dense, dark, and hard wood, ebony is valued for its beauty and durability, often used for high-end furniture and carving."
  },
  {
    name: "Mahogany Wood",
    image: "/tree4.jpg",
    category: "Wood",
    subcategory: "Mahogany Wood",
    description: "Mahogany is a strong, reddish-brown wood with a fine grain, widely used in furniture, cabinetry, and flooring."
  },
  {
    name: "Sunflower Seeds",
    image: "/seed1.jpg",
    category: "Seeds",
    subcategory: "Sunflower Seeds",
    description: "Nutritious sunflower seeds rich in vitamins and minerals, ideal for snacking or adding to dishes."
  },
  {
    name: "Tomato Seeds",
    image: "/seed2.jpg",
    category: "Seeds",
    subcategory: "Tomato Seeds",
    description: "High-quality tomato seeds for growing fresh, juicy tomatoes in your home garden or farm."
  },
  {
    name: "Cotton Seeds",
    image: "/seed3.jpg",
    category: "Seeds",
    subcategory: "Cotton Seeds",
    description: "Premium cotton seeds for growing cotton plants, commonly used in the textile industry."
  },
  {
    name: "Chili Seeds",
    image: "/seed4.jpg",
    category: "Seeds",
    subcategory: "Chili Seeds",
    description: "Spicy chili seeds perfect for growing hot and flavorful chili peppers in your garden."
  },
  {
    name: "Aloe Vera Plant",
    image: "/plant1.jpg",
    category: "Plants",
    subcategory: "Aloe Vera",
    description: "Aloe Vera is a succulent plant known for its healing properties, often used in skincare products and home remedies."
  },
  {
    name: "Bamboo Plant",
    image: "/plant2.jpg",
    category: "Plants",
    subcategory: "Bamboo",
    description: "Fast-growing bamboo plants that are used in landscaping and construction for their flexibility and strength."
  },
  {
    name: "Tulip Plant",
    image: "/plant3.jpg",
    category: "Plants",
    subcategory: "Tulips",
    description: "Bright and beautiful tulip plants, known for their colorful flowers, perfect for gardens and floral arrangements."
  },
  {
    name: "Rose Plant",
    image: "/plant4.jpg",
    category: "Plants",
    subcategory: "Roses",
    description: "Classic rose plants known for their fragrant, beautiful blooms, perfect for gifting or decorating gardens."
  },
  {
    name: "Cactus Plant",
    image: "/plant1.jpg",
    category: "Plants",
    subcategory: "Cactus",
    description: "Drought-resistant cacti plants, ideal for low-maintenance gardens or indoor decor."
  },
  {
    name: "Lavender Plant",
    image: "/plant2.jpg",
    category: "Plants",
    subcategory: "Lavender",
    description: "A fragrant plant known for its soothing properties, lavender is often used in aromatherapy and cooking."
  },
  {
    name: "Mint Plant",
    image: "/plant3.jpg",
    category: "Plants",
    subcategory: "Mint",
    description: "Aromatic mint plants perfect for adding flavor to dishes, teas, or making natural remedies."
  },
  {
    name: "Cabbage Seeds",
    image: "/seed1.jpg",
    category: "Seeds",
    subcategory: "Cabbage Seeds",
    description: "Premium cabbage seeds for growing fresh, crunchy cabbage, ideal for salads and cooking."
  },
  {
    name: "Carrot Seeds",
    image: "/seed2.jpg",
    category: "Seeds",
    subcategory: "Carrot Seeds",
    description: "High-quality carrot seeds for growing sweet and nutritious carrots in your garden."
  },
  {
    name: "Pepper Seeds",
    image: "/seed3.jpg",
    category: "Seeds",
    subcategory: "Pepper Seeds",
    description: "Spicy pepper seeds for growing various types of peppers, from mild to hot, in your garden."
  },
  {
    name: "Lettuce Seeds",
    image: "/seed4.jpg",
    category: "Seeds",
    subcategory: "Lettuce Seeds",
    description: "Fresh lettuce seeds for growing tender and crisp lettuce leaves in your home garden."
  },
  {
    name: "Apple Seedlings",
    image: "/plant1.jpg",
    category: "Plants",
    subcategory: "Apple",
    description: "Healthy apple seedlings for planting and growing your own apple tree in your garden or farm."
  },
  {
    name: "Activated Biochar",
    image: "/biochar1.jpg",
    category: "Biochar",
    subcategory: "Activated Biochar",
    description: "Premium activated biochar for improving soil health, increasing nutrient retention, and promoting sustainable farming."
  },
  {
    name: "Wood-Based Biochar",
    image: "/biochar2.jpg",
    category: "Biochar",
    subcategory: "Wood-Based Biochar",
    description: "Eco-friendly wood-based biochar designed to enhance soil structure, boost plant growth, and support environmental sustainability."
  },
  {
    name: "Agricultural Biochar",
    image: "/biochar3.jpg",
    category: "Biochar",
    subcategory: "Agricultural Biochar",
    description: "Sustainable agricultural biochar that helps to retain moisture, reduce soil acidity, and improve crop yield."
  },
  {
    name: "Coconut Shell Biochar",
    image: "/biochar4.jpg",
    category: "Biochar",
    subcategory: "Agricultural Biochar",
    description: "Coconut shell-based biochar for enriching soil, promoting healthier plants, and reducing carbon footprints."
  },
  {
    name: "Biochar Soil Conditioner",
    image: "/biochar5.jpg",
    category: "Biochar",
    subcategory: "Activated Biochar",
    description: "Biochar soil conditioner that enhances soil aeration, improves water retention, and promotes healthy plant roots."
  }
];

export { products };


export { allcategories };
