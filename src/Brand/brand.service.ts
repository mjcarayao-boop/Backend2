import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class BrandService {
  constructor(private readonly db: DatabaseService) {}

  async create(
    product_id: number,
    brand_name: string,
  ) {
    const pool = this.db.getPool();

    const [result]: any = await pool.query(
      `INSERT INTO brand
      (product_id, brand_name)
      VALUES (?, ?)`,
      [product_id, brand_name],
    );

    return {
      id: result.insertId,
      product_id,
      brand_name,
    };
  }

  async findAll() {
    const pool = this.db.getPool();

    const [rows] = await pool.query(
      'SELECT * FROM brand ORDER BY id DESC',
    );

    return rows;
  }

  async findOne(id: number) {
    const pool = this.db.getPool();

    const [rows] = await pool.query(
      'SELECT * FROM brand WHERE id = ?',
      [id],
    );

    return rows;
  }

  async update(
    id: number,
    product_id: number,
    brand_name: string,
  ) {
    const pool = this.db.getPool();

    await pool.query(
      `UPDATE brand
       SET product_id = ?, brand_name = ?
       WHERE id = ?`,
      [product_id, brand_name, id],
    );

    return {
      message: 'Brand updated successfully',
    };
  }

  async remove(id: number) {
    const pool = this.db.getPool();

    await pool.query(
      'DELETE FROM brand WHERE id = ?',
      [id],
    );

    return {
      message: 'Brand deleted successfully',
    };

    
  }
  async createMany(brands: any[]) {
  const results = [];

  for (const brand of brands) {
    const result = await this.create(
      brand.product_id,
      brand.brand_name,
    );

    results.push(result);
  }

  return results;
}
}