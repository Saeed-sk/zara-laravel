<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Basket>
 */
class BasketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = \Faker\Factory::create('fa_IR');
        $ids = User::pluck('id')->toArray();
        return [
            'user_id'=>$this->faker->randomElement($ids),
            'total-price'=>$faker->randomNumber()
        ];
    }
}
