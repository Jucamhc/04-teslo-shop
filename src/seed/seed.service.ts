import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService
  ) { }

  async runSeed() {
    await this.inserNewProducts()
    return 'Run seed executed';
  }

  private async inserNewProducts() {
    await this.productsService.deleteAllProducts()

    const products = initialData.products

    const inserPromises = [];

    products.forEach(product => {
      inserPromises.push(this.productsService.create(product))
    });

    await Promise.all(inserPromises)

    return true
  }
}
