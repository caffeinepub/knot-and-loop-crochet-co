import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    name: string;
    description: string;
    category: string;
    price: number;
}
export interface backendInterface {
    getProduct(id: bigint): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
}
