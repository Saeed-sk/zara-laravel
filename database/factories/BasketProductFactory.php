<?php

namespace Database\Factories;

use App\Models\Basket;
use App\Models\Products;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BasketProduct>
 */
class BasketProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = \Faker\Factory::create('fa_IR');
        $basketId = Basket::pluck('id')->toArray();
        $productId= Products::pluck('id')->toArray();
        return [
            'product_id'=>$this->faker->randomElement($productId),
            'basket_id'=>$this->faker->randomElement($basketId)
        ];
    }
}
