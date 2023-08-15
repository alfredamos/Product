"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedProduct = exports.getProductById = exports.getAllProductsByUserId = exports.getAllProducts = exports.deleteProduct = exports.createProduct = void 0;
const productDb_1 = require("../db/productDb");
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //----> Get new product input from body.
    const { body: newProduct } = req;
    //----> Store the new product in the database.
    const createdProduct = yield productDb_1.prisma.product.create({
        data: Object.assign({}, newProduct),
    });
    //----> Send back response.
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ status: "success", createdProduct });
});
exports.createProduct = createProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //----> Get the product id from params.
    const { id } = req.params;
    //----> Check the existence of the product in the database.
    const product = yield productDb_1.prisma.product.findUnique({ where: { id } });
    //----> Throw error for non existence product.
    if (!product) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Product with id = ${id} is not found.`);
    }
    //----> Delete the product from the database.
    const deletedProduct = yield productDb_1.prisma.product.delete({ where: { id } });
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", deletedProduct });
});
exports.deleteProduct = deleteProduct;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //----> Get products from database.
    const products = yield productDb_1.prisma.product.findMany();
    //----> Send back response.
    res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", products });
});
exports.getAllProducts = getAllProducts;
const getAllProductsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //----> Get the user info that was previously stored in the req.
    const userInfo = req["userInfo"];
    //----> Get the userId from user info.
    const userId = userInfo === null || userInfo === void 0 ? void 0 : userInfo.id;
    //----> Get all the products by userId from database.
    const products = yield productDb_1.prisma.product.findMany({ where: { userId } });
    //----> Throw error for non existent products.
    if (!products || products.length < 1) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `No product attached with userId = ${userId}`);
    }
    //----> Send back response 
    res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", products });
});
exports.getAllProductsByUserId = getAllProductsByUserId;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //----> Get the product id from params
    const { id } = req.params;
    //----> Check for the existence of product in the database.
    const product = yield productDb_1.prisma.product.findUnique({ where: { id } });
    //----> Throw error for non existent product.
    if (!product) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Product with id = ${id} is not found.`);
    }
    //----> Send back response.
    res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", product });
});
exports.getProductById = getProductById;
const updatedProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //----> Get the product id from params.
    const { id } = req.params;
    //----> Get the product to edit input data from body.
    const { body: productToEdit } = req;
    //----> Check for the existence of the said product in the database.
    const product = yield productDb_1.prisma.product.findUnique({ where: { id } });
    //----> Throw error for non existent product.
    if (!product) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Product with id = ${id} is not found.`);
    }
    //----> Store the edited product in the database.
    const editedProduct = yield productDb_1.prisma.product.update({
        where: { id },
        data: Object.assign({}, productToEdit),
    });
    //----> Send back the response.
    res.status(http_status_codes_1.StatusCodes.OK).json({ status: "success", editedProduct });
});
exports.updatedProduct = updatedProduct;
