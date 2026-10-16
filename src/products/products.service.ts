import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ProductsService {
  constructor(private readonly db: DatabaseService) {}

  async create(
    name: string,
    code: string,
    price: number,
    description?: string,
  ) {
    const pool = this.db.getPool();

    const [result]: any = await pool.query(
      `INSERT INTO products
      (name, code, price, description)
      VALUES (?, ?, ?, ?)`,
      [name, code, price, description || null],
    );

    return {
      id: result.insertId,
      name,
      code,
      price,
      description: description || null,
    };
  }

  async createMany(products: {
    name: string;
    code: string;
    price: number;
    description?: string;
  }[]) {
    const results = [];

    for (const product of products) {
      const result = await this.create(
        product.name,
        product.code,
        product.price,
        product.description,
      );

      results.push(result);
    }

    return results;
  }

  async findAll() {
    const pool = this.db.getPool();

    const [rows] = await pool.query(
      'SELECT * FROM products ORDER BY id DESC',
    );

    return rows;
  }

  async findOne(id: number) {
    const pool = this.db.getPool();

    const [rows] = await pool.query(
      'SELECT * FROM products WHERE id = ?',
      [id],
    );

    return rows;
  }

  async update(
    id: number,
    name: string,
    code: string,
    price: number,
    description?: string,
  ) {
    const pool = this.db.getPool();

    await pool.query(
      `UPDATE products
       SET name = ?, code = ?, price = ?, description = ?
       WHERE id = ?`,
      [name, code, price, description || null, id],
    );

    return {
      message: 'Product updated successfully',
    };
  }

  async remove(id: number) {
    const pool = this.db.getPool();

    await pool.query(
      'DELETE FROM products WHERE id = ?',
      [id],
    );

    return {
      message: 'Product deleted successfully',
    };
  }
  async findAllWithDetails() {
  const pool = this.db.getPool();

  const [rows] = await pool.query(`
    SELECT
      products.id,
      products.name,
      products.code,
      products.price,
      products.description,
      brand.brand_name,
      location_store.store_name,
      location_store.location
    FROM products
    LEFT JOIN brand
      ON products.id = brand.product_id
    LEFT JOIN location_store
      ON products.id = location_store.product_id
    ORDER BY products.id ASC
  `);

  return rows;
}
}