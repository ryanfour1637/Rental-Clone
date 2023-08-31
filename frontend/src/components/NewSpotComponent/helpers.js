export function checkForInputErrors(
   country,
   address,
   city,
   state,
   description,
   title,
   price,
   previewImage,
   image2,
   image3,
   image4,
   image5
) {
   const errors = {};
   if (country.length < 1) errors["country"] = "Country is required";
   if (address.length < 1) errors["address"] = "Address is required";
   if (city.length < 1) errors["city"] = "City is required";
   if (state.length < 1)
      errors["state"] = "State is required and must be 2 letters";
   if (description.length < 30)
      errors["description"] = "Description needs a minimum of 30 characters";
   if (title.length < 1) errors["title"] = "Name is required";
   if (price.length < 1) errors["price"] = "Price is required";
   if (previewImage.length < 1)
      errors["previewImage"] = "Preview image is required.";
   if (
      image2.toLowerCase().endsWith(".png") ||
      image2.toLowerCase().endsWith(".jpeg") ||
      image2.toLowerCase().endsWith(".jpg")
   ) {
   } else if (image2.length < 1) {
   } else {
      errors["image2"] = "Image URL must end in .png, .jpg, or .jpeg";
   }
   if (
      image3.toLowerCase().endsWith(".png") ||
      image3.toLowerCase().endsWith(".jpeg") ||
      image3.toLowerCase().endsWith(".jpg")
   ) {
   } else if (image3.length < 1) {
   } else {
      errors["image3"] = "Image URL must end in .png, .jpg, or .jpeg";
   }
   if (
      image4.toLowerCase().endsWith(".png") ||
      image4.toLowerCase().endsWith(".jpeg") ||
      image4.toLowerCase().endsWith(".jpg")
   ) {
   } else if (image4.length < 1) {
   } else {
      errors["image4"] = "Image URL must end in .png, .jpg, or .jpeg";
   }
   if (
      image5.toLowerCase().endsWith(".png") ||
      image5.toLowerCase().endsWith(".jpeg") ||
      image5.toLowerCase().endsWith(".jpg")
   ) {
   } else if (image5.length < 1) {
   } else {
      errors["image5"] = "Image URL must end in .png, .jpg, or .jpeg";
   }

   return errors;
}
