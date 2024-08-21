<?php

namespace Database\Factories;

use App\Models\Products;
use App\Models\ProductSize;
use App\Models\Sizes;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductSizeFactory extends Factory
{
    protected $model = ProductSize::class;

    public function definition(): array
    {
        $faker = \Faker\Factory::create('fa_IR');
        $sizeId = Sizes::pluck('id')->toArray();
        $proIds = Products::pluck('id')->toArray();
        return [
            'product_id'=>$faker->randomElement($proIds),
            'size_id'=>$faker->randomElement($sizeId),
        ];
    }
}
