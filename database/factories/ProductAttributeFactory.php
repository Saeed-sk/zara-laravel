<?php

namespace Database\Factories;

use App\Models\attributes;
use App\Models\ProductAttribute;
use App\Models\Products;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductAttributeFactory extends Factory
{
    protected $model = ProductAttribute::class;

    public function definition(): array
    {
        $faker = \Faker\Factory::create('fa_IR');
        $attrIds = attributes::pluck('id')->toArray();
        $proIds = Products::pluck('id')->toArray();
        return [
            'product_id'=>$faker->randomElement($proIds),
            'attribute_id'=>$faker->randomElement($attrIds)
        ];
    }
}
