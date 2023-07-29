import { NextResponse } from "next/server";
import connectDB from "@/middleware/db";
import _ from "lodash";
import product from "@/models/product";

export async function POST(req, res) {

  try {
    await connectDB();

    const body = await req.json();

    const newProduct = await product.create({
      name: body.name,
      price: body.price,
      description: body.description,
      images: body.image,
      category: body.category,
      stock: body.stock,
      size: body.size,
      seo: {
        title: body.seo.title,
        slug: _.kebabCase(body.seo.slug),
        description: body.seo.description
      }
    });

    return NextResponse.json({ message: "Product created successfully!" });

  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return NextResponse.json({ msg: "Errors" });
    }
    NextResponse.json({ msg: "Something went wrong" });
  }
}