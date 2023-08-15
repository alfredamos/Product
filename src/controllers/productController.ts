import { prisma } from "../db/productDb";
import { Request, Response } from "express";
import catchError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { UserInfo } from "../models/userInfoModel";

const createProduct = async (req: Request, res: Response) => {
  //----> Get new product input from body.
  const { body: newProduct  } = req;

  //----> Store the new product in the database.
  const createdProduct = await prisma.product.create({
    data: { ...newProduct },
  });

  //----> Send back response.
  res.status(StatusCodes.CREATED).json({ status: "success", createdProduct });
};

const deleteProduct = async (req: Request, res: Response) => {
  //----> Get the product id from params.
  const { id } = req.params;

  //----> Check the existence of the product in the database.
  const product = await prisma.product.findUnique({ where: { id } });

  //----> Throw error for non existence product.
  if (!product) {
    throw catchError(
      StatusCodes.NOT_FOUND,
      `Product with id = ${id} is not found.`
    );
  }

  //----> Delete the product from the database.
  const deletedProduct = await prisma.product.delete({ where: { id } });
  
  //----> Send back the response.
  res.status(StatusCodes.OK).json({ status: "success", deletedProduct });
};

const getAllProducts = async (req: Request, res: Response) => {
  //----> Get products from database.
  const products = await prisma.product.findMany();
  
  //----> Send back response.
  res.status(StatusCodes.OK).json({ status: "success", products });
};

const getAllProductsByUserId = async (req: Request, res: Response) => {
  //----> Get the user info that was previously stored in the req.
  const userInfo = req["userInfo"] as UserInfo;
  
  //----> Get the userId from user info.
  const userId = userInfo?.id;

  //----> Get all the products by userId from database.
  const products = await prisma.product.findMany({where: {userId}});

  //----> Throw error for non existent products.
  if (!products || products.length < 1){
    throw catchError(StatusCodes.NOT_FOUND, `No product attached with userId = ${userId}`);
  }
  
  //----> Send back response 
  res.status(StatusCodes.OK).json({ status: "success", products });
};

const getProductById = async (req: Request, res: Response) => {
  //----> Get the product id from params
  const { id } = req.params;

  //----> Check for the existence of product in the database.
  const product = await prisma.product.findUnique({ where: { id } });

  //----> Throw error for non existent product.
  if (!product) {
    throw catchError(
      StatusCodes.NOT_FOUND,
      `Product with id = ${id} is not found.`
    );
  }

  //----> Send back response.
  res.status(StatusCodes.OK).json({ status: "success", product });
};

const updatedProduct = async (req: Request, res: Response) => {
  //----> Get the product id from params.
  const { id } = req.params;

  //----> Get the product to edit input data from body.
  const { body: productToEdit } = req;

  //----> Check for the existence of the said product in the database.
  const product = await prisma.product.findUnique({ where: { id } });

  //----> Throw error for non existent product.
  if (!product) {
    throw catchError(
      StatusCodes.NOT_FOUND,
      `Product with id = ${id} is not found.`
    );
  }

  //----> Store the edited product in the database.
  const editedProduct = await prisma.product.update({
    where: { id },
    data: { ...productToEdit },
  });

  //----> Send back the response.
  res.status(StatusCodes.OK).json({ status: "success", editedProduct });
};

export {
  createProduct,  deleteProduct,
  getAllProducts,
  getAllProductsByUserId,
  getProductById,
  updatedProduct,
};
