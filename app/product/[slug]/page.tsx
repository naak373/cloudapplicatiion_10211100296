import ImageGallery from "@/app/components/ImageGallery";
import { fullProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";
import AddToCart from "@/app/components/AddToCart";

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
        _id,
        images,
        price,
        name,
        description,
        "slug": slug.current,
        "categoryName": category->name,
        price_id
    }`;
  const data = await client.fetch(query);

  return data;
}

export default async function ProductPge({
  params,
}: {
  params: { slug: string };
}) {
  // Await params explicitly if required
  const { slug } = await Promise.resolve(params); // Ensure `params` is resolved

  const data: fullProduct = await getData(slug);

  // Guard against empty or null `data`
  if (!data) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images || []} />
          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {data.categoryName || "Uncategorized"}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {data.name || "Unnamed Product"}
              </h2>
            </div>
            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <Button className="rounded-full gap-x-2">
                <span className="text-sm">4.2</span>
                <Star className="h-5 w-5" />
              </Button>
              <span className="text-sm text-gray-500 transition duration-100">
                56 Ratings
              </span>
            </div>
            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  ${data.price || "N/A"}
                </span>
                <span className="mb-0.5 text-red-500 line-through">
                  ${data.price ? data.price + 30 : "N/A"}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                Incl. VAT plus shipping
              </span>
            </div>
            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" />
              <span className="text-sm">2-4 Day Shipping</span>
            </div>

            <div className="flex gap-2.0">
              <AddToCart
                id={data._id}
                name={data.name}
                price={data.price}
                image={data.images ? data.images[0] : ""}
                description={data.description}
              />

              <Button variant={"secondary"}>Checkout Now</Button>
            </div>
            <p className="mt-12 text-base text-gray-500 tracking-wide">
              {data.description || "No description available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
