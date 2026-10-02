export const shop = {
  name: "Customized Cakes",
  tagline: "Made just for you.",
  phone: "8861646660",
  whatsapp: "918861646660",
  email: "customizedcakes1@gmail.com",
  city: "Bengaluru, Karnataka"
};

export const whatsappUrl = (message = "") =>
  `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(message)}`;

export const emailUrl = (subject = "", body = "") =>
  `mailto:${shop.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
