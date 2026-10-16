import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class LocationStoreService {
  constructor(private readonly db: DatabaseService) {}

  async create(
    product_id: number,
    store_name: string,
    location: string,
  ) {
    const pool = this.db.getPool();

    const [result]: any = await pool.query(
      `INSERT INTO location_store
      (product_id, store_name, location)
      VALUES (?, ?, ?)`,
      [product_id, store_name, location],
    );

    return {
      id: result.insertId,
      product_id,
      store_name,
      location,
    };
  }

  async findAll() {
    const pool = this.db.getPool();

    const [rows] = await pool.query(
      'SELECT * FROM location_store ORDER BY id DESC',
    );

    return rows;
  }

  async findOne(id: number) {
    const pool = this.db.getPool();

    const [rows] = await pool.query(
      'SELECT * FROM location_store WHERE id = ?',
      [id],
    );

    return rows;
  }

  async createMany(locations: any[]) {
  const results = [];

  for (const location of locations) {
    const result = await this.create(
      location.product_id,
      location.store_name,
      location.location,
    );

    results.push(result);
  }

  return results;
}

  async update(
    id: number,
    product_id: number,
    store_name: string,
    location: string,
  ) {
    const pool = this.db.getPool();

    await pool.query(
      `UPDATE location_store
       SET product_id = ?, store_name = ?, location = ?
       WHERE id = ?`,
      [product_id, store_name, location, id],
    );

    return {
      message: 'Store location updated successfully',
    };
  }

  async remove(id: number) {
    const pool = this.db.getPool();

    await pool.query(
      'DELETE FROM location_store WHERE id = ?',
      [id],
    );

    return {
      message: 'Store location deleted successfully',
    };
  }
}