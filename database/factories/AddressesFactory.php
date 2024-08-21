<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Addresses>
 */
class AddressesFactory extends Factory
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
            'name' =>$faker->name,
            'phone' =>$faker->phoneNumber,
            'postcode' =>$faker->postcode,
            'address' =>$faker->address,
            'state' =>$faker->streetAddress,
            'user_id' =>$faker->randomElement($ids),
        ];
    }
}
