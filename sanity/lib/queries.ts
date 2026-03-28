export const siteSettingsQuery = `*[_type == "siteSettings"][0]`;

export const servicesQuery = `*[_type == "service"] | order(order asc) {
  ...,
  slug,
}`;

export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  ...,
  slug,
}`;

export const postSlugsQuery = `*[_type == "post" && defined(slug.current)][].slug.current`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  ...,
  slug,
}`;

export const resourcesQuery = `*[_type == "resource"] | order(featured desc, publishedAt desc) {
  ...,
  slug,
  "fileUrl": coalesce(fileUrl, file.asset->url),
}`;

export const resourceSlugsQuery = `*[_type == "resource" && defined(slug.current)][].slug.current`;

export const resourceBySlugQuery = `*[_type == "resource" && slug.current == $slug][0] {
  ...,
  slug,
  "fileUrl": coalesce(fileUrl, file.asset->url),
}`;

export const testimonialsQuery = `*[_type == "testimonial" && featured == true] | order(_createdAt desc)`;
