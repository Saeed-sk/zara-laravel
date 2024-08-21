<?php

namespace Database\Factories;

use App\Models\Colors;
use App\Models\Products;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductColor>
 */
class ProductColorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $proIds = Products::pluck('id')->toArray();
        $colorIds = Colors::pluck('id')->toArray();
        return [
            'product_id'=>$this->faker->randomElement($proIds),
            'color_id'=>$this->faker->randomElement($colorIds),
        ];
    }
}
